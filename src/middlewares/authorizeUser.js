function authorizeUser(req, res, next) {
  const targetId = parseInt(req.params.id, 10);
  if (isNaN(targetId)) {
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  // Permite el acceso si es ADMIN o si el token pertenece al mismo usuario
  if (req.user?.role !== "ADMIN" && req.user?.id !== targetId) {
    return res.status(403).json({ error: "Access Denied, forbidden" });
  }

  next();
}

module.exports = authorizeUser;

