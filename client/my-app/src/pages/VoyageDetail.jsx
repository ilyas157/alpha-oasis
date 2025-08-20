import NeoFooter from '../components/NeoFooter';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Badge } from '../components/details/Badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/details/Tabs';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Clock,
  Plane,
  Star,
  Utensils,
  Bed,
  Wifi,
  Car,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import useGetDataById from '../hooks/useGetDataById';
import Trajet from '../components/Mock/Trajet';

const mockVoyageData = {
  id: '6891d0ecf56ec19d05e2717c',
  info_generale: {
    destination: 'La Mecque',
    pays: ['Arabie Saoudite'],
    villes: ['La Mecque', 'Médine'],
    période: 'Ramadan 2025',
    type: 'omra_hajj',
    sous_type: 'omra_simple',
    prix_basique: 5000,
    nb_places: 50,
    date_limite_reservation: '2025-01-01T00:00:00.000Z',
    status: 'valable',
    label: 'Omra Ramadan Premium',
    inclus: ['Vol direct', 'Visa', 'Transferts', 'Guide francophone'],
  },
  etapes: [
    {
      trajet: [
        {
          depart: {
            ville_depart: 'Casablanca',
            lieu_depart: 'Aéroport Mohammed V',
            date_depart: '2025-03-15T00:00:00.000Z',
            heure_depart: '14:30',
          },
          arrivé: {
            ville_arrivé: 'Jeddah',
            lieu_arrivé: 'Aéroport King Abdulaziz',
            date_arrivé: '2025-03-15T00:00:00.000Z',
            heure_arrivé: '18:45',
          },
          info_transport: {
            durée: 4.25,
            type_transport: 'avion',
            type_vol: 'direct',
            nb_escales: 0,
            compagnie: 'Royal Air Maroc',
            class: ['Économie', 'Business'],
            bagages: 2,
          },
        },
      ],
      séjour: [
        {
          hebergement: {
            _id: '68879e5362d2752663324ff5',
            name: 'Hôtel Makkah Clock Royal Tower',
            type: 'hôtel',
            note: 4.8,
            city: 'La Mecque',
            country: 'Arabie Saoudite',
            services: ['wifi', 'restaurant', 'climatisation', 'ascenseur'],
            rooms: [
              { typeChambre: 'double', typeLit: 'double', prix: 150 },
              { typeChambre: 'triple', typeLit: 'twin', prix: 200 },
            ],
            rating: 5,
            images: ['/placeholder.svg'],
          },
          jours: [
            {
              date: '2025-03-16T00:00:00.000Z',
              activités: [
                {
                  titre: 'Omra accompagnée',
                  durée: 3,
                  inclus: true,
                  prix: 0,
                  description:
                    'Rite complet de la Omra avec accompagnement religieux',
                },
              ],
              repas: {
                petit_déjeuner: { inclus: true, lieu: 'Hôtel' },
                déjeuner: { inclus: false, lieu: '' },
                dinner: { inclus: true, lieu: 'Restaurant local' },
              },
            },
            {
              date: '2025-03-17T00:00:00.000Z',
              activités: [
                {
                  titre: 'Visite de Médine',
                  durée: 5,
                  inclus: true,
                  prix: 0,
                  description:
                    'Déplacement en bus pour visiter la mosquée du Prophète',
                },
              ],
              repas: {
                petit_déjeuner: { inclus: true, lieu: 'Hôtel' },
                déjeuner: { inclus: true, lieu: 'Buffet Médine' },
                dinner: { inclus: false, lieu: '' },
              },
            },
          ],
        },
      ],
    },
  ],
};
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'omra_hajj':
      return 'Omra & Hajj';
    case 'voyage_organisé':
      return 'Voyage Organisé';
    default:
      return type;
  }
};
const getSubTypeLabel = (soustype) => {
  switch (soustype) {
    case 'omra_hajj':
      return 'Omra & Hajj';
    case 'voyage_organisé':
      return 'Voyage Organisé';
    default:
      return soustype;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'valable':
      return (
        <Badge variant="default" className="bg-green-600">
          Disponible
        </Badge>
      );
    case 'complet':
      return <Badge variant="destructive">Complet</Badge>;
    case 'expire':
      return <Badge variant="secondary">Expiré</Badge>;
    default:
      return null;
  }
};

const VoyageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const [selectedRoom, setSelectedRoom] = useState(0);
  const [trajet, setTrajet] = useState(0);
  const { data, loading, error } = useGetDataById(id);

  console.log('data  is : ', data);
  console.log('is loading', loading);
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
  const voyage = data;
  // voyage is your full voyage object

  // Extract all hébergements (filter out null/undefined)
  const type = voyage.info_generale.type;
  const hebergement =
    voyage?.etapes?.flatMap(
      (etape) =>
        etape.séjour?.map((sej) => sej.hebergement).filter((h) => h != null) ||
        []
    ) || [];

  // Extract all jours arrays, then flatten into one big array of jours
  const jours =
    voyage?.etapes?.flatMap(
      (etape) => etape.séjour?.flatMap((sej) => sej.jours || []) || []
    ) || [];
  const trajets =
    voyage?.etapes
      ?.map((etape) => etape.trajet || []) // take trajet array from each étape
      .filter((t) => t.length > 0) || // remove empty ones
    [];

  console.log('les trajets : ', trajets);
  return (
    <>
      <Navbar />
      <div className="bg-[#f3f0ed80] ">
        <main className=" min-h-screen pt-[145px] container  max-w-7xl mx-auto px-4 py-8 ">
          <button
            onClick={() => navigate(-1)}
            className="btn mb-6 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux voyages
          </button>

          {/* En-tête du voyage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                {getStatusBadge(voyage.info_generale.status)}
                <Badge variant="secondary" className="ml-2">
                  {getTypeLabel(voyage.info_generale.type)}
                </Badge>
                <Badge variant="destructive" className="ml-2 ">
                  {getSubTypeLabel(voyage.info_generale.sous_type)}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">
                {voyage.info_generale.label}
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>
                    {voyage.info_generale.villes.join(', ')} •{' '}
                    {voyage.info_generale.pays.join(', ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{voyage.info_generale.période}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>
                    {voyage.info_generale.nb_places} places disponibles
                  </span>
                </div>
              </div>

              {/* Services inclus */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Services inclus</h3>
                <div className="flex flex-wrap gap-2">
                  {voyage.info_generale.inclus.map((service, index) => (
                    <span className="flex items-center rounded-2xl bg-blue-500 px-3 py-1 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Carte de réservation */}
            <div className="lg:col-span-1 rounded-2xl shadow-xl flex  flex-col  xl:w-96 gap-5 p-10 bg-white">
              <div>
                <span className="text-3xl text-yellow-500">
                  {voyage.info_generale.prix_basique.toLocaleString('fr-FR')} DH
                </span>
                <p className="text-muted-foreground">par personne</p>
              </div>
              <p>
                Date limite de réservation :<br />
                <span className="font-medium text-foreground">
                  {formatDate(voyage.info_generale.date_limite_reservation)}
                </span>
              </p>

              <Link to={`/reservation/voyage/${voyage.id}`}>
                <button className="btn  bg-orange-600  text-white w-full inline-flex items-center">
                  <Plane className="h-4 w-4 mr-2" />
                  Réserver maintenant
                </button>
              </Link>
              <Link to="/contact">
                <button className="w-full btn  ">Nous contacter</button>
              </Link>
            </div>
          </div>
          {/* Contenu principal avec onglets */}
          <Tabs
            defaultValue="itineraire"
            className="space-y-6 max-w-7xl mx-auto"
          >
            <TabsList className="w-full flex bg-none">
              <TabsTrigger value="itineraire" className=" w-full rounded-xl">
                Itinéraire
              </TabsTrigger>
              <TabsTrigger value="hebergement" className="w-full ">
                Hébergement
              </TabsTrigger>
              <TabsTrigger value="transport" className="w-full rounded-xl">
                Transport
              </TabsTrigger>
              <TabsTrigger value="details" className="w-full rounded-xl">
                Détails
              </TabsTrigger>
            </TabsList>

            {/* Onglet Itinéraire */}
            <TabsContent value="itineraire" className="space-y-6">
              <div className="p-10">
                <div>
                  <div>Programme jour par jour</div>
                </div>
                <div className="space-y-6">
                  {jours.map((jour, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary/20 pl-6 relative"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>

                      <div className="mb-4">
                        <h4 className="text-lg font-semibold">
                          Jour {index + 1} - {formatDate(jour.date)}
                        </h4>
                      </div>

                      {/* Activités */}
                      <div className="space-y-3 mb-4  rounded-3xl flex flex-col gap-2">
                        {jour.activités.map((activite, actIndex) => (
                          <div
                            key={actIndex}
                            className="bg-muted/50 rounded-lg p-4 bg-[#f3f0ed80]"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium">{activite.titre}</h5>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {activite.durée}h
                                {activite.inclus ? (
                                  <Badge
                                    variant="default"
                                    //className="bg-green-100 text-green-800"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Inclus
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Non inclus
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {activite.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Repas */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Utensils className="h-4 w-4" />
                          <span>Petit-déjeuner</span>
                          {jour.repas.petit_déjeuner.inclus ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Utensils className="h-4 w-4" />
                          <span>Déjeuner</span>
                          {jour.repas.déjeuner.inclus ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Utensils className="h-4 w-4" />
                          <span>Dîner</span>
                          {jour.repas.dinner.inclus ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Onglet Hébergement */}
            <TabsContent value="hebergement" className="space-y-6">
              {hebergement.map((hebergement) => (
                <div className="p-10">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xl">{hebergement.name}</div>
                        <p className="text-muted-foreground">
                          {hebergement.city}, {hebergement.country}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {hebergement.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {/* Services */}
                    <div>
                      <h4 className="font-semibold mb-3">
                        Services disponibles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hebergement.services.map((service, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 text-white"
                          >
                            {service === 'wifi' && <Wifi className="h-3 w-3" />}
                            {service === 'restaurant' && (
                              <Utensils className="h-3 w-3" />
                            )}
                            {service === 'climatisation' && (
                              <Car className="h-3 w-3" />
                            )}
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Types de chambres */}
                    <div>
                      <h4 className="font-semibold mb-3">Types de chambres</h4>
                      <div className="grid gap-3">
                        {hebergement.rooms.map((room, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Bed className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium capitalize">
                                  {room.typeChambre}
                                </p>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {room.typeLit}
                                </p>
                              </div>
                            </div>
                            {type === 'omra_hajj' ? (
                              <div className="text-right">
                                <p className="font-medium">{room.prix} DH</p>
                                <p className="text-sm text-muted-foreground">
                                  par nuit
                                </p>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Onglet Transport */}
            <TabsContent value="transport" className="space-y-6">
              <div className="p-15 pb-0">
                <h1 className="text-3xl mb-10">Informations de transport</h1>
                <div>
                  <Trajet index={trajet} trajet={trajets[trajet]} />
                </div>
                <div className=" flex gap-20 justify-center mt-10">
                  <button
                    className="btn rounded-full p-2"
                    onClick={() => {
                      setTrajet((prev) => {
                        console.log(prev === 0);
                        if (prev === 0) {
                          return trajets.length - 1;
                        }
                        return prev - 1;
                      });
                    }}
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    className="btn rounded-full p-2"
                    onClick={() => {
                      setTrajet((prev) => {
                        if (prev - trajets.length + 1 === 0) {
                          return 0;
                        }
                        return prev + 1;
                      });
                    }}
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </TabsContent>

            {/* Onglet Détails */}
            <TabsContent value="details" className="space-y-6">
              <div className="p-15">
                <h1 className="text-3xl mb-10">Informations importantes</h1>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Voyage</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Type :</strong>{' '}
                          {getTypeLabel(voyage.info_generale.type)}
                        </p>
                        <p>
                          <strong>Sous-type :</strong>{' '}
                          {voyage.info_generale.sous_type}
                        </p>
                        <p>
                          <strong>Période :</strong>{' '}
                          {voyage.info_generale.période}
                        </p>
                        <p>
                          <strong>Places disponibles :</strong>{' '}
                          {voyage.info_generale.nb_places}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Réservation</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Prix de base :</strong>{' '}
                          {voyage.info_generale.prix_basique.toLocaleString(
                            'fr-FR'
                          )}{' '}
                          DH
                        </p>
                        <p>
                          <strong>Date limite :</strong>{' '}
                          {formatDate(
                            voyage.info_generale.date_limite_reservation
                          )}
                        </p>
                        <p>
                          <strong>Statut :</strong>{' '}
                          {voyage.info_generale.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <NeoFooter />
    </>
  );
};

export default VoyageDetail;
