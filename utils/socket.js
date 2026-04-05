// utils/socket.js
// Singleton — initialized once in server.js, imported by routes that need to emit

let io = null;

// Initialize Socket.IO instance

export const setIO = (ioInstance) => {
  io = ioInstance;
};

// Get the Socket.IO instance for emitting events

export const getIO = () => {
  if (!io) throw new Error("Socket.IO not initialized yet");
  return io;
};
