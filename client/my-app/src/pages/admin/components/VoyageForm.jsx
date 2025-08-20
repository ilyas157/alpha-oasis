import React, { useState } from 'react';
import {
  Plus,
  Users,
  MapPin,
  Plane,
  CheckCircle,
  CreditCard,
  FileText,
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';
const typeVoyageOptions = [
  'omra_hajj',
  'voyage_organise',
  'circuit_decouverte',
  'sejour_balnaire',
  'voyage_affaires',
];

const sousTypeOptions = {
  omra_hajj: ['omra_standard', 'omra_premium', 'hajj_standard', 'hajj_vip'],
  voyage_organise: ['groupe', 'individuel', 'famille'],
  circuit_decouverte: ['culturel', 'aventure', 'gastronomique'],
  sejour_balnaire: ['tout_inclus', 'demi_pension', 'petit_dejeuner'],
  voyage_affaires: ['conference', 'seminaire', 'incentive'],
};

const statusOptions = ['draft', 'active', 'suspended', 'archived'];

const hebergementTypes = [
  'hotel',
  'riad',
  'resort',
  'appartement',
  'villa',
  'auberge',
  'camping',
  'guesthouse',
];

const servicesOptions = [
  'wifi',
  'spa',
  'piscine',
  'salle_sport',
  'restaurant',
  'bar',
  'room_service',
  'concierge',
  'parking',
  'navette_aeroport',
  'climatisation',
  'television',
  'minibar',
  'coffre_fort',
];
const VoyageForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const steps = [
    { number: 1, title: 'Informations personnelles', icon: MapPin },
    { number: 2, title: 'Détails du voyage', icon: Plane },
    { number: 3, title: 'Documents', icon: FileText },
    { number: 4, title: 'Paiement', icon: CreditCard },
  ];
  const [voyageForm, setVoyageForm] = useState({
    // Info Générale
    destination: '',
    pays: [],
    villes: [],
    periode: '',
    type: '',
    sous_type: '',
    prix_basique: '',
    nb_places: '',
    date_limite_reservation: '',
    status: 'draft',
    label: '',
    inclus: [],
    description: '',
    duree: '',

    // Étapes
    etapes: [],
  });
  const addEtape = () => {
    setVoyageForm((prev) => ({
      ...prev,
      etapes: [
        ...prev.etapes,
        {
          id: Date.now(),
          trajets: [],
          sejours: [],
        },
      ],
    }));
  };

  const addTrajet = (etapeIndex) => {
    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].trajets.push({
      id: Date.now(),
      ville_depart: '',
      lieu_depart: '',
      date_depart: '',
      heure_depart: '',
      ville_arrivee: '',
      lieu_arrivee: '',
      date_arrivee: '',
      heure_arrivee: '',
      info_transport: {
        type: '',
        duree: '',
        escales: '',
        compagnie: '',
        classe: '',
        bagages: '',
      },
    });
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const addSejour = (etapeIndex) => {
    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].sejours.push({
      id: Date.now(),
      hebergement_id: '',
      jours: [],
    });
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const addJour = (etapeIndex, sejourIndex) => {
    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].sejours[sejourIndex].jours.push({
      id: Date.now(),
      date: '',
      activites: [],
      repas: {
        petit_dejeuner: false,
        dejeuner: false,
        diner: false,
      },
    });
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const addActivite = (etapeIndex, sejourIndex, jourIndex) => {
    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].sejours[sejourIndex].jours[jourIndex].activites.push({
      id: Date.now(),
      titre: '',
      duree: '',
      inclus: false,
      prix: '',
      description: '',
    });
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };
  const handleAddItem = () => {
    setCurrentVoyage(null);
    if (currentMode === 'voyage') {
      setVoyageForm({
        destination: '',
        pays: [],
        villes: [],
        periode: '',
        type: '',
        sous_type: '',
        prix_basique: '',
        nb_places: '',
        date_limite_reservation: '',
        status: 'draft',
        label: '',
        inclus: [],
        description: '',
        duree: '',
        etapes: [],
      });
    } else {
      setHebergementForm({
        name: '',
        type: '',
        slug: '',
        note: '',
        country: '',
        city: '',
        availability: true,
        address: '',
        services: [],
        prix_basique: '',
        rooms: [],
        rating: '',
        BreakfastIncluded: false,
        proximity: '',
        description: '',
        images: [],
        thumbnail: '',
        tags: [],
        status: 'active',
      });
    }
    setDialogOpen(true);
  };
  const handleSubmit = () => {
    console.log('submitted');
  };
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  return (
    <>
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
            {/* Étape 1: Informations générales */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="destination">Destination *</label>
                    <input
                      id="destination"
                      value={voyageForm.destination}
                      onChange={(e) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          destination: e.target.value,
                        }))
                      }
                      placeholder="Ex: La Mecque, Istanbul..."
                    />
                  </div>
                  <div>
                    <label htmlFor="periode">Période *</label>
                    <input
                      className="input"
                      id="periode"
                      value={voyageForm.periode}
                      onChange={(e) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          periode: e.target.value,
                        }))
                      }
                      placeholder="Ex: Ramadan 2025, Été 2025..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="type">Type *</label>
                    <Select
                      value={voyageForm.type}
                      onValueChange={(value) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          type: value,
                          sous_type: '',
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeVoyageOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="sous_type">Sous-type</label>
                    <Select
                      value={voyageForm.sous_type}
                      onValueChange={(value) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          sous_type: value,
                        }))
                      }
                      disabled={!voyageForm.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un sous-type" />
                      </SelectTrigger>
                      <SelectContent>
                        {voyageForm.type &&
                          sousTypeOptions[voyageForm.type]?.map((sousType) => (
                            <SelectItem key={sousType} value={sousType}>
                              {sousType}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="status">Statut</label>
                    <Select
                      value={voyageForm.status}
                      onValueChange={(value) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          status: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="prix_basique">Prix de base (DH) *</label>
                    <input
                      className="input"
                      id="prix_basique"
                      type="number"
                      value={voyageForm.prix_basique}
                      onChange={(e) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          prix_basique: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="nb_places">Nombre de places</label>
                    <input
                      className="input"
                      id="nb_places"
                      type="number"
                      value={voyageForm.nb_places}
                      onChange={(e) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          nb_places: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="duree">Durée (jours)</label>
                    <input
                      className="input"
                      id="duree"
                      type="number"
                      value={voyageForm.duree}
                      onChange={(e) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          duree: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="date_limite">Date limite réservation</label>
                    <input
                      className="input"
                      id="date_limite"
                      type="date"
                      value={voyageForm.date_limite_reservation}
                      onChange={(e) =>
                        setVoyageForm((prev) => ({
                          ...prev,
                          date_limite_reservation: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description">Description *</label>
                  <textarea
                    className="textarea"
                    id="description"
                    value={voyageForm.description}
                    onChange={(e) =>
                      setVoyageForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Description détaillée du voyage..."
                  />
                </div>
              </div>
            )}

            {/* Étape 2: Détails du voyage */}
            {currentStep === 2 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-base font-semibold">Trajets</label>
                  <button className="btn btn-sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un trajet
                  </button>
                </div>

                <div className="mb-4">
                  <div className="pt-4 space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="text-sm">Ville départ</label>
                        <input
                          className="input input-sm"
                          placeholder="Casablanca"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Lieu départ</label>
                        <input
                          className="input input-sm"
                          placeholder="Aéroport Mohammed V"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Date départ</label>
                        <input className="input input-sm" type="date" />
                      </div>
                      <div>
                        <label className="text-sm">Heure départ</label>
                        <input className="input input-sm" type="time" />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="text-sm">Ville arrivée</label>
                        <input
                          className="input input-sm"
                          placeholder="Jeddah"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Lieu arrivée</label>
                        <input
                          className="input input-sm"
                          placeholder="Aéroport King Abdulaziz"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Date arrivée</label>
                        <input className="input input-sm" type="date" />
                      </div>
                      <div>
                        <label className="text-sm">Heure arrivée</label>
                        <input className="input input-sm" type="time" />
                      </div>
                    </div>

                    {/**/}

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm">Type transport</label>
                        <Select>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Avion" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="avion">Avion</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="train">Train</SelectItem>
                            <SelectItem value="voiture">Voiture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm">Compagnie</label>
                        <input
                          className="input input-sm"
                          placeholder="Royal Air Maroc"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Classe</label>
                        <Select>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Économique" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economique">
                              Économique
                            </SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="premiere">Première</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Documents */}
            {currentStep === 3 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-base font-semibold">Séjours</label>
                  <button className="btn btn-ghost btn-sm h-6 px-2 text-xs">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un séjour
                  </button>
                </div>

                {/*{etape.sejours.map((sejour, sejourIndex) => ( */}
                <div className="mb-4">
                  <div className="pt-4 space-y-3">
                    <div>
                      <label className="text-sm">Hébergement</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un hébergement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hilton-mecca">
                            Hilton Mecca
                          </SelectItem>
                          <SelectItem value="pullman-medina">
                            Pullman Medina
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Jours */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold">
                          Programme journalier
                        </label>
                        <button className="btn btn-ghost btn-sm h-6 px-2 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Ajouter un jour
                        </button>
                      </div>

                      {/*{sejour.jours.map((jour, jourIndex) => (*/}
                      <div className="mb-3 border-dashed border">
                        <div className="pt-3 space-y-2">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label className="text-xs">Date</label>
                              <input className="input input-sm" type="date" />
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <input
                                type="checkbox"
                                className="checkbox"
                                id=""
                              />
                              <label>P.Déj</label>

                              <input type="checkbox" className="checkbox" />
                              <label>Déj</label>

                              <input type="checkbox" className="checkbox" />
                              <label>Dîner</label>
                            </div>
                          </div>

                          {/* Activités */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-xs font-semibold">
                                Activités
                              </label>
                              <button
                                className="btn btn-ghost btn-sm h-6 px-2 text-xs"
                                onClick={() =>
                                  addActivite(
                                    etapeIndex,
                                    sejourIndex,
                                    jourIndex
                                  )
                                }
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Activité
                              </button>
                            </div>

                            {/*{jour.activites.map(
                                            (activite, activiteIndex) => (*/}
                            <div className="grid grid-cols-4 gap-2 p-2 bg-muted/50 rounded">
                              <input
                                placeholder="Titre"
                                className="input input-sm text-xs"
                              />
                              <input
                                placeholder="Durée"
                                className="input input-sm text-xs"
                              />
                              <input
                                placeholder="Prix"
                                className="input input-sm text-xs"
                              />
                              <div className="flex items-center">
                                <input type="checkbox" className="checkbox" />
                                <label className="text-xs ml-1">Inclus</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 4: Paiement */}
            {currentStep === 4 && <div className="space-y-6 "></div>}

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
                <button className="btn bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Confirmer la réservation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Étapes du voyage */}
        <div>
          <div>
            <div className="space-y-6">
              {/*{voyageForm.etapes.map((etape, etapeIndex) => (*/}
              <button onClick={addEtape} className=" btn w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une étape
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn">Annuler</button>
          <button className="btn" type="submit">
            Créer le voyage
          </button>
        </div>
      </form>
    </>
  );
};

export default VoyageForm;
