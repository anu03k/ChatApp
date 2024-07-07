const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
        text: { type: String, required: true },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    // auto add created at and updated at field
});

module.exports = mongoose.model("Messages", MessageSchema);