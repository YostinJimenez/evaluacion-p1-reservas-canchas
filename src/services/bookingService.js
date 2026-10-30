const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const createBooking = async (userId, date, scheduleId) => {
  const parsedDate = new Date(date);
  const parsedScheduleId = Number(scheduleId);

  const occupied = await prisma.booking.findFirst({
    where: {
      date: parsedDate,
      scheduleId: parsedScheduleId,
    },
  });

  if (occupied) {
    const error = new Error("El horario ya está ocupado");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.booking.create({
    data: {
      date: parsedDate,
      userId: Number(userId),
      scheduleId: parsedScheduleId,
    },
    include: {
      schedule: true,
      user: true,
    },
  });
};

const getBookingById = async (id) => {
  return await prisma.booking.findUnique({
    where: { id: Number(id) },
    include: {
      schedule: true,
      user: true,
    },
  });
};

const updateBooking = async (id, date, scheduleId) => {
  const parsedId = Number(id);
  const parsedDate = new Date(date);
  const parsedScheduleId = Number(scheduleId);

  const occupied = await prisma.booking.findFirst({
    where: {
      date: parsedDate,
      scheduleId: parsedScheduleId,
      NOT: { id: parsedId },
    },
  });

  if (occupied) {
    const error = new Error("El nuevo horario está ocupado por otra reserva");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.booking.update({
    where: { id: parsedId },
    data: {
      date: parsedDate,
      scheduleId: parsedScheduleId,
    },
    include: {
      schedule: true,
      user: true,
    },
  });
};

const deleteBooking = async (id) => {
  return await prisma.booking.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};

