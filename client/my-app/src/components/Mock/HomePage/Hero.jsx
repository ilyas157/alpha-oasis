import { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const heroImage =
  'https://images.unsplash.com/photo-1516895065658-70aaefea6765?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState({
    destination: '',
    endpoint: '/voyage',
  });
  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1516895065658-70aaefea6765?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      buttonText: 'Découvrir nos voyages',
      smallTitle:
        "Votre agence de confiance pour l'Omra, le Hajj et les plus beaux voyages au Maroc et à l'étranger. Plus de 15 ans d'expérience à votre service.",
    link: '/voyage',
    },
    {
      image:
        'https://images.unsplash.com/photo-1600289730889-17f9ad4c38f0?q=80&',
      buttonText: "Voir Nos hébergement",
      smallTitle:
        'Découvrez nos hébergements confortables et sélectionnés pour votre voyage.',
      link: '/hebergement',
    },
    {
      image:"https://images.unsplash.com/photo-1590108589108-3600131de843?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: 'Réservez votre Omra',
      smallTitle:
        'Accompagnement complet pour un pèlerinage en toute sérénité.',
      link: '/omra_hajj',
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, 7000); // change every 7 seconds
    return () => clearInterval(interval);
  }, []);

  const { image, buttonText, smallTitle } = slides[currentIndex];
  return (
    <section className="relative min-h-[70vh] flex items-center pt-[145px]">
      {/* Content */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              i === currentIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Découvrez le monde avec{' '}
            <span className="text-yellow-400">Alpha Oasis</span>
          </h1>
          <div className="text-xl h-[95px] md:text-2xl text-white/90 mb-8 max-w-2xl">
            {slides[currentIndex].smallTitle}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              className="btn btn-xl btn-primary lg:w-[310px]"
              onClick={() => {
                navigate(slides[currentIndex].link);
              }}
            >
              <Search className="h-5 w-5" />
              {slides[currentIndex].buttonText}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80 text-sm">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5000+</div>
              <div className="text-white/80 text-sm">Voyageurs satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80 text-sm">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm">Support client</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute -bottom-5 left-0 right-0 transform translate-y-1/2 z-10">
        <div className="container mx-auto px-4 ">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium ">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query.destination}
                    onChange={(e) => {
                      setQuery((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }));
                    }}
                    placeholder="destination"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                  ></input>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Type de voyage
                </label>
                <select
                  className="w-full px-4 py-2 border border-border rounded-md bg-background"
                  value={query.endpoint}
                  required
                  onChange={(e) => {
                    setQuery((prev) => ({
                      ...prev,
                      endpoint: e.target.value,
                    }));
                  }}
                >
                  <option value="/omra_hajj">Omra&Hajj</option>
                  <option value="/voyage">Voyage organisé</option>
                  <option value="/hebergement">Hebergement</option>
                </select>
              </div>
              {/*
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Période
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background">
                    <option>Toute l'année</option>
                    <option>Ramadan 2025</option>
                    <option>Été 2025</option>
                    <option>Automne 2025</option>
                    <option>Hiver 2025</option>
                  </select>
                </div>
              </div>
*/}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    placeholder="nombre de voyageur"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                  ></input>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary w-full md:w-auto mt-6"
              onClick={() => {
                if (query.endpoint === '') {
                  navigate('');
                } else if (query.endpoint !== '/hebergement') {
                  let params = '';
                  if (query.destination != '') {
                    params += `destination=${query.destination}`;
                  }
                  navigate(`${query.endpoint}?${params}`);
                } else {
                  let params = '';
                  if (query.destination != '') {
                    params += `city=${query.destination}`;
                  }
                  navigate(`${query.endpoint}?${params}`);
                }
              }}
            >
              <Search className="h-5 w-5" />
              Rechercher votre séjour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
