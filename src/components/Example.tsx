import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input } from "antd";

// 後綴
const POSTFIX = "blog_posts";
const URL = "http://localhost:2999/";
const POSTFIX_URL = URL + POSTFIX;

const Example: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    axios
      .get(POSTFIX_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Edit",
      key: "edit",
      render: (_text: any, record: any) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    setEditModalVisible(true);
    setEditData(record);
    setEditedText(record.body);
  };

  const handleSaveEdit = () => {
    // 更新數據的 API 請求
    axios
      .put(`${POSTFIX_URL}/${editData.id}`, {
        body: editedText,
      })
      .then((response) => {
        console.log("Updated data:", response.data);

        // 更新本地數據
        const updatedData = data.map((item) => {
          if (item.id === editData.id) {
            return { ...item, body: editedText };
          }
          return item;
        });

        setData(updatedData);
        setEditModalVisible(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <h2>Example Component</h2>
      <Table dataSource={data} columns={columns} />

      <Modal
        title="Edit Data"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleSaveEdit}
      >
        <Input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Example;
