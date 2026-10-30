const { createSchedule, getAllBookings } = require("../services/adminService");

const createScheduleHandler = async (req, res) => {
    try {
        const { court, startTime, endTime } = req.body;
        const schedule = await createSchedule(court, startTime, endTime);
        return res.status(201).json(schedule);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getBookingsHandler = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSchedule: createScheduleHandler,
    getBookings: getBookingsHandler,
};