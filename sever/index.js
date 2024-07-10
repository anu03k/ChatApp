const express = require("express")
const cors = require("cors")
require("dotenv").config();
const mongoose = require("mongoose")
const messageRoute = require('./routes/MsgRoute')
const socket = require("socket.io")

const DB = process.env.DATABASE;
const userRoutes = require('./routes/userRoutes')

const app = express();


app.use(cors({
    // origin: 'http://localhost:5173', // Allow requests from this origin
    origin: '*', // Allow all origins for debugging

}));


app.use(express.json()); // Middleware to parse JSON



app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)

mongoose.connect(DB,
    // The second argument is an options object with various options for the connection.
    {

        // Add other connection options if needed
    }
).then(() => {
    // .then() is used to handle the result of promise after it had been resolved or rejected - promise.then(onfullfilled  onrejected)
    console.log(`connection established with db`)
}).catch((e) => console.log('error in connection with db', e));

const PORT = process.env.PORT || 5000; // Ensure this line correctly falls back to 5713 if process.env.PORT is undefined
const server = app.listen(PORT, () => {
    console.log(`Server running  port ${PORT}`);
});


const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

// global.onlineUsers = new Map(); //create map obj to track users online
// io.on('connection', (socket) => { //n event listener that listens for new connections to the WebSocket server. 
//     console.log('A user connected:', socket.id);
//     global.chatSocket = socket;
//     socket.on("add-user", (userId) => {
//         console.log(`User ${userId} connected with socket ID ${socket.id}`);
//         onlineUsers.set(userId, socket.id);
//     });

//     socket.on("send-msg", (data) => {
//         const sendUserSocket = onlineUsers.get(data.to);
//         if (sendUserSocket) {
//             socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//         }
//     });
// });
/*  current socket object to the global variable global.chatSocket. This means that the latest connected client's socket will be stored in global.chatSocket. */
const onlineUsers = new Map(); // Create a map to track online users

io.on('connection', (socket) => {


    // Event listener to add a user to onlineUsers map
    socket.on('add-user', (userId) => {
        // console.log(`User ${userId} connected with `);
        onlineUsers.set(userId, socket.id);
    });

    // Event listener to handle message sending
    socket.on('send-msg', (data) => {
        const { to, msg } = data;
        const sendUserSocket = onlineUsers.get(to);

        if (sendUserSocket) {
            // console.log(`Sending message from ${socket.id} to ${sendUserSocket}: ${msg}`);
            socket.to(sendUserSocket).emit('msg-recieve', { from: socket.id, msg });
        } else {
            console.log(`User ${to} is not online`);
        }
    });

    // Event listener for disconnection
    socket.on('disconnect', () => {
        // console.log(`User disconnected: ${socket.id}`);

        // Remove user from onlineUsers map when disconnected
        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                console.log(`Removing user ${key} from online users`);
                onlineUsers.delete(key);
            }
        });
    });
});