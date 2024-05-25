const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const DB = process.env.DATABASE


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(DB,
    // The second argument is an options object with various options for the connection.
).then(() => {
    // .then() is used to handle the result of promise after it had been resolved or rejected - promise.then(onfullfilled  onrejected)
    console.log(`connection established with db`)
}).catch((e) => console.log('error in connection'));

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})