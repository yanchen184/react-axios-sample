import { useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const RECONNECT_TIME = 5000;

export function useWebSocket(path: any, setPayloadData: any) {
  useEffect(() => {
    
    let stompClient = Stomp.over(
      () => new SockJS(`http://localhost:8095/websocket/`)
    );

    const onMessageReceived = (message: { body: string }) => {
      const messageJson = JSON.parse(message.body);
      const sendMsg = messageJson.jobUuid || message.body;
      if (stompClient) {
        stompClient.send(sendMsg);
        setPayloadData(messageJson);
      }
    };

    stompClient.onConnect = (frame) => {
      console.log("[websocket open]");
      const subscribePath = `/topic/${path}/`;
      stompClient.subscribe(subscribePath, onMessageReceived);
    };

    stompClient.onWebSocketClose = (closeEvent) => {
      console.log("[websocket close]", closeEvent.reason);
    };

    stompClient.onWebSocketError = (event) => {
      console.log("onWebSocketError", event);
    };

    stompClient.onStompError = (frame) => {
      console.log("onStompError", frame);
    };

    stompClient.onDisconnect = () => {
      console.log("onDisconnect");
    };

    stompClient.connect("");

    // 設置重新連接延遲和心跳
    stompClient.reconnectDelay = RECONNECT_TIME;
    stompClient.activate();
    stompClient.heartbeat.incoming = 100;
    stompClient.heartbeat.outgoing = 100;

    return () => {
      // 在組件卸載時取消WebSocket訂閱並清理資源
      if (stompClient) {
        stompClient.disconnect();
        stompClient = null;
      }
    };
  }, [path, setPayloadData]);
}
