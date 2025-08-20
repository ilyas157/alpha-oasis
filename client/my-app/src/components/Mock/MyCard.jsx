import { useNavigate, useSearchParams } from 'react-router-dom';
import servicesIcons from '../../assets/icons.jsx';
const infos = ['name', 'description', 'location', 'note'];

const MyCard = ({
  name,
  description,
  city,
  country,
  note,
  img,
  services,
  prix,
  id,
}) => {
const navigate = useNavigate()
  return (
    <div className="flex flex-col rounded-2xl shadow-2xl w-xs h-[530px]">
      <img
        src={img}
        alt=""
        loading="lazy"
        className="rounded-t-2xl h-[200px] w-full"
      />
      <div className="flex flex-col p-5 gap-4">
        <h1 className="text-2xl">{name}</h1>
        <div className="tooltip tooltip-bottom" data-tip={description}>
          <p className="line-clamp-1  ">{description}</p>
        </div>
        <p>
          location :{' '}
          <span className="font-semibold">
            {city}, {country}
          </span>
        </p>
        <p>
          prix : {prix} MAD
          <span className="ml-2">(formule simple)</span>
        </p>
        <div className="flex gap-3">
          {services.map((service, index) => {
            return <span>{servicesIcons[service]}</span>;
          })}
        </div>
        <div className="flex">
          {[...Array(Math.floor(note))].map((_, index) => {
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
      </div>
      <div className='flex justify-around'>
        <button className="btn px-7 " onClick={() => navigate('/hebergement/' + id)}
        
      
        >detail</button>

        <button className="btn btn-primary px-10"
          
            onClick={() => {
              const user = localStorage.getItem('user');

              if (!user) {
                // Save where they wanted to go
                localStorage.setItem(
                  'redirectAfterLogin',
                  `/reservation/hebergement/${id}`
                );
                navigate('/connexion');
              } else {
                navigate(`/reservation/hebergement/${id}`);
              }
            }}>réservez</button>
      </div>
    </div>
  );
};

export default MyCard;
