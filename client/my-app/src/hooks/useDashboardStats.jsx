import { useEffect, useState } from 'react';
import axios from 'axios';

const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalVoyages: 0,
    newVoyagesThisMonth: 0,
    newVoyagesThisWeek: 0,
    totalHebergements: 0,
    newHebergementsThisMonth: 0,
    newHebergementsThisWeek: 0,
    totalUsers: 0,
    newUsersThisMonth: 0,
    newUsersThisWeek: 0,
    totalAdmins: 0,
    totalNormalUsers: 0,
    totalReservations: 0,
    newReservationsThisMonth: 0,
    newReservationsThisWeek: 0,
    confirmedReservations: 0,
    pendingReservations: 0,
    cancelledReservations: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/dashboard/stats'
        );
        setStats({
          totalVoyages: data.voyages.total,
          newVoyagesThisMonth: data.voyages.thisMonth,
          newVoyagesThisWeek: data.voyages.thisWeek,
          totalHebergements: data.hebergements.total,
          newHebergementsThisMonth: data.hebergements.thisMonth,
          newHebergementsThisWeek: data.hebergements.thisWeek,
          totalUsers: data.users.total,
          newUsersThisMonth: data.users.thisMonth,
          newUsersThisWeek: data.users.thisWeek,
          totalAdmins: data.users.admins,
          totalNormalUsers: data.users.normalUsers,
          totalReservations: data.reservations.total,
          newReservationsThisMonth: data.reservations.thisMonth,
          newReservationsThisWeek: data.reservations.thisWeek,
          confirmedReservations: data.reservations.confirmées,
          pendingReservations: data.reservations.en_attente,
          cancelledReservations: data.reservations.annulées,
        });
      } catch (err) {
        console.error('Erreur récupération stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

export default useDashboardStats;
