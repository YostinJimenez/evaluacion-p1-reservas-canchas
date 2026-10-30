const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const { createSchedule, getBookings } = require("../controllers/adminController");

const router = Router();

// Aplica autenticación y verificación de rol ADMIN a todas las rutas de admin
router.use(authenticateToken, authorizeAdmin);

router.post("/schedules", createSchedule);
router.get("/bookings", getBookings);

module.exports = router;