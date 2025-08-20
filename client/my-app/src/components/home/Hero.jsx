import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
const images = [
  '/src/assets/content/background/egypt_background.jpg',
  '/src/assets/content/background/azerbijan_background.jpg',
  '/src/assets/content/background/instanbul_background.jpg',
];

function Hero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5500); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero pt-[120px] min-h-screen transition-all duration-1000 bg-cover bg-center"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-6xl font-bold">
            Alpha Oasis - L'art du voyage parfait, pensé pour vous
          </h1>
          <p className="mb-5">
            Partez l'esprit tranquille avec Alpha Oasis, votre agence de voyage
            experte en Omra, circuits touristiques et séjours organisés.
            Découvrez nos offres sur mesure pour un voyage inoubliable !
          </p>
          <button className="btn btn-primary text-xl btn-xl" onClick={() => {
            navigate('/destinations?type=&page=1');
          }}>Découvrer maintenant</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
