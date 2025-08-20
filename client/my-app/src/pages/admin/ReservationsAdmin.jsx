import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '../../components/details/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/dialog';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Plus,
  Calendar,
  Trash,
} from 'lucide-react';

const ReservationsAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [reservations, setReservations] = useState([]);

  const [newReservation, setNewReservation] = useState({
    reservationID: '',
    user: '',
    type_reservation: 'hebergement',
    truc_reserver: '',
    préference_user: {
      hebergement: {
        room: { typeChambre: '', typeLit: '', prix: 0, roomID: '' },
      },
      transport: [],
      generale: '',
    },
    nb_personne: 1,
    montant: 0,
    montant_unitaire: 0,
    date_reservation: '',
    status: 'en attente',
  });
  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/reservations'
      );
      setReservations(Array.isArray(data) ? data : data.reservations || []);
    } catch (err) {
      console.error(err);
      setReservations([]);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Stats
  const totalReservations = reservations.length;
  const confirmedCount = reservations.filter(
    (r) => r.status === 'confirmée'
  ).length;
  const pendingCount = reservations.filter(
    (r) => r.status === 'en attente'
  ).length;
  const cancelledCount = reservations.filter(
    (r) => r.status === 'annulée'
  ).length;

  // Filter reservations
  const filteredReservations = reservations.filter((res) => {
    const matchesSearch =
      res.bookingInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.truc_reserver?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      res.reservationID?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    const matchesType =
      typeFilter === 'all' || res.type_reservation === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmée':
        return '';
      case 'en attente':
        return 'bg-yellow-300 text-yellow-800 hover:bg-yellow-400';
      case 'annulée':
        return 'bg-red-200 text-red-800 hover:bg-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmée':
        return <CheckCircle className="h-4 w-4" />;
      case 'en attente':
        return <Clock className="h-4 w-4" />;
      case 'annulée':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleViewReservation = (res) => {
    setSelectedReservation(res);
    setDialogOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/reservations/${id}`, {
        status: newStatus,
      });
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette réservation ?'))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/reservations/${reservationId}`
      );
      // Remove the deleted reservation from state
      setReservations((prev) => prev.filter((r) => r._id !== reservationId));
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  const handleCreateReservation = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/reservations',
        newReservation
      );
      setCreateDialogOpen(false);
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Réservations',
            value: totalReservations,
            icon: Calendar,
            color: 'bg-gray-100 text-gray-700',
          },
          {
            title: 'Confirmées',
            value: confirmedCount,
            icon: CheckCircle,
            color: 'bg-green-100 text-green-700',
          },
          {
            title: 'En attente',
            value: pendingCount,
            icon: Clock,
            color: 'bg-yellow-100 text-yellow-700',
          },
          {
            title: 'Annulées',
            value: cancelledCount,
            icon: XCircle,
            color: 'bg-red-100 text-red-700',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
          >
            <div
              className={`p-3 rounded-full flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher par client, réservation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-xs border rounded-lg px-3 py-2 focus:ring focus:ring-yellow-200"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">Tous les statuts</option>
          <option value="confirmée">Confirmée</option>
          <option value="en attente">En attente</option>
          <option value="annulée">Annulée</option>
        </select>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">Tous les types</option>
          <option value="hebergement">Hébergement</option>
          <option value="voyage">Voyage</option>
          <option value="omra_hajj">Omra/Hajj</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Réservation</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Participants</TableHead>

              <TableHead>Date depart</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>changer Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((res) => (
              <TableRow key={res._id} className="hover:bg-gray-50 transition">
                <TableCell>{res.reservationID}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-md">
                      {res.bookingInfo?.firstName} {res.bookingInfo?.lastName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {res.bookingInfo?.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{res.type_reservation}</TableCell>
                <TableCell>
                  {new Date(res.date_reservation).toLocaleDateString()}
                </TableCell>
                <TableCell>{res.nb_personne}</TableCell>

                <TableCell >
                  {res.type_reservation === 'voyage'
                    ? new Date(
                        res.bookingInfo.date_depart.split('T')[0]
                      ).toLocaleDateString()
                    : '________'}
                </TableCell>

                <TableCell>{res.montant} €</TableCell>
                <TableCell>
                  <Badge
                    className={`flex items-center ${getStatusColor(
                      res.status
                    )} px-2 py-1 rounded-full`}
                  >
                    {getStatusIcon(res.status)}{' '}
                    <span className="ml-1">{res.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="space-x-3">
                  <button
                    onClick={() => handleUpdateStatus(res._id, 'confirmée')}
                    className="text-green-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(res._id, 'en attente')}
                    className="text-yellow-600"
                  >
                    <Clock className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(res._id, 'annulée')}
                    className="text-red-600"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </TableCell>

                {/* Actions Cell */}
                <TableCell className="space-x-3">
                  <button onClick={() => handleViewReservation(res)}>
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteReservation(res._id)}>
                    <Trash className="h-4 w-4 text-red-600" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl rounded-xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>
              {selectedReservation &&
                `Réservation ${selectedReservation.reservationID || ''}`}
            </DialogDescription>
          </DialogHeader>

          {selectedReservation && (
            <div className="grid gap-6 py-4">
              {/* Client Info */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-2 text-lg">Client</h4>

                {selectedReservation.bookingInfo ? (
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <span className="font-medium">Nom :</span>{' '}
                      {selectedReservation.bookingInfo.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Prénom :</span>{' '}
                      {selectedReservation.bookingInfo.firstName}
                    </p>
                    <p>
                      <span className="font-medium">Email :</span>{' '}
                      {selectedReservation.bookingInfo.email}
                    </p>
                    <p>
                      <span className="font-medium">Téléphone :</span>{' '}
                      {selectedReservation.bookingInfo.phone}
                    </p>
                  </div>
                ) : (
                  <p>Utilisateur inconnu</p>
                )}
              </div>

              {/* Reservation Target */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-2 text-lg">Réservé</h4>
                <p className="text-gray-700">
                  {selectedReservation.type_reservation}
                </p>
              </div>

              {/* Preferences */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-2 text-lg">Préférences</h4>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <strong>Chambre:</strong>{' '}
                    {selectedReservation.préference_user?.hebergement?.room
                      ?.typeChambre || '-'}
                  </div>
                  <div>
                    <strong>Lit:</strong>{' '}
                    {selectedReservation.préference_user?.hebergement?.room
                      ?.typeLit || '-'}
                  </div>
                  <div>
                    <strong>Prix:</strong>{' '}
                    {selectedReservation.préference_user?.hebergement?.room
                      ?.prix || '-'}{' '}
                    €
                  </div>
                  <div>
                    <strong>Transport:</strong>{' '}
                    {selectedReservation.préference_user?.transport?.length > 0
                      ? selectedReservation.préference_user.transport
                          .map((t) => `${t.type} (${t.price} €)`)
                          .join(', ')
                      : '-'}
                  </div>
                  <div className="col-span-2">
                    <strong>Général:</strong>{' '}
                    {selectedReservation.préference_user?.generale || '-'}
                  </div>
                </div>
              </div>

              {/* Other Details */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-2 text-lg">Détails</h4>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <strong>Participants:</strong>{' '}
                    {selectedReservation.nb_personne}
                  </div>
                  <div>
                    <strong>Montant total:</strong>{' '}
                    {selectedReservation.montant} €
                  </div>
                  <div>
                    <strong>Montant unitaire:</strong>{' '}
                    {selectedReservation.montant_unitaire} €
                  </div>
                  <div>
                    <strong>Date:</strong>{' '}
                    {selectedReservation.date_reservation
                      ? new Date(
                          selectedReservation.date_reservation
                        ).toLocaleString()
                      : '-'}
                  </div>
                  <div className="col-span-2">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`px-2 py-1 rounded-full ${
                        selectedReservation.status === 'confirmée'
                          ? 'bg-green-200 text-green-800'
                          : selectedReservation.status === 'en attente'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {selectedReservation.status || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              className="w-full py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={() => setDialogOpen(false)}
            >
              Fermer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationsAdmin;
