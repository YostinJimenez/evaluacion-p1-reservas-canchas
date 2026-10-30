const bookingService = require("../services/bookingService");

const createBooking = async (req, res) => {
  try {
    const { date, scheduleId } = req.body;
    if (!date || !scheduleId) {
      return res.status(400).json({ error: "date y scheduleId son obligatorios" });
    }
    const booking = await bookingService.createBooking(req.user.id, date, scheduleId);
    return res.status(201).json(booking);
  } catch (error) {
    const status = error.statusCode || 400;
    return res.status(status).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
  try {
    return res.status(200).json(req.booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { date, scheduleId } = req.body;
    if (!date || !scheduleId) {
      return res.status(400).json({ error: "date y scheduleId son obligatorios" });
    }
    const updated = await bookingService.updateBooking(req.params.id, date, scheduleId);
    return res.status(200).json(updated);
  } catch (error) {
    const status = error.statusCode || 400;
    return res.status(status).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
};

