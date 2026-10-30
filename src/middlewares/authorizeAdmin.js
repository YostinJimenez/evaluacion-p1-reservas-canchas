function authorizeAdmin(req, res, next) {
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({ error: "Access Denied, admin role required" });
    }
    next();
}

module.exports = authorizeAdmin;