import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';
import { CheckCircle, MapPin, Users } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { useNavigate, useParams } from 'react-router-dom';
import useGetHebergementById from '../../../hooks/useGetHebergementById';
const allowedServices = [
  'wifi',
  'pool',
  'spa',
  'gym',
  'parking',
  'restaurant',
  'airport_shuttle',
  'pet_friendly',
  'laundry',
  'air_conditioner',
  // add more allowed service strings here
];
const HebergementFormUpdate = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const requiredFields = ['name', 'type', 'country', 'city', 'description'];

  const availabilityOptions = ['Disponible', 'Indisponible'];
  const { data, loading, error } = useGetHebergementById(id)

  const [hebergementForm, setHebergementForm] = useState({
    name: '',
    type: '',
    slug: '',
    rating: 0,
    country: '',
    city: '',
    availability: true,
    address: '',
    services: [],
    prix_basique: 0,
    rooms: [
      {
        typeChambre: '',
        typeLit: '',
        prix: '',
      },
    ],
    BreakfastIncluded: false,
    proximity: 0,
    description: '',
    images: [],
    thumbnail: '',
    tags: [],
    status: 'libre',
  });
   useEffect(() => {
      if (data) {
        setHebergementForm(data);
      }
    }, [data]);
  
    if (loading) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-spinner text-yellow-500 w-60"></span>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-red">
            Error: {res.error.message || 'Unknown error'}
          </div>
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
  const toggleAllServices = () => {
    if (hebergementForm.services.length === allowedServices.length) {
      setHebergementForm((prev) => ({ ...prev, services: [] }));
    } else {
      setHebergementForm((prev) => ({
        ...prev,
        services: [...allowedServices],
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    requiredFields.forEach((field) => {
      if (!hebergementForm[field] || !String(hebergementForm[field]).trim()) {
        newErrors[field] = true;
      }
    });
    if (!hebergementForm.rooms || hebergementForm.rooms.length === 0) {
      newErrors.rooms = 'Au moins une chambre doit être ajoutée';
    } else {
      // Vérifie que chaque room a un type, un type de lit et un prix
      hebergementForm.rooms.forEach((room, index) => {
        if (
          !room.typeChambre ||
          !room.typeLit ||
          room.prix === '' ||
          room.prix === null
        ) {
          if (!newErrors.roomsDetails) newErrors.roomsDetails = {};
          newErrors.roomsDetails[index] = 'Chambre incomplète';
        }
      });
    }
    setErrors(newErrors);
    console.log(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    // juste pour s'assurer que le formulaire ne recharge pas la page

    if (!validateForm()) {
      alert('fill all the fields please');
      return;
    } // stop si des champs requis sont manquants

    try {
      const response = await axios.put(
        `http://localhost:5000/api/hebergement/${id}`,
        hebergementForm,
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Hébergement mis à jour:', response.data);
      navigate('/admin/hebergements');
      // fermer le formulaire ou réinitialiser le state si besoin
    } catch (error) {
      console.error(
        'Erreur création hébergement:',
        error.response?.data || error
      );
      alert(
        error.response?.data?.error ||
          'Erreur lors de la création de l’hébergement'
      );
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Informations Hébergement */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Informations Hébergement
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name">Nom de l'hébergement *</label>
              <Input
                id="name"
                value={hebergementForm.name}
                placeholder="Ex: Hilton Mecca Convention"
                className={`mt-1 ${
                  errors.name
                    ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                onChange={(e) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  Ce champ est obligatoire
                </p>
              )}
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type">Type *</label>
              <Input
                id="type"
                value={hebergementForm.type}
                placeholder="hotel, apart_hotel, etc."
                className={`mt-1 ${
                  errors.type
                    ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                onChange={(e) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
              />
              {errors.type && (
                <p className="text-red-600 text-sm mt-1">
                  Ce champ est obligatoire
                </p>
              )}
            </div>

            {/* Country / City / Rating */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="country">Pays *</label>
                <Input
                  id="country"
                  value={hebergementForm.country}
                  placeholder="Arabie Saoudite"
                  className={`mt-1 ${
                    errors.country
                      ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                  onChange={(e) =>
                    setHebergementForm((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                />
                {errors.country && (
                  <p className="text-red-600 text-sm mt-1">
                    Ce champ est obligatoire
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city">Ville *</label>
                <Input
                  id="city"
                  value={hebergementForm.city}
                  placeholder="La Mecque"
                  className={`mt-1 ${
                    errors.city
                      ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                  onChange={(e) =>
                    setHebergementForm((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">
                    Ce champ est obligatoire
                  </p>
                )}
              </div>
              {/* Note */}
              <div>
                <label htmlFor="note">Note</label>
                <Input
                  id="note"
                  type="number"
                  value={hebergementForm.note}
                  placeholder="4.5"
                  onChange={(e) =>
                    setHebergementForm((prev) => ({
                      ...prev,
                      note: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address">Adresse complète</label>
              <Textarea
                id="address"
                value={hebergementForm.address}
                rows={2}
                placeholder="Adresse complète de l'hébergement"
                onChange={(e) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>

            {/* Prix / Proximity */}
            <div className="grid grid-cols-2 gap-4">
              {/* Prix de base (DH/nuit) - auto from rooms */}
              <div>
                <label htmlFor="prix_basique_heb">Prix de base (DH/nuit)</label>
                <Input
                  type="number"
                  id="prix_basique_heb"
                  value={
                    hebergementForm.rooms && hebergementForm.rooms.length > 0
                      ? Math.min(
                          ...hebergementForm.rooms.map((r) => r.prix || 0)
                        )
                      : ''
                  }
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="proximity">Proximité</label>
                <Input
                  id="proximity"
                  value={hebergementForm.proximity}
                  placeholder="Ex: 200m de la Kaaba"
                  onChange={(e) =>
                    setHebergementForm((prev) => ({
                      ...prev,
                      proximity: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2">
              <label>Services disponibles</label>
              <button
                type="button"
                className="btn btn-sm mb-2"
                onClick={toggleAllServices}
              >
                {hebergementForm.services.length === allowedServices.length
                  ? 'Tout décocher'
                  : 'Tout cocher'}
              </button>
              <div className="grid grid-cols-4 gap-2">
                {allowedServices.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={hebergementForm.services.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setHebergementForm((prev) => ({
                            ...prev,
                            services: [...prev.services, service],
                          }));
                        } else {
                          setHebergementForm((prev) => ({
                            ...prev,
                            services: prev.services.filter(
                              (s) => s !== service
                            ),
                          }));
                        }
                      }}
                    />
                    <label htmlFor={service} className="text-sm">
                      {service.replace('_', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability">Disponibilité</label>
              <Select
                value={
                  hebergementForm.availability ? 'Disponible' : 'Indisponible'
                }
                onValueChange={(val) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    availability: val === 'Disponible',
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Breakfast */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="breakfast"
                checked={hebergementForm.BreakfastIncluded}
                onCheckedChange={(checked) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    BreakfastIncluded: checked,
                  }))
                }
              />
              <label htmlFor="breakfast">Petit-déjeuner inclus</label>
            </div>
            {/* Rooms Section */}
            {/* Types de chambres */}
            <div className="space-y-4 flex flex-col">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Types de Chambres
              </h2>
              {errors.rooms && (
                <p className="text-red-600 text-sm mt-1">{errors.rooms}</p>
              )}

              {hebergementForm.rooms.map((room, index) => (
                <Collapsible key={room._id || index} defaultOpen>
                  <CollapsibleTrigger className="btn w-full flex justify-between items-center mb-2">
                    <span>
                      Chambre {index + 1}: {room.typeChambre || 'Type'} -{' '}
                      {room.typeLit || 'Lit'} - {room.prix || 0} DH
                    </span>
                    <span
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHebergementForm((prev) => ({
                          ...prev,
                          rooms: prev.rooms.filter((_, i) => i !== index),
                        }));
                      }}
                    >
                      Supprimer
                    </span>
                  </CollapsibleTrigger>

                  {errors.roomsDetails && errors.roomsDetails[index] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.roomsDetails[index]}
                    </p>
                  )}

                  <CollapsibleContent className="space-y-2 border rounded p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label>Type de chambre</label>
                        <Select
                          value={room.typeChambre}
                          onValueChange={(value) => {
                            setHebergementForm((prev) => {
                              const newRooms = [...prev.rooms];
                              newRooms[index].typeChambre = value;

                              // Ajuster typeLit selon la règle
                              if (
                                value === 'double' &&
                                !['double', 'twin'].includes(
                                  newRooms[index].typeLit
                                )
                              ) {
                                newRooms[index].typeLit = 'double';
                              }
                              if (value !== 'double')
                                newRooms[index].typeLit = 'single';

                              return {
                                ...prev,
                                rooms: newRooms,
                                prix_basique: Math.min(
                                  ...newRooms.map((r) => r.prix || 0)
                                ),
                              };
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {['single', 'double', 'triple', 'quadruple'].map(
                              (t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label>Type de lit</label>
                        <Select
                          value={room.typeLit}
                          onValueChange={(value) => {
                            setHebergementForm((prev) => {
                              const newRooms = [...prev.rooms];
                              newRooms[index].typeLit = value;
                              return {
                                ...prev,
                                rooms: newRooms,
                                prix_basique: Math.min(
                                  ...newRooms.map((r) => r.prix || 0)
                                ),
                              };
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Lit" />
                          </SelectTrigger>
                          <SelectContent>
                            {room.typeChambre === 'double'
                              ? ['double', 'twin'].map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))
                              : ['single'].map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label>Prix (DH/nuit)</label>
                        <Input
                          type="number"
                          value={room.prix}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setHebergementForm((prev) => {
                              const newRooms = [...prev.rooms];
                              newRooms[index].prix = val;
                              return {
                                ...prev,
                                rooms: newRooms,
                                prix_basique: Math.min(
                                  ...newRooms.map((r) => r.prix || 0)
                                ),
                              };
                            });
                          }}
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              <button
                type="button"
                className="btn w-60  mt-2 self-center"
                onClick={() => {
                  setHebergementForm((prev) => ({
                    ...prev,
                    rooms: [
                      ...prev.rooms,
                      {
                        typeChambre: 'single',
                        typeLit: 'single',
                        prix: 0,
                        _id: Date.now(),
                      },
                    ],
                  }));
                }}
              >
                Ajouter une chambre
              </button>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image_url">Image URL</label>
              <Input
                id="image_url"
                value={hebergementForm.image_url || ''}
                placeholder="URL de l'image"
                onChange={(e) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    image_url: e.target.value,
                  }))
                }
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description_heb">Description *</label>
              <Textarea
                id="description_heb"
                value={hebergementForm.description}
                rows={4}
                placeholder="Description détaillée de l'hébergement..."
                className={`mt-1 ${
                  errors.description
                    ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                onChange={(e) =>
                  setHebergementForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  Ce champ est obligatoire
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          <button
            className="btn bg-green-600 text-white hover:bg-green-700"
            type="submit"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            ajouter l'hébergement
          </button>
        </div>
      </form>
    </div>
  );
};

export default HebergementFormUpdate;
