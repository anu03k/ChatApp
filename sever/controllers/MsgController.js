const Messages = require('../models/msgModel')

module.exports.getMessages = async(req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await Messages.find({
            users: {
                /** $all is a query operator used to select
                 *  documents where the value of a field is an array
                 *  that contains all the specified elements
                 */
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                // sender is id so converting o string
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports.addMessage = async(req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) {
            return res.json({ msg: "Message added successfully." });
            console.log('message added in db');
        } else return res.json({ msg: "Failed to add message to the database" });
    } catch (e) {
        console.log(e);
    }
};