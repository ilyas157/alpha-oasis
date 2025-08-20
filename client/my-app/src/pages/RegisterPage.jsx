import { useState } from 'react';
import { useToast } from '../components/toastManager';
import { ArrowRight, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import axios from 'axios';

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.prenom ||
      !formData.nom ||
      !formData.email ||
      !formData.password
    ) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
        duration: 4000,
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
        duration: 4000,
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 6 caractères.',
        variant: 'destructive',
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {

      await axios.post('http://localhost:5000/api/users', {
        firstName: formData.prenom,
        lastName: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        password: formData.password,
        role: 'user', // valeur par défaut
      });

      toast({
        title: 'Compte créé avec succès !',
        description: 'Vous pouvez maintenant vous connecter.',
        duration: 4000,
      });
      navigate('/connexion');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le compte.',
        variant: 'destructive',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[145px] container mx-auto px-4 py-16 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <UserPlus className="h-5 w-5" /> Créer un compte
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Prénom *</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="Votre prénom"
              required
            />
          </div>

          <div>
            <label>Nom *</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label>Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="+212 6 00 00 00 00"
            />
          </div>

          <div>
            <label>Mot de passe *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label>Confirmer le mot de passe *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-lg w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Création du compte...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Vous avez déjà un compte ?{' '}
          <Link className="text-primary hover:underline" to="/connexion">
            Se connecter
          </Link>
        </p>
      </main>
      <NeoFooter />
    </div>
  );
};

export default RegisterPage;
