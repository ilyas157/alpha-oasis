import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Galerie from './pages/Galerie';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import ConditionVente from './pages/ConditionVente';
import Hebergement from './pages/Hebergement';
import VoyageOrganisé from './pages/VoyageOrganisé';
import VoyageDetail from './pages/VoyageDetail';
import ReservationPage from './pages/ReservationPage';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import VoyagesAdmin from './pages/admin/VoyagesAdmin';
import ReservationsAdmin from './pages/admin/ReservationsAdmin';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HebergementAdmin from './pages/admin/HebergementAdmin';
import Omra from './pages/Omra';
import CreateVoyage from './pages/admin/CreateVoyage';
import VoyageFormUpdate from './pages/admin/components/VoyageFormUpdate';
import CreateHebergement from './pages/admin/components/CreateHebergement';
import HebergementFormUpdate from './pages/admin/components/HebergementFormUpdate';
import RequireAuth from './components/RequireAuth';
import UsersAdmin from './pages/admin/UsersAdmin';
import UserLogin from './pages/UserLogin';
import ProfilPage from './pages/ProfilPage';
import HebergementDetail from './pages/HebergementDetail';
import HebergementReservationPage from './pages/HebergementReservationPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation/voyage/:id" element={<ReservationPage />} />
        <Route path="/voyage/:id" element={<VoyageDetail />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/voyage" element={<VoyageOrganisé />} />
        <Route path="omra_hajj" element={<Omra />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/connexion" element={<UserLogin />} />
        <Route path="/profile" element={<ProfilPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="/conditions-generales-de-vente"
          element={<ConditionVente />}
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="voyages" element={<VoyagesAdmin />} />
          <Route path="voyages/create" element={<CreateVoyage />} />
          <Route path="voyages/:id" element={<VoyageFormUpdate />} />
          <Route path="hebergements" element={<HebergementAdmin />} />
          <Route path="hebergements/:id" element={<HebergementFormUpdate />} />

          <Route path="hebergements/create" element={<CreateHebergement />} />
          <Route path="reservations" element={<ReservationsAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route
            path="settings"
            element={<div>Settings Admin - À venir</div>}
          />
        </Route>
        <Route path="/hebergement" element={<Hebergement />} />
        <Route path="/hebergement/:id" element={<HebergementDetail />} />
        HebergementReservationPage
        <Route
          path="/reservation/hebergement/:id"
          element={<HebergementReservationPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
