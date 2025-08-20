import React, { useEffect } from 'react';

import {
  Plane,
  Building2,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDashboardStats from '../../hooks/useDashboardStats';
import usePendingReservations from '../../hooks/usePendingReservations';
const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, loading } = useDashboardStats();
  const { recentReservations, isloading } = usePendingReservations();
  if (loading || isloading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-yellow-500 w-60"></span>
      </div>
    );
  }

  const cardStats = [
    {
      title: 'Total Voyages',
      value: stats.totalVoyages,
      change: `+${stats.newVoyagesThisMonth} ce mois`,
      icon: Plane,
      color: 'text-blue-600',
    },
    {
      title: 'Hébergements',
      value: stats.totalHebergements,
      change: `+${stats.newHebergementsThisWeek} cette semaine`,
      icon: Building2,
      color: 'text-green-600',
    },
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      change: `+${stats.newUsersThisMonth} ce mois`,
      icon: Users,
      color: 'text-orange-600',
    },
    {
      title: 'Réservations',
      value: stats.totalReservations,
      change: `+${stats.newReservationsThisMonth} ce mois`,
      icon: Calendar,
      color: 'text-yellow-600',
    },
  ];
  /*


  const recentReservations = [
    {
      id: '001',
      client: 'Marie Dubois',
      voyage: 'Marrakech Express',
      date: '2024-03-15',
      status: 'Confirmée',
    },
    {
      id: '002',
      client: 'Jean Martin',
      voyage: 'Sahara Adventure',
      date: '2024-03-14',
      status: 'En attente',
    },
    {
      id: '003',
      client: 'Sophie Laurent',
      voyage: 'Istanbul Découverte',
      date: '2024-03-13',
      status: 'Confirmée',
    },
    {
      id: '004',
      client: 'Pierre Moreau',
      voyage: 'Omra Premium',
      date: '2024-03-12',
      status: 'Confirmée',
    },
    {
      id: '005',
      client: 'Julie Bernard',
      voyage: 'Cappadoce Magique',
      date: '2024-03-11',
      status: 'Annulée',
    },
  ];
*/
  
  console.log('this is recent bookings : ',recentReservations)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmée':
        return 'text-green-600 bg-green-100';
      case 'En attente':
        return 'text-yellow-600 bg-yellow-100';
      case 'Annulée':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre plateforme Alpha Oasis
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardStats.map((stat) => (
          <div key={stat.title}>
            <div className="flex flex-row items-center gap-5 pb-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <div>
          <div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Réservations récentes
            </div>
            <h1 className="mt-2">Les 5 dernières réservations effectuées</h1>
          </div>
          <div className="space-y-4">
            {recentReservations?.map((reservation) => (
              <div
                key={reservation._id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {reservation.bookingInfo?.firstName}{' '}
                        {reservation.bookingInfo?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.type_reservation}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(
                          reservation.date_reservation
                        ).toLocaleDateString()}
                      </p>
                      <span
                        className={'text-xs px-2 py-1 text-yellow-600 bg-yellow-100 rounded-full '}
                      >
                        {reservation.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Quick Actions */}
        <div>
          <div>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Actions rapides
            </div>
            <h1 className="mt-2">Gérez rapidement votre plateforme</h1>
          </div>
          <div className="space-y-3">
            <button
              className="btn w-full flex items-center justify-between p-3 border rounded-lg  transition-colors"
              onClick={() => navigate('/admin/voyages/create')}
            >
              <div className="flex items-center">
                <Plane className="mr-3 h-4 w-4 text-blue-600" />
                <span>Ajouter un nouveau voyage</span>
              </div>
              <span className="text-sm ">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              className="btn w-full flex items-center justify-between p-3 border rounded-lg transition-colors"
              onClick={() => navigate('/admin/hebergements/create')}
            >
              <div className="flex items-center">
                <Building2 className="mr-3 h-4 w-4 text-green-600" />
                <span>Ajouter un hébergement</span>
              </div>
              <span className="text-sm ">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              className="btn w-full flex items-center justify-between p-3 border rounded-lg transition-colors"
              onClick={() => navigate('reservations')}
            >
              <div className="flex items-center">
                <Eye className="mr-3 h-4 w-4 text-purple-600" />
                <span>Voir toutes les réservations</span>
              </div>
              <span className="text-sm ">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              className="btn w-full flex items-center justify-between p-3 border rounded-lg  transition-colors"
              onClick={() => navigate('users')}
            >
              <div className="flex items-center">
                <Users className="mr-3 h-4 w-4 text-orange-600" />
                <span>Gérer les utilisateurs</span>
              </div>
              <span className="text-sm ">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
