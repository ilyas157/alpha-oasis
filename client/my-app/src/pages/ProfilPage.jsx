import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import { Button } from './admin/components/ui/button';
import { Input } from './admin/components/ui/input';
import {
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Bed,
  Bus,
  Hash,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/Select';
import { useToast } from '../components/toastManager';
import { LogOut, Settings } from 'lucide-react';

const ProfilPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();


  const userId = localStorage.getItem('userId');

  console.log(userId)
  const [userInfo, setUserInfo] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [initialUserInfo, setInitialUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ get ID from localStorage
        if (!userId) return;

        const { data } = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserInfo(data);
        setInitialUserInfo(data); // for cancelling edits
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        // ✅ get ID from localStorage
        if (!userId) return;

        const { data } = await axios.get(
          `http://localhost:5000/api/reservations/user/${userId}`
        );
        setReservations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserReservations();
  }, []);

  if (!userInfo) return <p>Chargement...</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    // password confirmation
    if (userInfo.password !== userInfo.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, userInfo);
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été sauvegardées avec succès.',
      });
      setIsEditing(false);
      setInitialUserInfo(userInfo); // update initial info
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err.response?.data?.message || err.message,
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setUserInfo(initialUserInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast({
      title: 'Déconnexion',
      description: 'Vous avez été déconnecté avec succès.',
    });
    navigate('/connexion');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="min-h-screen pt-[150px] px-4 py-8 bg-background flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          {/* Profile Header */}
          <div className="p-6 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-foreground">
                {userInfo.firstName} {userInfo.lastName}
              </h1>
              <p className="text-muted-foreground mb-2">{userInfo.email}</p>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                className="btn btn-warning"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Profil Tab */}
          <div className="w-full bg-white rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-center mb-4 gap-2">
              <h2 className="text-xl font-bold">Mes informations</h2>
              {isEditing ? (
                <div className="flex gap-4">
                  <Button onClick={handleSaveProfile}>Sauvegarder</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Modifier</Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Prénom"
              />
              <Input
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Nom"
              />
              <Input
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Email"
              />
              <Input
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Téléphone"
              />
              <Input
                name="password"
                type="password"
                value={userInfo.password || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Mot de passe"
              />
              <Input
                name="confirmPassword"
                type="password"
                value={userInfo.confirmPassword || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Confirmer le mot de passe"
              />
              <Select
                value={userInfo.genre || ''}
                onValueChange={(value) => handleSelectChange('genre', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
    <div className=" my-5 w-full bg-gradient-to-br from-yellow-50 via-white to-pink-50 rounded-2xl shadow-2xl p-10 space-y-10">
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
        <Calendar className="h-7 w-7 text-indigo-600" />
        Mes Réservations
      </h2>

      {reservations.length === 0 ? (
        <p className="text-gray-500 text-lg italic">
          Aucune réservation pour le moment...
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
            >
              <div className="space-y-4 text-gray-700">
                {/* ID */}
                <div className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-indigo-500" />
                  <span className="font-semibold text-gray-900">
                    ID Réservation:
                  </span>
                  <span>{reservation.reservationID}</span>
                </div>

                {/* Type */}
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-pink-500" />
                  <span className="font-semibold text-gray-900">Type:</span>
                  <span>{reservation.type_reservation}</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {reservation.status === "confirmée" && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {reservation.status === "en attente" && (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  {reservation.status === "annulée" && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}

                  <span className="font-semibold text-gray-900">Statut:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      reservation.status === "confirmée"
                        ? "bg-green-100 text-green-700"
                        : reservation.status === "en attente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>

                {/* Montant */}
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-gray-900">Montant:</span>
                  <span className="text-gray-800 font-medium">
                    {reservation.montant} MAD
                  </span>
                </div>

                {/* Chambre */}
                {reservation.préference_user?.hebergement?.room && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold text-gray-900">Chambre:</span>
                    <span>
                      {
                        reservation.préference_user.hebergement.room.typeChambre
                      }{" "}
                      / {reservation.préference_user.hebergement.room.typeLit}
                    </span>
                  </div>
                )}

                {/* Transport */}
                {reservation.préference_user?.transport?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Bus className="h-5 w-5 text-emerald-500" />
                    <span className="font-semibold text-gray-900">
                      Transport:
                    </span>
                    <span>
                      {reservation.préference_user.transport
                        .map((t) => t.type)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      </main>

      <NeoFooter />
    </div>
  );
};

export default ProfilPage;
