/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from "react";
import {
  IFrame,
  Stomp,
  StompSubscription,
  CompatClient,
  FrameImpl,
} from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
const RECONNECT_TIME = 5000;

export function useWebSocket(path, setPayloadData) {
  try {
    let subscriptionObj: StompSubscription;
    let stompClient: CompatClient | undefined = null;

    const clearSubscription = () => {
      subscriptionObj = null;
    };

    const [payload, setPayload] = useState<string>();

    useEffect(() => {
      if (payload) {
        console.log(
          `[${new Date().toLocaleTimeString()}]: ${payload}`
        );
      }
    }, [payload]);

    useEffect(() => {
      let timeoutTimer = null;

      function resetPingPong() {
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(() => {
          clearTimeout(timeoutTimer);
        }, 20500);
      }
      const onMessageReceived = (message: { body: string }) => {
        resetPingPong();
        // 向後端發送確認訊息
        setPayload(message.body);
        const messageJson = JSON.parse(message.body);
        const sendMsg = message.body;
        stompClient.send(sendMsg);

        setPayloadData(messageJson);
      };

      stompClient = Stomp.over(
        () => new SockJS("http://localhost:8085/websocket")
      );

      const onMessageReceivedNotification = (message: { body: string }) => {
        resetPingPong();
        // 向後端發送確認訊息
        setPayload(message.body);
      };

      stompClient.onConnect = (_frame: FrameImpl) => {
        console.log("[websocket open]");
        let subscribePath = "";
        subscribePath = "/topic/yc";
        subscriptionObj = stompClient.subscribe(
          subscribePath,
          onMessageReceived
        );
      };

      stompClient.onWebSocketClose = (closeEvent: CloseEvent) => {
        /**
         * invoked when underlying WebSocket is closed.
         */
        clearSubscription();
        console.log("[websocket close]", closeEvent.reason);
        clearTimeout(timeoutTimer);
      };

      stompClient.onWebSocketError = (event: Event) => {
        clearSubscription();
        console.log("onWebSocketError", event);
      };

      stompClient.onStompError = (frame: IFrame) => {
        clearSubscription();
        console.log("onStompError", frame);
      };

      stompClient.onDisconnect = () => {
        clearSubscription();
        console.log("onDisconnect");
      };

      stompClient.debug = (str: String) => {
        // eslint-disable-nex-line no-console
        if (str === "<<< PONG") {
          clearTimeout(timeoutTimer);
          timeoutTimer = setTimeout(() => {
            clearTimeout(timeoutTimer);
            stompClient.send(
              `station: ${stationCode} websocket network connection exception`
            );
          }, 10500);
        } else if (str !== "Received data" && !str.startsWith(">>> SEND")) {
          console.log(str);
        }
      };

      stompClient.reconnectDelay = RECONNECT_TIME;
      stompClient.activate();
      stompClient.heartbeat.incoming = 100;
      stompClient.heartbeat.outgoing = 100;
    }, [stompClient]);
  } catch (e) {
    console.log("useWebsocket error", e);
  }
}
