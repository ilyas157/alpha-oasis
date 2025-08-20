import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';
// Create reservation
export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reservations

export const getReservations = async (req, res) => {
  try {
    const filter = {};
    const number = parseInt(req.query.number, 10) || 10;
    if (req.query.status) filter.status = req.query.status;

    const reservations = await Reservation.find(filter)
      .populate('truc_reserver') // référence voyage ou hébergement
      .sort({ date_reservation: -1 }) // latest first
      .limit(number);
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération réservations' });
  }
};

// Get reservation by ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate(
      'user truc_reserver'
    );
    if (!reservation)
      return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.id });
    if (!reservations)
      return res.status(404).json({ error: 'Reservations not found' });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update reservation
export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation)
      return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete reservation
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation)
      return res.status(404).json({ error: 'Reservation not found' });
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
