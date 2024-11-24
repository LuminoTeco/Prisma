const express = require('express');
const utils = require("../Controllers/utilsController")
const router = express.Router();

router.post("/messages", utils.CreateMessagesForum)
router.post("/sendInvite", utils.sendFriendRequest)
router.post("/addAchivement", utils.addAchivementUser)
router.post("/InsertStudentColaborator", utils.InsertStudentColaborator)
router.post("/SendMessageFriends", utils.SendMessageFriends)

router.patch("/acceptInvite", utils.acceptFriendRequest)
router.patch("/updateXpColaborador", utils.updateXpColaborador)

router.get("/all_messages", utils.getMessagesForum)
router.get("/getInvites", utils.getFriendRequestPendent)
router.get("/ranking", utils.ranking)
router.get("/friendsRank", utils.rankingMyFriends)
router.get("/getAchivements", utils.NotAchivement)
router.get("/getContentForum", utils.getContentForum)
router.get("/verifyColaborator", utils.verifyColaborator)
router.get("/getXpColaborador", utils.getXpColaborador)
router.get("/getAllColaborators", utils.getAllColaborators)
router.get("/getMyFriends", utils.getMyFriends)
router.get("/getMessagesFriends", utils.getMessageFriends)

router.delete("/rejectInvite", utils.rejectFriendRequest)

module.exports = router