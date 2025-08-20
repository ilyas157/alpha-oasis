import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Plus,
  MapPin,
  Plane,
  FileText,
  CreditCard,
  CheckCircle,
  Trash2,
  Calendar,
  Users,
  Clock,
  Hotel,
  ChevronDown,
  ChevronUp,
  Save,
  Minus,
  Cross,
  X,
  ChevronsDown,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from '../../../components/details/Badge';
import ArrayInput from './ui/ArrayInput';
import useGetDataById from '../../../hooks/useGetDataById';
import { useEffect } from 'react';
import useGetDataByIdNp from '../../../hooks/useGetDataByIdNp';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

const subTypeChoices = {
  omra_hajj: ['omra_simple', 'omra_voyage', 'hajj'],
  voyage_organisé: [
    'voyage_local_simple',
    'voyage_local_circuit',
    'voyage_inter',
  ],
};
const typeChoices = ['omra_hajj', 'voyage_organisé'];

const statusOptions = ['valable', 'expiré'];

const VoyageFormUpdate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedEtape, setExpandedEtape] = useState(null);
  const [errors, setErrors] = useState({});
  const totalSteps = 4;
  const { id } = useParams();
  const res = useGetDataByIdNp(id);
  const voyage = res.data;

  const [voyageForm, setVoyageForm] = useState(null);

  useEffect(() => {
    if (voyage) {
      setVoyageForm(voyage);
    }
  }, [voyage]);

  if (res.loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-yellow-500 w-60"></span>
      </div>
    );
  }

  if (res.error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-red">
          Error: {res.error.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!voyageForm) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>No data found</div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Informations générales', icon: MapPin },
    { number: 2, title: 'Étapes & Trajets', icon: Plane },
    { number: 3, title: 'Séjours & Programme', icon: Hotel },
    { number: 4, title: 'Finalisation', icon: CheckCircle },
  ];
  const requiredFields = [
    'info_generale.destination',
    'info_generale.période',
    'info_generale.type',
    'info_generale.sous_type',
    'info_generale.prix_basique',
    'info_generale.description',
    'info_generale.date_limite_reservation',
    'info_generale.durée',
    'info_generale.nb_places',
    'info_generale.label',
    // add all other required fields here
  ];

  const stats = {
    etapes: voyageForm?.etapes?.length || 0,
    trajets:
      voyageForm?.etapes?.reduce(
        (total, etape) => total + (etape.trajet?.length || 0),
        0
      ) || 0,
    sejours:
      voyageForm?.etapes?.reduce(
        (total, etape) => total + (etape.séjour?.length || 0),
        0
      ) || 0,
    jours:
      voyageForm?.etapes?.reduce(
        (total, etape) =>
          total +
          (etape.séjour?.reduce(
            (sejourTotal, sejour) => sejourTotal + (sejour.jours?.length || 0),
            0
          ) || 0),
        0
      ) || 0,
  };

  // Form handlers
  const addEtape = () => {
    const newEtape = {
      trajet: [],
      séjour: [],
    };
    setVoyageForm((prev) => ({
      ...prev,
      etapes: [...prev.etapes, newEtape],
    }));
  };

  const removeEtape = (etapeIndex) => {
    setVoyageForm((prev) => ({
      ...prev,
      etapes: prev.etapes.filter((_, index) => index !== etapeIndex),
    }));
  };

  const addTrajet = (etapeIndex) => {
    const newTrajet = {
      depart: {
        ville_depart: '',
        lieu_depart: '',
        date_depart: '',
        heure_depart: '',
      },
      arrivé: {
        ville_arrivé: '',
        lieu_arrivé: '',
        date_arrivé: '',
      },
      info_transport: {
        longueur_trajet: 0,
        durée: 0,
        type_transport: '',
        type_vol: '',
        nb_escales: 0,
        durré_escales: 0,
        aéroport_escales: [],
        compagnie: '',
        class: [],
        bagages: 0,
      },
    };

    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].trajet.push(newTrajet);
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const removeTrajet = (etapeIndex, trajetIndex) => {
    const newEtapes = [...voyageForm.etapes];

    // Remove the trajet at the given index
    newEtapes[etapeIndex].trajet = newEtapes[etapeIndex].trajet.filter(
      (_, index) => index !== trajetIndex
    );

    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };
  const addSejour = (etapeIndex) => {
    const newSejour = {
      hebergement: '',
      jours: [],
    };

    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].séjour.push(newSejour);
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const addJour = (etapeIndex, sejourIndex) => {
    const newJour = {
      date: '',
      activités: [],
      repas: {
        petit_déjeuner: {
          inclus: false,
          lieu: '',
        },
        déjeuner: {
          inclus: false,
          lieu: '',
        },
        dinner: {
          inclus: false,
          lieu: '',
        },
      },
    };

    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].séjour[sejourIndex].jours.push(newJour);
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const addActivite = (etapeIndex, sejourIndex, jourIndex) => {
    const newActivite = {
      titre: '',
      durée: '',
      inclus: false,
      prix: 0,
    };

    const newEtapes = [...voyageForm.etapes];
    newEtapes[etapeIndex].séjour[sejourIndex].jours[jourIndex].activités.push(
      newActivite
    );
    setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
  };

  const removeSejour = (etapeIndex, sejourIndex) => {
    const newEtapes = [...voyageForm.etapes];
    if (newEtapes[etapeIndex]?.séjour) {
      newEtapes[etapeIndex].séjour = newEtapes[etapeIndex].séjour.filter(
        (_, idx) => idx !== sejourIndex
      );
      setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
    }
  };

  const removeJour = (etapeIndex, sejourIndex, jourIndex) => {
    const newEtapes = [...voyageForm.etapes];
    if (newEtapes[etapeIndex]?.séjour?.[sejourIndex]?.jours) {
      newEtapes[etapeIndex].séjour[sejourIndex].jours = newEtapes[
        etapeIndex
      ].séjour[sejourIndex].jours.filter((_, idx) => idx !== jourIndex);
      setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
    }
  };
  const removeActivite = (
    etapeIndex,
    sejourIndex,
    jourIndex,
    activiteIndex
  ) => {
    const newEtapes = [...voyageForm.etapes]; // declare first

    const jours = newEtapes[etapeIndex]?.séjour?.[sejourIndex]?.jours;
    if (jours?.[jourIndex]?.activités) {
      newEtapes[etapeIndex].séjour[sejourIndex].jours[jourIndex].activités =
        jours[jourIndex].activités.filter((_, idx) => idx !== activiteIndex);

      setVoyageForm((prev) => ({ ...prev, etapes: newEtapes }));
    }
  };

  const nextStep = () => {
    let newErrors = {};

    requiredFields.forEach((path) => {
      const value = path
        .split('.')
        .reduce((obj, key) => obj?.[key], voyageForm);
      if (!value || !String(value).trim()) {
        newErrors[path] = true; // store field path as error key
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // stop if any errors
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/voyage/${id}`,
        voyageForm,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Voyage mis à jour avec succès:', response.data);
      alert('Voyage mis à jour avec succès !');
      //setVoyageForm(response.data); // ✅ Optionnel: maj l'état local
    } catch (error) {
      console.error('Erreur mis à jour voyage:', error.response.data.error);
      alert(
        error.response?.data?.error || 'Erreur lors de la mise à jour du voyage.'
      );
    } finally {
      navigate('/admin/voyages');
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <Card className="bg-gradient-warm border-0 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Aperçu du voyage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold ">{stats.etapes}</div>
              <div className="text-sm text-muted-foreground">Étapes</div>
            </div>
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold ">{stats.trajets}</div>
              <div className="text-sm text-muted-foreground">Trajets</div>
            </div>
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold ">{stats.sejours}</div>
              <div className="text-sm text-muted-foreground">Séjours</div>
            </div>
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold ">{stats.jours}</div>
              <div className="text-sm text-muted-foreground">Jours</div>
            </div>
          </div>

          {voyageForm.info_generale.destination && (
            <div className="mt-4 p-3 bg-card/80 rounded-lg">
              <h4 className="font-semibold text-card-foreground">
                {voyageForm.info_generale.destination}
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {voyageForm.info_generale.type && (
                  <Badge variant="secondary">
                    {voyageForm.info_generale.type}
                  </Badge>
                )}
                {voyageForm.info_generale.durée && (
                  <Badge variant="outline">
                    {voyageForm.info_generale.durée} jours
                  </Badge>
                )}
                {voyageForm.info_generale.prix_basique && (
                  <Badge className="bg-primary">
                    {voyageForm.info_generale.prix_basique} DH
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card className="shadow-card">
        <CardHeader>
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
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
                        className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-card-foreground">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Étape {currentStep} sur {totalSteps}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form>
            {/* Step 1: General Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="destination">Destination *</label>
                    <Input
                      id="destination"
                      required
                      value={voyageForm.info_generale?.destination || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            destination: value,
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.destination'];
                          return updated;
                        });
                      }}
                      placeholder="Ex: La Mecque, Istanbul..."
                      className={`mt-1 ${
                        errors['info_generale.destination']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.destination'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                  <ArrayInput
                    label="Villes"
                    values={voyageForm.info_generale.villes || []}
                    onChange={(newVilles) =>
                      setVoyageForm((prev) => ({
                        ...prev,
                        info_generale: {
                          ...prev.info_generale,
                          villes: newVilles,
                        },
                      }))
                    }
                  />
                  <ArrayInput
                    label="Pays"
                    values={voyageForm.info_generale.pays || []}
                    onChange={(newPays) =>
                      setVoyageForm((prev) => ({
                        ...prev,
                        info_generale: {
                          ...prev.info_generale,
                          pays: newPays,
                        },
                      }))
                    }
                  />
                  <div>
                    <label htmlFor="periode">Période *</label>
                    <Input
                      id="periode"
                      value={voyageForm.info_generale?.période || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            période: value,
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.période'];
                          return updated;
                        });
                      }}
                      placeholder="Ex: Ramadan 2025, Été 2025..."
                      className={`mt-1 ${
                        errors['info_generale.période']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.période'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Type de voyage *</Label>
                    <Select
                      value={voyageForm.info_generale?.type || ''}
                      onValueChange={(value) => {
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            type: value,
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.type'];
                          return updated;
                        });
                      }}
                    >
                      <SelectTrigger
                        className={`mt-1 ${
                          errors['info_generale.type']
                            ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                            : ''
                        }`}
                      >
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeChoices.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                      {errors['info_generale.type'] && (
                        <p className="text-red-600 text-sm mt-1">
                          Ce champ est obligatoire
                        </p>
                      )}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sous_type">Sous-type</Label>
                    <Select
                      value={voyageForm.info_generale.sous_type}
                      onValueChange={(value) => {
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            sous_type: value,
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.sous_type'];
                          return updated;
                        });
                      }}
                      disabled={!voyageForm.info_generale.type}
                    >
                      <SelectTrigger
                        className={`mt-1 ${
                          errors['info_generale.sous_type']
                            ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                            : ''
                        }`}
                      >
                        <SelectValue placeholder="Sélectionner un sous-type" />
                      </SelectTrigger>
                      <SelectContent>
                        {voyageForm.info_generale.type &&
                          subTypeChoices[voyageForm.info_generale.type]?.map(
                            (sousType) => (
                              <SelectItem key={sousType} value={sousType}>
                                {sousType.replace('_', ' ')}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                      {errors['info_generale.sous_type'] && (
                        <p className="text-red-600 text-sm mt-1">
                          Ce champ est obligatoire
                        </p>
                      )}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={voyageForm.info_generale.status}
                      onValueChange={(value) => {
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            status: value,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="mt-1">
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="prix_basique">Prix de base (DH) *</Label>
                    <Input
                      id="prix_basique"
                      type="number"
                      value={voyageForm.info_generale.prix_basique}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            prix_basique: Number(value),
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.prix_basique'];
                          return updated;
                        });
                      }}
                      className={`mt-1 ${
                        errors['info_generale.prix_basique']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.prix_basique'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nb_places">Nombre de places *</Label>
                    <Input
                      id="nb_places"
                      type="number"
                      value={voyageForm.info_generale.nb_places}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            nb_places: Number(value),
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.nb_places'];
                          return updated;
                        });
                      }}
                      className={`mt-1 ${
                        errors['info_generale.nb_places']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.nb_places'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nombreReservations">
                      Nombre de reservations
                    </Label>
                    <Input
                      disabled
                      id="nombreReservations"
                      type="number"
                      value={voyageForm.info_generale.nombreReservations}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            nombreReservations: Number(value),
                          },
                        }));
                      }}
                      className="mt-1 "
                    />
                  </div>
                  <div>
                    <Label htmlFor="durée">Durée (jours) *</Label>
                    <Input
                      id="durée"
                      type="number"
                      value={voyageForm.info_generale?.durée || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            durée: Number(value),
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.durée'];
                          return updated;
                        });
                      }}
                      className={`mt-1 ${
                        errors['info_generale.durée']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.durée'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date_limite">
                      Date limite réservation *
                    </Label>
                    <Input
                      id="date_limite"
                      type="date"
                      value={
                        voyageForm.info_generale?.date_limite_reservation.split(
                          'T'
                        )[0] || ''
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            date_limite_reservation: value,
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated[
                            'info_generale.date_limite_reservation'
                          ];
                          return updated;
                        });
                      }}
                      className={`mt-1 ${
                        errors['info_generale.date_limite_reservation']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.date_limite_reservation'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                  <ArrayInput
                    label="inclus"
                    values={voyageForm.info_generale.inclus || []}
                    onChange={(newInclus) =>
                      setVoyageForm((prev) => ({
                        ...prev,
                        info_generale: {
                          ...prev.info_generale,
                          inclus: newInclus,
                        },
                      }))
                    }
                  />
                  <div>
                    <Label htmlFor="duree">label *</Label>
                    <Input
                      id="label"
                      value={voyageForm.info_generale?.label || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setVoyageForm((prev) => ({
                          ...prev,
                          info_generale: {
                            ...prev.info_generale,
                            label: value,
                          },
                        }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated['info_generale.label'];
                          return updated;
                        });
                      }}
                      className={`mt-1 ${
                        errors['info_generale.label']
                          ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {errors['info_generale.label'] && (
                      <p className="text-red-600 text-sm mt-1">
                        Ce champ est obligatoire
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={voyageForm.info_generale.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVoyageForm((prev) => ({
                        ...prev,
                        info_generale: {
                          ...prev.info_generale,
                          description: value,
                        },
                      }));
                      setErrors((prev) => {
                        const updated = { ...prev };
                        delete updated['info_generale.description'];
                        return updated;
                      });
                    }}
                    rows={4}
                    placeholder="Description détaillée du voyage..."
                    className={`mt-1 ${
                      errors['info_generale.description']
                        ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                  />
                  {errors['info_generale.description'] && (
                    <p className="text-red-600 text-sm mt-1">
                      Ce champ est obligatoire
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Étapes & Trajets */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Étapes du voyage</h3>
                  <Button
                    type="button"
                    onClick={addEtape}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une étape
                  </Button>
                </div>

                {voyageForm.etapes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune étape ajoutée pour le moment</p>
                    <p className="text-sm">
                      Cliquez sur "Ajouter une étape" pour commencer
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {voyageForm.etapes.map((etape, etapeIndex) => (
                      <Card key={etapeIndex} className="border border-muted">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setExpandedEtape(
                                    expandedEtape === etapeIndex
                                      ? null
                                      : etapeIndex
                                  )
                                }
                              >
                                {expandedEtape === etapeIndex ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                              <Badge variant="outline">
                                {etape.trajet.length} trajet
                                {etape.trajet.length > 1 ? 's' : ''}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                onClick={() => addTrajet(etapeIndex)}
                                variant="outline"
                                size="sm"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Trajet
                              </Button>
                              <Button
                                type="button"
                                onClick={() => removeEtape(etapeIndex)}
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        {expandedEtape === etapeIndex && (
                          <CardContent className="pt-0">
                            {etape.trajet.map((trajet, trajetIndex) => (
                              <div
                                key={trajetIndex}
                                className="mb-6 p-4 border border-muted rounded-lg"
                              >
                                <div className="flex  items-center justify-between">
                                  <h5 className="font-medium mb-3">
                                    Trajet {trajetIndex + 1}
                                  </h5>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() =>
                                      removeTrajet(etapeIndex, trajetIndex)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Départ */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                  <div>
                                    <Label className="text-sm">
                                      Ville départ
                                    </Label>
                                    <Input
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.depart?.ville_depart || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...newEtapes[etapeIndex].trajet,
                                          ];
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            depart: {
                                              ...newTrajets[trajetIndex].depart,
                                              ville_depart: value,
                                            },
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                      placeholder="Casablanca"
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Lieu départ
                                    </Label>
                                    <Input
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.depart?.lieu_depart || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...newEtapes[etapeIndex].trajet,
                                          ];
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            depart: {
                                              ...newTrajets[trajetIndex].depart,
                                              lieu_depart: value,
                                            },
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                      placeholder="Aéroport Mohammed V"
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Date départ
                                    </Label>
                                    <Input
                                      type="date"
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.depart?.date_depart.split('T')[0] ||
                                        ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...newEtapes[etapeIndex].trajet,
                                          ];
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            depart: {
                                              ...newTrajets[trajetIndex].depart,
                                              date_depart: value,
                                            },
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Heure départ
                                    </Label>
                                    <Input
                                      type="time"
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.depart?.heure_depart || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...newEtapes[etapeIndex].trajet,
                                          ];
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            depart: {
                                              ...newTrajets[trajetIndex].depart,
                                              heure_depart: value,
                                            },
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                  {/* Partie arrivée */}
                                </div>

                                {/* Arrivée*/}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                  <div>
                                    <Label className="text-sm">
                                      Ville arrivée
                                    </Label>
                                    <Input
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.arrivé?.ville_arrivé || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newArrive = {
                                            ...newTrajets[trajetIndex].arrivé,
                                            ville_arrivé: value,
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            arrivé: newArrive,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return {
                                            ...prev,
                                            etapes: newEtapes,
                                          };
                                        });
                                      }}
                                      placeholder="Jeddah"
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm">
                                      Lieu arrivée
                                    </Label>
                                    <Input
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.arrivé?.lieu_arrivé || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newArrive = {
                                            ...newTrajets[trajetIndex].arrivé,
                                            lieu_arrivé: value,
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            arrivé: newArrive,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return {
                                            ...prev,
                                            etapes: newEtapes,
                                          };
                                        });
                                      }}
                                      placeholder="Aéroport King Abdulaziz"
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm">
                                      Date arrivée
                                    </Label>
                                    <Input
                                      type="date"
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.arrivé?.date_arrivé.split('T')[0] ||
                                        ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newArrive = {
                                            ...newTrajets[trajetIndex].arrivé,
                                            date_arrivé: value,
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            arrivé: newArrive,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return {
                                            ...prev,
                                            etapes: newEtapes,
                                          };
                                        });
                                      }}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm">
                                      Heure arrivée
                                    </Label>
                                    <Input
                                      type="time"
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.arrivé?.heure_arrivé || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newArrive = {
                                            ...newTrajets[trajetIndex].arrivé,
                                            heure_arrivé: value,
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            arrivé: newArrive,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return {
                                            ...prev,
                                            etapes: newEtapes,
                                          };
                                        });
                                      }}
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                </div>
                                {/* Partie info_transport */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <Label className="text-sm">
                                      Type transport
                                    </Label>
                                    <Select
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.info_transport?.type_transport ||
                                        'avion'
                                      }
                                      onValueChange={(value) => {
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newInfoTransport = {
                                            ...newTrajets[trajetIndex]
                                              .info_transport,
                                            type_transport: value,
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            info_transport: newInfoTransport,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                    >
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="avion">
                                          Avion
                                        </SelectItem>
                                        <SelectItem value="bus">Bus</SelectItem>
                                        <SelectItem value="train">
                                          Train
                                        </SelectItem>
                                        <SelectItem value="voiture">
                                          Voiture
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-sm">Compagnie</Label>
                                    <Input
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.info_transport?.compagnie || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newInfoTransport = {
                                            ...newTrajets[trajetIndex]
                                              .info_transport,
                                            compagnie: value,
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            info_transport: newInfoTransport,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                      placeholder="Royal Air Maroc"
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm">Classe</Label>
                                    <Input
                                      value={
                                        voyageForm.etapes[etapeIndex]?.trajet[
                                          trajetIndex
                                        ]?.info_transport?.class?.[0] || ''
                                      }
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setVoyageForm((prev) => {
                                          const newEtapes = [...prev.etapes];
                                          const newTrajets = [
                                            ...(newEtapes[etapeIndex].trajet ||
                                              []),
                                          ];
                                          const newInfoTransport = {
                                            ...newTrajets[trajetIndex]
                                              .info_transport,
                                            class: [value], // tableau d'une seule valeur
                                          };
                                          newTrajets[trajetIndex] = {
                                            ...newTrajets[trajetIndex],
                                            info_transport: newInfoTransport,
                                          };
                                          newEtapes[etapeIndex] = {
                                            ...newEtapes[etapeIndex],
                                            trajet: newTrajets,
                                          };
                                          return { ...prev, etapes: newEtapes };
                                        });
                                      }}
                                      placeholder="Economie"
                                      className="mt-1"
                                      size="sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Séjours & Programme */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Séjours et programmes
                  </h3>
                  <Button
                    type="button"
                    onClick={addEtape}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un séjour
                  </Button>
                </div>

                {voyageForm.etapes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Hotel className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Vous devez d'abord créer des étapes</p>
                    <p className="text-sm">
                      Retournez à l'étape précédente pour ajouter des étapes
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {voyageForm.etapes.map((etape, etapeIndex) => (
                      <Card>
                        <CardHeader>
                          <h3 className="font-medium">
                            Étape {etapeIndex + 1}
                          </h3>
                          <Button
                            type="button"
                            onClick={() => addSejour(etapeIndex)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            séjour
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <div key={etapeIndex} className="space-y-4">
                            {etape.séjour.map((sejour, sejourIndex) => (
                              <Collapsible key={sejourIndex} defaultOpen>
                                <div className="mb-6 p-4 border border-muted rounded-lg">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                      <CollapsibleTrigger asChild>
                                        <h5 className="font-medium">
                                          Séjour {sejourIndex + 1}
                                        </h5>
                                      </CollapsibleTrigger>
                                    </div>

                                    <div className="flex items-center gap-5">
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          addJour(etapeIndex, sejourIndex)
                                        }
                                        variant="outline"
                                        size="sm"
                                      >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Jour
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          removeSejour(etapeIndex, sejourIndex)
                                        }
                                        variant="outline"
                                        size="sm"
                                      >
                                        <Minus className="h-4 w-4 mr-1" />
                                      </Button>
                                    </div>
                                  </div>

                                  <CollapsibleContent>
                                    <div className="mb-4">
                                      <Label className="text-sm">
                                        Hébergement
                                      </Label>
                                      <Input
                                        id="heberement"
                                        value={
                                          voyageForm.etapes[etapeIndex]?.séjour[
                                            sejourIndex
                                          ]?.hebergement || ''
                                        }
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setVoyageForm((prev) => {
                                            const newEtapes = [...prev.etapes];
                                            const newSejours = [
                                              ...newEtapes[etapeIndex].séjour,
                                            ];

                                            newSejours[sejourIndex] = {
                                              ...newSejours[sejourIndex],
                                              hebergement: value,
                                            };
                                            newEtapes[etapeIndex] = {
                                              ...newEtapes[etapeIndex],
                                              séjour: newSejours,
                                            };
                                            return {
                                              ...prev,
                                              etapes: newEtapes,
                                            };
                                          });
                                        }}
                                        className="mt-1"
                                      />
                                    </div>

                                    {sejour.jours.map((jour, jourIndex) => (
                                      <div
                                        key={jourIndex}
                                        className="mb-4 p-3 border border-dashed border-muted rounded"
                                      >
                                        <div className="flex items-center justify-between mb-3">
                                          <h6 className="font-medium text-sm">
                                            Jour {jourIndex + 1}
                                          </h6>
                                          <div className="flex items-center gap-5">
                                            <Button
                                              type="button"
                                              onClick={() =>
                                                addActivite(
                                                  etapeIndex,
                                                  sejourIndex,
                                                  jourIndex
                                                )
                                              }
                                              variant="ghost"
                                              size="sm"
                                            >
                                              <Plus className="h-3 w-3 mr-1" />
                                              Activité
                                            </Button>
                                            <Button
                                              type="button"
                                              onClick={() => {
                                                removeJour(
                                                  etapeIndex,
                                                  sejourIndex,
                                                  jourIndex
                                                );
                                              }}
                                              variant="outline"
                                              size="sm"
                                            >
                                              <Minus className="h-4 w-4 mr-1" />
                                            </Button>
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                          <div>
                                            <Label className="text-xs">
                                              Date
                                            </Label>
                                            <Input
                                              type="date"
                                              value={
                                                voyageForm.etapes[
                                                  etapeIndex
                                                ]?.séjour[sejourIndex]?.jours[
                                                  jourIndex
                                                ]?.date.split('T')[0] || ''
                                              }
                                              onChange={(e) => {
                                                const value = e.target.value;
                                                setVoyageForm((prev) => {
                                                  const newEtapes = [
                                                    ...prev.etapes,
                                                  ];
                                                  const newSejours = [
                                                    ...newEtapes[etapeIndex]
                                                      .séjour,
                                                  ];
                                                  const newJours = [
                                                    ...newSejours[sejourIndex]
                                                      .jours,
                                                  ];
                                                  newJours[jourIndex] = {
                                                    ...newJours[jourIndex],
                                                    date: value,
                                                  };
                                                  newSejours[sejourIndex] = {
                                                    ...newSejours[sejourIndex],
                                                    jours: newJours,
                                                  };
                                                  newEtapes[etapeIndex] = {
                                                    ...newEtapes[etapeIndex],
                                                    séjour: newSejours,
                                                  };
                                                  return {
                                                    ...prev,
                                                    etapes: newEtapes,
                                                  };
                                                });
                                              }}
                                              className="mt-1"
                                              size="sm"
                                            />
                                          </div>
                                          <div>
                                            {[
                                              'petit_déjeuner',
                                              'déjeuner',
                                              'dinner',
                                            ].map((repasKey) => {
                                              const repasData = jour.repas?.[
                                                repasKey
                                              ] || { inclus: false, lieu: '' };
                                              const label =
                                                repasKey === 'dinner'
                                                  ? 'Dîner'
                                                  : repasKey
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                    repasKey
                                                      .slice(1)
                                                      .replace('_', ' ');

                                              return (
                                                <div
                                                  key={repasKey}
                                                  className="flex items-center justify-between mt-2"
                                                >
                                                  <label className="flex items-center gap-1 text-xs">
                                                    <input
                                                      type="checkbox"
                                                      className="rounded"
                                                      checked={repasData.inclus}
                                                      onChange={(e) => {
                                                        const checked =
                                                          e.target.checked;
                                                        setVoyageForm(
                                                          (prev) => {
                                                            const newEtapes = [
                                                              ...prev.etapes,
                                                            ];
                                                            const newSejours = [
                                                              ...newEtapes[
                                                                etapeIndex
                                                              ].séjour,
                                                            ];
                                                            const newJours = [
                                                              ...newSejours[
                                                                sejourIndex
                                                              ].jours,
                                                            ];
                                                            const oldRepas =
                                                              newJours[
                                                                jourIndex
                                                              ].repas || {};
                                                            newJours[
                                                              jourIndex
                                                            ] = {
                                                              ...newJours[
                                                                jourIndex
                                                              ],
                                                              repas: {
                                                                ...oldRepas,
                                                                [repasKey]: {
                                                                  ...oldRepas[
                                                                    repasKey
                                                                  ],
                                                                  inclus:
                                                                    checked,
                                                                },
                                                              },
                                                            };
                                                            newSejours[
                                                              sejourIndex
                                                            ] = {
                                                              ...newSejours[
                                                                sejourIndex
                                                              ],
                                                              jours: newJours,
                                                            };
                                                            newEtapes[
                                                              etapeIndex
                                                            ] = {
                                                              ...newEtapes[
                                                                etapeIndex
                                                              ],
                                                              séjour:
                                                                newSejours,
                                                            };
                                                            return {
                                                              ...prev,
                                                              etapes: newEtapes,
                                                            };
                                                          }
                                                        );
                                                      }}
                                                    />
                                                    {label}
                                                  </label>

                                                  <input
                                                    type="text"
                                                    placeholder="Lieu"
                                                    className="text-xs rounded border border-gray-300 px-2 py-1"
                                                    value={repasData.lieu}
                                                    onChange={(e) => {
                                                      const value =
                                                        e.target.value;
                                                      setVoyageForm((prev) => {
                                                        const newEtapes = [
                                                          ...prev.etapes,
                                                        ];
                                                        const newSejours = [
                                                          ...newEtapes[
                                                            etapeIndex
                                                          ].séjour,
                                                        ];
                                                        const newJours = [
                                                          ...newSejours[
                                                            sejourIndex
                                                          ].jours,
                                                        ];
                                                        const oldRepas =
                                                          newJours[jourIndex]
                                                            .repas || {};
                                                        newJours[jourIndex] = {
                                                          ...newJours[
                                                            jourIndex
                                                          ],
                                                          repas: {
                                                            ...oldRepas,
                                                            [repasKey]: {
                                                              ...oldRepas[
                                                                repasKey
                                                              ],
                                                              lieu: value,
                                                            },
                                                          },
                                                        };
                                                        newSejours[
                                                          sejourIndex
                                                        ] = {
                                                          ...newSejours[
                                                            sejourIndex
                                                          ],
                                                          jours: newJours,
                                                        };
                                                        newEtapes[etapeIndex] =
                                                          {
                                                            ...newEtapes[
                                                              etapeIndex
                                                            ],
                                                            séjour: newSejours,
                                                          };
                                                        return {
                                                          ...prev,
                                                          etapes: newEtapes,
                                                        };
                                                      });
                                                    }}
                                                  />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>

                                        {jour.activités.map(
                                          (activite, activiteIndex) => (
                                            <div
                                              key={activiteIndex}
                                              className="grid grid-cols-4 gap-2 p-2 bg-muted/50 rounded"
                                            >
                                              {/* Titre */}
                                              <Input
                                                placeholder="Titre"
                                                className="text-xs"
                                                size="sm"
                                                value={activite.titre || ''}
                                                onChange={(e) => {
                                                  const value = e.target.value;
                                                  setVoyageForm((prev) => {
                                                    const newEtapes = [
                                                      ...prev.etapes,
                                                    ];
                                                    const newSejours = [
                                                      ...newEtapes[etapeIndex]
                                                        .séjour,
                                                    ];
                                                    const newJours = [
                                                      ...newSejours[sejourIndex]
                                                        .jours,
                                                    ];
                                                    const newActivites = [
                                                      ...newJours[jourIndex]
                                                        .activités,
                                                    ];
                                                    newActivites[
                                                      activiteIndex
                                                    ] = {
                                                      ...newActivites[
                                                        activiteIndex
                                                      ],
                                                      titre: value,
                                                    };
                                                    newJours[jourIndex] = {
                                                      ...newJours[jourIndex],
                                                      activités: newActivites,
                                                    };
                                                    newSejours[sejourIndex] = {
                                                      ...newSejours[
                                                        sejourIndex
                                                      ],
                                                      jours: newJours,
                                                    };
                                                    newEtapes[etapeIndex] = {
                                                      ...newEtapes[etapeIndex],
                                                      séjour: newSejours,
                                                    };
                                                    return {
                                                      ...prev,
                                                      etapes: newEtapes,
                                                    };
                                                  });
                                                }}
                                              />

                                              {/* Durée */}
                                              <Input
                                                placeholder="Durée"
                                                className="text-xs"
                                                size="sm"
                                                type="number"
                                                min={0}
                                                value={activite.durée || ''}
                                                onChange={(e) => {
                                                  const value = e.target.value;
                                                  setVoyageForm((prev) => {
                                                    const newEtapes = [
                                                      ...prev.etapes,
                                                    ];
                                                    const newSejours = [
                                                      ...newEtapes[etapeIndex]
                                                        .séjour,
                                                    ];
                                                    const newJours = [
                                                      ...newSejours[sejourIndex]
                                                        .jours,
                                                    ];
                                                    const newActivites = [
                                                      ...newJours[jourIndex]
                                                        .activités,
                                                    ];
                                                    newActivites[
                                                      activiteIndex
                                                    ] = {
                                                      ...newActivites[
                                                        activiteIndex
                                                      ],
                                                      durée:
                                                        value === ''
                                                          ? ''
                                                          : Number(value),
                                                    };
                                                    newJours[jourIndex] = {
                                                      ...newJours[jourIndex],
                                                      activités: newActivites,
                                                    };
                                                    newSejours[sejourIndex] = {
                                                      ...newSejours[
                                                        sejourIndex
                                                      ],
                                                      jours: newJours,
                                                    };
                                                    newEtapes[etapeIndex] = {
                                                      ...newEtapes[etapeIndex],
                                                      séjour: newSejours,
                                                    };
                                                    return {
                                                      ...prev,
                                                      etapes: newEtapes,
                                                    };
                                                  });
                                                }}
                                              />

                                              {/* Prix */}
                                              <Input
                                                placeholder="Prix"
                                                className="text-xs"
                                                size="sm"
                                                type="number"
                                                min={0}
                                                value={activite.prix || ''}
                                                onChange={(e) => {
                                                  const value = e.target.value;
                                                  setVoyageForm((prev) => {
                                                    const newEtapes = [
                                                      ...prev.etapes,
                                                    ];
                                                    const newSejours = [
                                                      ...newEtapes[etapeIndex]
                                                        .séjour,
                                                    ];
                                                    const newJours = [
                                                      ...newSejours[sejourIndex]
                                                        .jours,
                                                    ];
                                                    const newActivites = [
                                                      ...newJours[jourIndex]
                                                        .activités,
                                                    ];
                                                    newActivites[
                                                      activiteIndex
                                                    ] = {
                                                      ...newActivites[
                                                        activiteIndex
                                                      ],
                                                      prix:
                                                        value === ''
                                                          ? ''
                                                          : Number(value),
                                                    };
                                                    newJours[jourIndex] = {
                                                      ...newJours[jourIndex],
                                                      activités: newActivites,
                                                    };
                                                    newSejours[sejourIndex] = {
                                                      ...newSejours[
                                                        sejourIndex
                                                      ],
                                                      jours: newJours,
                                                    };
                                                    newEtapes[etapeIndex] = {
                                                      ...newEtapes[etapeIndex],
                                                      séjour: newSejours,
                                                    };
                                                    return {
                                                      ...prev,
                                                      etapes: newEtapes,
                                                    };
                                                  });
                                                }}
                                              />

                                              {/* Inclus */}
                                              <div className="flex items-center">
                                                <input
                                                  type="checkbox"
                                                  className="rounded"
                                                  checked={!!activite.inclus}
                                                  onChange={(e) => {
                                                    const checked =
                                                      e.target.checked;
                                                    setVoyageForm((prev) => {
                                                      const newEtapes = [
                                                        ...prev.etapes,
                                                      ];
                                                      const newSejours = [
                                                        ...newEtapes[etapeIndex]
                                                          .séjour,
                                                      ];
                                                      const newJours = [
                                                        ...newSejours[
                                                          sejourIndex
                                                        ].jours,
                                                      ];
                                                      const newActivites = [
                                                        ...newJours[jourIndex]
                                                          .activités,
                                                      ];
                                                      newActivites[
                                                        activiteIndex
                                                      ] = {
                                                        ...newActivites[
                                                          activiteIndex
                                                        ],
                                                        inclus: checked,
                                                      };
                                                      newJours[jourIndex] = {
                                                        ...newJours[jourIndex],
                                                        activités: newActivites,
                                                      };
                                                      newSejours[sejourIndex] =
                                                        {
                                                          ...newSejours[
                                                            sejourIndex
                                                          ],
                                                          jours: newJours,
                                                        };
                                                      newEtapes[etapeIndex] = {
                                                        ...newEtapes[
                                                          etapeIndex
                                                        ],
                                                        séjour: newSejours,
                                                      };
                                                      return {
                                                        ...prev,
                                                        etapes: newEtapes,
                                                      };
                                                    });
                                                  }}
                                                />
                                                <Label className="text-xs ml-1">
                                                  Inclus
                                                </Label>
                                                <Button
                                                  type="button"
                                                  onClick={() =>
                                                    removeActivite(
                                                      etapeIndex,
                                                      sejourIndex,
                                                      jourIndex,
                                                      activiteIndex
                                                    )
                                                  }
                                                  variant="outline"
                                                  size="sm"
                                                >
                                                  <X className="ml-10 text-red-600 h-4 w-4 mr-1" />
                                                </Button>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ))}
                                  </CollapsibleContent>
                                </div>
                              </Collapsible>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Step 4: Finalisation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Voyage prêt à être créé
                  </h3>
                  <p className="text-muted-foreground">
                    Vérifiez tous les détails avant de confirmer la création du
                    voyage
                  </p>
                </div>

                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">Résumé du voyage</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Destination:
                        </span>
                        <span className="ml-2 font-medium">
                          {voyageForm.info_generale.destination ||
                            'Non définie'}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Durée:</span>
                        <span className="ml-2 font-medium">
                          {voyageForm.info_generale.durée || 'Non définie'}{' '}
                          jours
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Prix:</span>
                        <span className="ml-2 font-medium">
                          {voyageForm.info_generale.prix_basique ||
                            'Non défini'}{' '}
                          DH
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Étapes:</span>
                        <span className="ml-2 font-medium">{stats.etapes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-muted">
              <button
                type="button"
                onClick={prevStep}
                className="btn "
                disabled={currentStep === 1}
              >
                Précédent
              </button>
              <div className="space-x-5">
                {currentStep < 4 ? (
                  <button className="btn " type="button" onClick={nextStep}>
                    Suivant
                  </button>
                ) : (
                  <button
                      type="button"
                      onClick={handleSubmit}
                    className="btn bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder les modifications
                  </button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoyageFormUpdate;
