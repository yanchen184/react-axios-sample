import React, { useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

const WebSocketDemo = () => {
  const [payloadData, setPayloadData] = useState("");
  useWebSocket("stockOut", setPayloadData);
  console.log(payloadData);
  return <div>message:{payloadData}</div>;
};

export default WebSocketDemo;
