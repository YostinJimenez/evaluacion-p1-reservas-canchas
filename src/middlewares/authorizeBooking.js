const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const authorizeBooking = async (req, res, next) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "ID de reserva inválido" });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { schedule: true, user: true },
    });

    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (booking.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access Denied, not your booking" });
    }

    req.booking = booking;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = authorizeBooking;

