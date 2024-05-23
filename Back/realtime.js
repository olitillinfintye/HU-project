const socketio = require("socket.io");

const io = socketio(8000, {
  cors: {
    origin: "http://localhost:3001",
  },
});

const users = [];

function storeSocket(userId, username, userType, socketId) {
  function storeSocket(userId, username, userType, socketId) {
    const foundUser = users.find(
      (user) =>
        user.username === username &&
        user.userId === userId &&
        user.userType === userType &&
        user.socketId === socketId
    );
  
    if (!foundUser) {
      users.push({ userId, username, userType, socketId });
    }
  }
}

io.on("connection", (socket) => {
  socket.on("activeChatClicked", ({ name, userId, userType }) => {
    // storeSocket(userId, name.email, userType, socket.id);
  });
  socket.on("messageSent", ({ data, name,chatId }) => {
    data.from = name.fullname;
    data.chatId=chatId
    socket.broadcast.emit("breadcastMessage", data);
  });

});