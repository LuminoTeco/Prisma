const express = require("express")
const router = express.Router()
const UnitsController = require("../Controllers/UnitsController")

router.post('/users', UnitsController.createInstitute)
router.get('/usersList', UnitsController.getAllInstitute)

module.exports = router