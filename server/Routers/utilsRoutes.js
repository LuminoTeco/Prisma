const express = require('express');
const utils = require("../Controllers/utilsController")
const router = express.Router();

router.post("/messages", utils.CreateMessagesForum)
router.post("/sendInvite", utils.sendFriendRequest)
router.post("/addAchivement", utils.addAchivementUser)

router.patch("/acceptInvite", utils.acceptFriendRequest)

router.get("/all_messages", utils.getMessagesForum)
router.get("/getInvites", utils.getFriendRequestPendent)
router.get("/ranking", utils.ranking)
router.get("/friendsRank", utils.rankingMyFriends)
router.get("/getAchivements", utils.NotAchivement)

router.delete("/rejectInvite", utils.rejectFriendRequest)

module.exports = router