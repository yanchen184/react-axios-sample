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
        const response = await fetch("http://localhost:8087/upload", {
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
      const apiUrl = `http://localhost:8087/whisper?path=C:/Users/whisper/uploadFile/${selectedFile?.name}`;

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
    <div>
      <h1>Welcome to My Vite React App</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "上傳中..." : "上傳文件"}
        </button>
        <button onClick={handleWhisper} disabled={whispering}>
          {whispering ? "翻譯中..." : "翻譯"}
        </button>
        <h2>whisperText: {whisperText}</h2>
        <h2> selectedFile: {selectedFile?.name}</h2>
      </div>
    </div>
  );
};

export default Home;
