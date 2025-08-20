import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/Select';
import { useToast } from '../components/toastManager';
import axios from 'axios';
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Plane,
  CheckCircle,
  CreditCard,
  AlertCircle,
  Star,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import useGetHebergementById from '../hooks/useGetHebergementById';

const HebergementReservationPage = () => {
  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    // Informations personnelles
    bookingInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      genre: '',
    },
    // Paiement
    modePaiement: '',
    accepteCGV: false,
    type_reservation: 'hebergement',
    truc_reserver: id,
    préference_user: {
      hebergement: {
        room: {
          typeChambre: '',
          typeLit: '',
          prix: 0,
        },
      },
      transport: [],
      generale: '',
    },
    nb_personne: 1,
    montant: 0,
    montant_unitaire: 0,
    status: 'en attente',
  });
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/connexion');
    } else {
      const user = JSON.parse(storedUser);
      // Set the form data with existing user info
      setFormData((prev) => ({
        ...prev,
        bookingInfo: {
          ...prev.bookingInfo,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          genre: user.genre || '',
        },
      }));
    }
  }, []);
  // Mock data du voyage (en production, fetch depuis API)
  const { data, loading, error } = useGetHebergementById(id);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-yellow-500 w-60"></span>
      </div>
    ); // safe, nothing else runs until data exists
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-red">Error: {error}</div>;
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>No data found</div>
      </div>
    );
  }

  const hebergement = data;
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.bookingInfo.firstName &&
          formData.bookingInfo.lastName &&
          formData.bookingInfo.email &&
          formData.bookingInfo.phone
        );
      case 2:
        return formData.nb_personne > 0;
      case 4:
        return formData.modePaiement && formData.accepteCGV;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: 'Informations incomplètes',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
        duration: 4000,
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const submitReservation = () => {
    if (!validateStep(4)) {
      toast({
        title: 'Informations incomplètes',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }
    try {
      // Préparer les infos à envoyer
      const reservationData = {
        user: userId, // référence vers l'utilisateur
        bookingInfo: formData.bookingInfo,
        modePaiement: formData.modePaiement,
        type_reservation: 'hebergement',
        truc_reserver: id,
        préference_user: formData.préference_user,
        nb_personne: formData.nb_personne,
        montant: calculateTotal(),
        montant_unitaire: formData.montant_unitaire,
        date_reservation: new Date(),
        status: 'en attente',
      };
      console.log(reservationData);

      axios.post('http://localhost:5000/api/reservations', reservationData);
      // Success toast uniquement si la requête réussit
      toast({
        title: 'Réservation confirmée !',
        description: 'Nous vous enverrons la confirmation par email.',
      });

      // Redirection
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log('hiih');
      console.log(err);
      toast({
        title: 'Erreur',
        description: err.response?.data?.message || 'Impossible de réserver.',
        variant: 'destructive',
      });
    }
  };

  const calculateTotal = () => {
    const prix = formData.préference_user.hebergement.room?.prix;
    if (prix > 0) {
      return prix * formData.nb_personne;
    }
    return hebergement.prix_basique * formData.nb_personne;
  };

  const steps = [
    { number: 1, title: 'Informations personnelles', icon: Users },
    { number: 2, title: "Détails de l'hebergement", icon: Plane },
    { number: 3, title: 'Paiement', icon: CreditCard },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-[145px] min-h-screen   bg-[#f3f0ed80]">
        <main className="container mx-auto max-w-7xl  px-4 py-8">
          {/* Navigation retour */}
          <button
            onClick={() => navigate('/hebergement/' + id)}
            className="btn mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'hebergement
          </button>

          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Réservation
            </h1>
            <div className="bg-yellow-400/10 xl:w-[1300px] border border-amber-100 rounded-4xl">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Infos principales */}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {hebergement.name}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {hebergement.city}, {hebergement.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{hebergement.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {hebergement.BreakfastIncluded
                            ? 'Petit-déjeuner inclus'
                            : 'Sans petit-déjeuner'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-600">
                      {hebergement.prix_basique.toLocaleString('fr-FR')} DH
                    </div>
                    <div className="text-muted-foreground">par nuit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 bg-white p-5 h-fit rounded-4xl">
              {/* Progress Steps */}
              <div className="mb-8 ">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;

                    return (
                      <div key={step.number} className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                            isCompleted
                              ? 'bg-primary border-primary text-primary-foreground'
                              : isActive
                              ? 'border-primary text-primary bg-primary/10'
                              : 'border-muted-foreground text-muted-foreground'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-4 ${
                              isCompleted ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Étape {currentStep} sur {totalSteps}
                  </p>
                </div>
              </div>

              {/* Contenu des étapes */}
              <div>
                <div className="p-6">
                  {/* Étape 1: Informations personnelles */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 
                        <div>
                          <label htmlFor="civilite">Civilité *</label>
                          <Select
                            value={formData.civilite}
                            onValueChange={(value) =>
                              handleSelectChange('civilite', value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="M">Monsieur</SelectItem>
                              <SelectItem value="Mme">Madame</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        */}
                        <div>
                          <label htmlFor="nom">Nom *</label>
                          <input
                            id="nom"
                            name="nom"
                            className="input"
                            value={formData.bookingInfo.firstName}
                            onChange={handleInputChange}
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="prenom">Prénom *</label>
                          <input
                            id="prenom"
                            name="prenom"
                            className="input"
                            value={formData.bookingInfo.lastName}
                            onChange={handleInputChange}
                            placeholder="Votre prénom"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="genre">Genre *</label>
                          <input
                            id="genre"
                            name="genre"
                            type="genre"
                            value={formData.bookingInfo.genre}
                            className="input"
                            onChange={handleInputChange}
                            placeholder=""
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="email">Email *</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.bookingInfo.email}
                            className="input"
                            onChange={handleInputChange}
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="telephone">Téléphone *</label>
                          <input
                            id="telephone"
                            name="telephone"
                            className="input"
                            value={formData.bookingInfo.phone}
                            onChange={handleInputChange}
                            placeholder="+212 6 00 00 00 00"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 2: Détails du voyage */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="nombrePersonnes">
                          Nombre de personnes *
                        </label>
                        <Select
                          value={formData.nb_personne.toString()}
                          onValueChange={(value) =>
                            handleSelectChange('nb_personne', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} personne{num > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-4">
                        {/* Type de chambre */}
                        <div>
                          <label htmlFor="typeChambre">Type de chambre</label>
                          <Select
                            value={
                              formData.préference_user?.hebergement?.room
                                ?.typeChambre || ''
                            }
                            onValueChange={(typeChambre) => {
                              // Prendre la première chambre disponible pour ce type
                              const selectedRoom = hebergement.rooms.find(
                                (r) => r.typeChambre === typeChambre
                              );
                              setFormData((prev) => ({
                                ...prev,
                                préference_user: {
                                  ...prev.préference_user,
                                  hebergement: {
                                    ...prev.préference_user.hebergement,
                                    room: selectedRoom || {
                                      typeChambre,
                                      typeLit: '',
                                      prix: 0,
                                    },
                                  },
                                },
                              }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir le type de chambre" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                ...new Set(
                                  hebergement.rooms.map((r) => r.typeChambre)
                                ),
                              ].map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Type de lit */}
                        <div>
                          <label htmlFor="typeLit">Type de lit</label>
                          <Select
                            value={
                              formData.préference_user?.hebergement?.room
                                ?.typeLit || ''
                            }
                            onValueChange={(typeLit) => {
                              const selectedRoom = hebergement.rooms.find(
                                (r) =>
                                  r.typeChambre ===
                                    formData.préference_user.hebergement.room
                                      .typeChambre && r.typeLit === typeLit
                              );

                              setFormData((prev) => ({
                                ...prev,
                                préference_user: {
                                  ...prev.préference_user,
                                  hebergement: {
                                    ...prev.préference_user.hebergement,
                                    room: selectedRoom || {
                                      ...prev.préference_user.hebergement.room,
                                      typeLit,
                                      prix: 0,
                                    },
                                  },
                                },
                              }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir le type de lit" />
                            </SelectTrigger>
                            <SelectContent>
                              {hebergement.rooms
                                .filter(
                                  (r) =>
                                    r.typeChambre ===
                                    formData.préference_user?.hebergement?.room
                                      ?.typeChambre
                                )
                                .map((r) => (
                                  <SelectItem key={r.typeLit} value={r.typeLit}>
                                    {r.typeLit} - {r.prix} DH
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="preferencesSpeciales">
                          Préférences spéciales
                        </label>
                        <textarea
                          id="preferencesSpeciales"
                          name="preferencesSpeciales"
                          value={formData.préference_user.generale}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              préference_user: {
                                ...prev.préference_user,
                                generale: e.target.value,
                              },
                            }));
                          }}
                          placeholder="Régime alimentaire, handicap, autres demandes..."
                          className="bg-[#f3f0ed80] p-2 rounded-xl"
                          rows={4}
                        />
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Récapitulatif</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Prix par personne :</span>
                            <span>
                              {formData.préference_user.hebergement.room.prix.toLocaleString(
                                'fr-FR'
                              )}{' '}
                              DH
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nombre de personnes :</span>
                            <span>{formData.nb_personne}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total :</span>
                            <span>
                              {calculateTotal().toLocaleString('fr-FR')} DH
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 4: Paiement */}
                  {currentStep === 3 && (
                    <div className="space-y-6 ">
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800">
                              Documents requis
                            </h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              Assurez-vous d'avoir tous les documents
                              nécessaires avant votre départ.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Mode de paiement</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="especes"
                              name="modePaiement"
                              value="especes"
                              checked={formData.modePaiement === 'especes'}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="especes">Espèces (en agence)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="virement"
                              name="modePaiement"
                              value="virement"
                              checked={formData.modePaiement === 'virement'}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="virement">Virement bancaire</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="cheque"
                              name="modePaiement"
                              value="cheque"
                              checked={formData.modePaiement === 'cheque'}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="cheque">Chèque</label>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30">
                        <div className="p-4">
                          <h4 className="font-semibold mb-3">
                            Détail du paiement
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Montant total :</span>
                              <span>
                                {calculateTotal().toLocaleString('fr-FR')} DH
                              </span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>Solde à payer :</span>
                              <span>
                                {calculateTotal().toLocaleString('fr-FR')} DH
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            className="checkbox"
                            id="accepteCGV"
                            checked={formData.accepteCGV}
                            onChange={(e) =>
                              handleCheckboxChange(
                                'accepteCGV',
                                e.target.checked
                              )
                            }
                          />
                          <label htmlFor="accepteCGV" className="text-sm">
                            J'accepte les{' '}
                            <a
                              href="/conditions-generales-de-vente"
                              className="text-primary underline"
                            >
                              conditions générales de vente
                            </a>{' '}
                            *
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-6 border-t">
                    <button
                      onClick={prevStep}
                      className="btn"
                      disabled={currentStep === 1}
                    >
                      Précédent
                    </button>

                    {currentStep < totalSteps ? (
                      <button className="btn" onClick={nextStep}>
                        Suivant
                      </button>
                    ) : (
                      <button
                        onClick={submitReservation}
                        className="btn bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirmer la réservation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé collant */}
            <div className="lg:col-span-1">
              <div className="sticky flex-col gap-5 flex top-4 xl:w-md bg-white p-5 rounded-4xl">
                <h1 className="text-3xl font-semibold">
                  Résumé de votre réservation
                </h1>

                <h3 className="font-semibold">{hebergement.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {hebergement.city}, {hebergement.country}
                </p>

                <div className="flex justify-between">
                  <span>Chambre :</span>
                  <span>
                    {formData.préference_user.hebergement.room?.typeChambre ||
                      '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Type de lit :</span>
                  <span>
                    {formData.préference_user.hebergement.room?.typeLit || '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Personnes :</span>
                  <span>{formData.nb_personne}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prix unitaire :</span>
                  <span>
                    {(
                      formData.préference_user.hebergement.room.prix ||
                      hebergement.prix_basique
                    ).toLocaleString('fr-FR')}{' '}
                    DH
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total :</span>
                  <span className="text-primary">
                    {calculateTotal().toLocaleString('fr-FR')} DH
                  </span>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Inclus :</h4>
                  <ul className="text-xs space-y-1">
                    {hebergement.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {service}
                      </li>
                    ))}
                    {hebergement.BreakfastIncluded && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        Petit-déjeuner inclus
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <NeoFooter />
    </>
  );
};

export default HebergementReservationPage;
