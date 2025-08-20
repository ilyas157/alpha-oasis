import { useSearchParams, useNavigate } from 'react-router-dom';
import servicesIcons from '../../assets/icons.jsx';
import { Calendar, Coins, Users } from 'lucide-react';
const infos = ['name', 'description', 'location', 'note'];

const VoyageCard = ({
  destination,
  description,
  villes,
  pays,
  note,
  id,
  img,
  prix,
  nb_places,
  durée,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col rounded-2xl shadow-2xl w-xs h-[560px] bg-white">
      <img
        src={img}
        alt=""
        loading="lazy"
        className="rounded-t-2xl h-[200px] w-full"
      />
      <div className="flex flex-col p-5 gap-4">
        <h1 className="text-2xl">{destination}</h1>
        <div className="tooltip tooltip-bottom" data-tip={description}>
          <p className="line-clamp-1  ">{description}</p>
        </div>
        <p>
          pays :{' '}
          <span>
            {Array.isArray(pays)
              ? pays.join(', ')
              : pays
                  ?.split(',')
                  .map((v) => v.trim())
                  .join(', ')}
          </span>
        </p>
        <p>
          villes :{' '}
          <span>
            {Array.isArray(villes)
              ? villes.join(', ')
              : villes
                  ?.split(',')
                  .map((v) => v.trim())
                  .join(', ')}
          </span>
        </p>
        <p className="inline-flex gap-2 items-center"> prix : {prix} MAD</p>
        <div className="flex">
          {[...Array(Math.floor(5))].map((_, index) => {
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26"
                width="26"
                viewBox="0 0 640 640"
              >
                <path
                  fill="#FFD43B"
                  d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
                />
              </svg>
            );
          })}
        </div>

        <div className="flex gap-5 items-center">
          <span className="flex gap-1">
            <Calendar className="h-5 w-5" /> {durée}
          </span>
          <span className="flex gap-1">
            <Users className="h-5 w-5" />
            {nb_places}
          </span>
        </div>
        <div className="flex items-center justify-between ">
          <button
            className="btn px-7"
            onClick={() => {
              navigate('/voyage/' + id);
            }}
          >
            détail
          </button>
          <button
            className="btn btn-primary px-10"
            onClick={() => {
              const user = localStorage.getItem('user');

              if (!user) {
                // Save where they wanted to go
                localStorage.setItem(
                  'redirectAfterLogin',
                  `/reservation/voyage/${id}`
                );
                navigate('/connexion');
              } else {
                navigate(`/reservation/voyage/${id}`);
              }
            }}
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoyageCard;
