// src/components/Home.tsx

import React, { useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

const Home: React.FC = () => {
  const [payloadData, setPayloadData] = useState<any>();
  useWebSocket("example", setPayloadData);

  return (
    <div>
      <h1>payloadData:{payloadData}</h1>
      <h1>Welcome to My Vite React App</h1>
    </div>
  );
};

export default Home;
