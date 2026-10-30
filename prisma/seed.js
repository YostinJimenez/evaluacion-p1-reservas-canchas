require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Borrado en orden por dependencias de foreign keys
    await prisma.booking.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.user.deleteMany();

    // 2. Hasheo de contraseñas con bcrypt (costo 10)
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    // 3. Crear Admin
    const admin = await prisma.user.create({
        data: {
            name: "Paulo Galarza",
            email: "paulo.galarza@example.com",
            password: adminPassword,
            role: "ADMIN",
        },
    });

    // 4. Crear tu usuario (Variante 1)
    const user = await prisma.user.create({
        data: {
            name: "SISALEMA JIMENEZ YOSTIN ARIEL",
            email: "yasisalema@espe.edu.ec",
            password: userPassword,
            role: "USER",
        },
    });

    // 5. Crear los 2 horarios de tu variante (2026-11-11, UTC)
    const schedule1 = await prisma.schedule.create({
        data: {
            court: "Básquet 1",
            startTime: new Date("2026-11-11T08:00:00Z"),
            endTime: new Date("2026-11-11T10:00:00Z"),
        },
    });

    const schedule2 = await prisma.schedule.create({
        data: {
            court: "Tenis 1",
            startTime: new Date("2026-11-11T10:00:00Z"),
            endTime: new Date("2026-11-11T12:00:00Z"),
        },
    });

    // 6. Crear al menos 2 reservas usando connect
    await prisma.booking.create({
        data: {
            date: new Date("2026-11-11T00:00:00Z"),
            user: { connect: { id: user.id } },
            schedule: { connect: { id: schedule1.id } },
        },
    });

    await prisma.booking.create({
        data: {
            date: new Date("2026-11-11T00:00:00Z"),
            user: { connect: { id: admin.id } },
            schedule: { connect: { id: schedule2.id } },
        },
    });

    console.log("Seed ejecutado con éxito para la variante 1.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });