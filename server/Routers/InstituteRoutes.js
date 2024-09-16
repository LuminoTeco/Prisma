const express = require("express")
const router = express.Router()
const UnitsController = require("../Controllers/UnitsController")

router.post('/users', UnitsController.createInstitute)
router.post('/usersList', UnitsController.login)

module.exports = router