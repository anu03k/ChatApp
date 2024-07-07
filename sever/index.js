const express = require("express")
const cors = require("cors")
require("dotenv").config();
const mongoose = require("mongoose")
const messageRoute = require('./routes/MsgRoute')

const DB = process.env.DATABASE;
const userRoutes = require('./routes/userRoutes')

const app = express();


app.use(cors());
app.use(express.json());
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
app.listen(PORT, () => {
    console.log(`Server running  port ${PORT}`);
});