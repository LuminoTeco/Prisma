// Middleware para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return res.json({valid: true, user: req.session.user, id: req.session.id });
    } else {
      // Se não estiver autenticado, retorne um erro ou redirecione
      return res.status(401).json({valid: false, message: "Você precisa estar logado para acessar esta rota" });
    }
  };
  