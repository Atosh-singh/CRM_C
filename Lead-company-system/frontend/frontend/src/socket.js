import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  if (socket) return socket;

  const token = localStorage.getItem("token"); // ✅ SAME AS AXIOS

  socket = io("http://localhost:5000", {
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("🟢 Socket Connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket Disconnected");
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};