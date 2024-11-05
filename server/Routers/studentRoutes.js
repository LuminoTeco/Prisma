const express = require("express");
const StudentController = require("../Controllers/StudentController");
const authSession = require("../middlewares/authSession");
const studentUpload = require("../middlewares/Upload");
const router = express.Router();

router.post("/students", StudentController.createStudent);
router.post("/loginAlunos", StudentController.LoginStudents);

router.get("/students/:turma_id_fk", StudentController.getStudents);
router.get("/subjects/:aluno_id", StudentController.SelectSubject);
router.get("/allinformation/:aluno_id", StudentController.allInformationUser);
router.get("/searchStudents/:aluno_id", StudentController.allStudentsByNameInvite)

router.patch("/SubjectUpdate", StudentController.UpdateStudentSubject);
router.patch(
  "/uploadImage/:aluno_id",
  studentUpload,
  StudentController.UpdateStudentPhoto
);
router.put("/students/:id", StudentController.UpdateStudent);

module.exports = router;
