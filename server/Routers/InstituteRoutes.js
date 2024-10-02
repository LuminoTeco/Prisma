const express = require("express")
const router = express.Router()
const UnitsController = require("../Controllers/UnitsController")

router.post('/users', UnitsController.createInstitute)
router.post('/usersList', UnitsController.login)

//Class

router.post('/class', UnitsController.createClass)
router.get("/classList", UnitsController.getClass);
router.get("/classList/:id", UnitsController.getClassById)

module.exports = router