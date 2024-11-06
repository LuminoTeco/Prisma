const express = require('express');
const utils = require("../Controllers/utilsController")
const router = express.Router();

router.post("/messages", utils.CreateMessagesForum)
router.get("/all_messages", utils.getMessagesForum)

router.post("/sendInvite", utils.sendFriendRequest)
router.get("/getInvites", utils.getFriendRequestPendent)

module.exports = router