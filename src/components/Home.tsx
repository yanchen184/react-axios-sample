// src/components/Home.tsx

import React, { useState } from "react";

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [whispering, setWhispering] = useState<boolean>(false);
  const [whisperText, setWhisperText] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
    // call api to upload file
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("文件上傳成功");
        } else {
          console.error("文件上傳失敗");
        }
      } catch (error) {
        console.error("上傳出錯:", error);
      } finally {
        setUploading(false);
      }
    } else {
      console.log("请选择一个文件.");
    }
  };

  const handleWhisper = async () => {
    setWhispering(true);
    try {
      const apiUrl = `http://localhost:8080/whisper?fileName=${selectedFile?.name}`;

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.ok) {
        setWhisperText(await response.text());
      } else {
      }
    } catch (error) {
      console.error("上传文件时出错:", error);
    } finally {
      setWhispering(false);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Whisper Demo</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            {uploading ? "上傳中..." : "上傳文件"}
          </button>
          <button
            onClick={handleWhisper}
            disabled={whispering}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          >
            {whispering ? "模型轉文字中..." : "離線語音轉文字"}
          </button>
        </div>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Whisper Text:
        </h2>
        <div style={{ fontSize: "18px", textAlign: "left" }}>
          {whisperText.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
