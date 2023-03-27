const express = require("express");
const { getMesssage, createMessage } = require("../Controller/messageController");
const router = express.Router();


router.post("/", createMessage)

router.get("/:chatId", getMesssage)

module.exports = router