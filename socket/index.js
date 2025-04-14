const http = require('http');
const socketIo = require('socket.io');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running');
});

// Set up socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Listen for connections
server.listen(8800, () => {
  console.log('Server is running on port 8800');
});

let activeUsers = [];
io.on('connection', (socket) => {
  socket.on('new-user-add', (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id
      });
    }
    console.log('Connected Users:', activeUsers);
    io.emit('get-users', activeUsers);
  });

  // Send message
  socket.on('send-message', (data) => {
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId === recieverId);
    console.log('Sending from socket to:', recieverId);
    console.log('Data:', data);
    if (user) {
      io.to(user.socketId).emit('recieve-message', data);
    }
  });

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log('User Disconnected', activeUsers);
    io.emit('get-users', activeUsers);
  });
});
