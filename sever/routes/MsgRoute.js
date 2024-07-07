const express = require('express')
const router = express.Router()
const { getMessages, addMessage } = require('../controllers/MsgController')

router.post('/addmsg', addMessage);
router.post('/getmsg', getMessages);
module.exports = router;