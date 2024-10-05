const express = require("express");
const router = express.Router();
const UnitsController = require("../Controllers/UnitsController");
const authSession = require("../middlewares/authSession");


router.post('/users', UnitsController.createInstitute);
router.post('/class', UnitsController.createClass);
router.post('/login', UnitsController.login);

router.get('/classes/:instituicao_id_fk', UnitsController.getClass);
router.get('/protected-route', authSession.isAuthenticated, (req, res) => {
    res.json({ message: "Você acessou uma rota protegida!" });
  });
  
router.post('/logout', UnitsController.logout)

module.exports = router;
