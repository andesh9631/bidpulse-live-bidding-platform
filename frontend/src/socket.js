import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  "https://bidpulse-backend-i0ho.onrender.com";

export const socket = io(SOCKET_URL);
