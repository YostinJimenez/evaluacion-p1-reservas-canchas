const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const createSchedule = async (court, startTime, endTime) => {
    if (!court || !startTime || !endTime) {
        throw new Error("court, startTime y endTime son obligatorios");
    }
    return await prisma.schedule.create({
        data: {
            court,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        },
    });
};

const getAllBookings = async () => {
    return await prisma.booking.findMany({
        include: {
            user: true,
            schedule: true,
        },
    });
};

module.exports = { createSchedule, getAllBookings };