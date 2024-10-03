// Middleware para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    } else {
      return res.status(401).json({ message: "Você precisa estar logado para acessar esta rota" });
    }
  };
  