// controllers/dashboardController.js
import Voyage from '../models/Voyages.js';
import Hebergement from '../models/Hebergement.js';
import User from '../models/User.js';
import Reservation from '../models/Reservation.js';

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();

    // Helpers for date ranges
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // dimanche
    startOfWeek.setHours(0, 0, 0, 0);

    // ===== Voyages =====
    const totalVoyages = await Voyage.countDocuments();
    const voyagesThisMonth = await Voyage.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    const voyagesThisWeek = await Voyage.countDocuments({
      createdAt: { $gte: startOfWeek },
    });

    // ===== Hébergements =====
    const totalHebergements = await Hebergement.countDocuments();
    const hebergementsThisMonth = await Hebergement.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    const hebergementsThisWeek = await Hebergement.countDocuments({
      createdAt: { $gte: startOfWeek },
    });

    // ===== Utilisateurs =====
    const totalUsers = await User.countDocuments();
    const usersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    const usersThisWeek = await User.countDocuments({
      createdAt: { $gte: startOfWeek },
    });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const userCount = await User.countDocuments({ role: 'user' });

    // ===== Réservations =====
    const totalReservations = await Reservation.countDocuments();
    const reservationsThisMonth = await Reservation.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    const reservationsThisWeek = await Reservation.countDocuments({
      createdAt: { $gte: startOfWeek },
    });
    const confirmedCount = await Reservation.countDocuments({
      status: 'confirmée',
    });
    const pendingCount = await Reservation.countDocuments({
      status: 'en attente',
    });
    const cancelledCount = await Reservation.countDocuments({
      status: 'annulée',
    });

    res.json({
      voyages: {
        total: totalVoyages,
        thisMonth: voyagesThisMonth,
        thisWeek: voyagesThisWeek,
      },
      hebergements: {
        total: totalHebergements,
        thisMonth: hebergementsThisMonth,
        thisWeek: hebergementsThisWeek,
      },
      users: {
        total: totalUsers,
        thisMonth: usersThisMonth,
        thisWeek: usersThisWeek,
        admins: adminCount,
        normalUsers: userCount,
      },
      reservations: {
        total: totalReservations,
        thisMonth: reservationsThisMonth,
        thisWeek: reservationsThisWeek,
        confirmées: confirmedCount,
        en_attente: pendingCount,
        annulées: cancelledCount,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};
