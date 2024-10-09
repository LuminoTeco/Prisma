const express = require('express');
const StudentController = require('../Controllers/StudentController')
const authSession = require("../middlewares/authSession");
const router = express.Router();

router.post('/students', StudentController.createStudent)
router.post('/loginAlunos', StudentController.LoginStudents)
router.get('/students/:turma_id_fk', StudentController.getStudents)
router.put('/students/:id', StudentController.UpdateStudent)

module.exports = router;
