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
import { ArrowLeft, Star, Bed, Wifi, Utensils, Car, Plane } from 'lucide-react';
import axios from 'axios';

const HebergementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hebergement, setHebergement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHebergement = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/hebergement/${id}`
        );
        setHebergement(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchHebergement();
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  if (!hebergement)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Hébergement introuvable
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[145px] container max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/hebergement/")}
          className="btn mb-6 inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux hébergements
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Info principale */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              {hebergement.name}
            </h1>
            <p className="text-muted-foreground">
              {hebergement.city}, {hebergement.country}
            </p>
            <p className="text-sm text-muted-foreground">
              {hebergement.address}
            </p>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{hebergement.rating}/5</span>
            </div>

            {/* Services */}
            {hebergement.services.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Services disponibles
                </h3>
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
            )}

            {/* Chambres */}
            {hebergement.rooms.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Types de chambres
                </h3>
                <div className="grid gap-3">
                  {hebergement.rooms.map((room) => (
                    <div
                      key={room._id}
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
                      <div className="text-right">
                        <p className="font-medium">{room.prix} DH</p>
                        <p className="text-sm text-muted-foreground">
                          par nuit
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Carte de réservation */}
          <div className="lg:col-span-1 rounded-2xl shadow-xl flex flex-col gap-4 overflow-hidden border border-gray-200">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-200">
              {true ? (
                <img
                  src={
                    'https://images.unsplash.com/photo-1600289730889-17f9ad4c38f0?q=80&'
                  }
                  alt={hebergement.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Image indisponible
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col gap-4 bg-white">
              <h3 className="text-xl font-semibold">{hebergement.name}</h3>

              <div className="text-3xl font-bold text-yellow-600">
                {hebergement.prix_basique.toLocaleString('fr-FR')} DH / nuit
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span>Petit-déjeuner :</span>
                  <Badge
                    variant={
                      hebergement.BreakfastIncluded ? 'default' : 'destructive'
                    }
                    className="px-2 py-1"
                  >
                    {hebergement.BreakfastIncluded ? 'Inclus' : 'Non inclus'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span>Proximité :</span>
                  <span>{hebergement.proximity} km du centre</span>
                </div>
              </div>

              {hebergement.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {hebergement.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Link to={'/reservation/hebergement/' + id}>
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

          {/* Description */}
        </div>
        <div className="max-w-7xl mx-auto p-10 bg-white rounded-2xl shadow-sm mt-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-muted-foreground">
            {hebergement.description || 'Aucune description disponible.'}
          </p>
        </div>
      </main>
      <NeoFooter />
    </>
  );
};

export default HebergementDetail;
