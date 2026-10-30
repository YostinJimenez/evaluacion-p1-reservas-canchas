const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const bookingRouter = require("./booking");

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/bookings", bookingRouter);

module.exports = router;
