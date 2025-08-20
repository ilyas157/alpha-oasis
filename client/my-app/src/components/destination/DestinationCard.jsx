import React from 'react';

const DestinationCard = ({ destination }) => {
  const { title, description, location, country, duration, price, src } =
    destination;

  return (
    <div className="h-full sm:w-xs  shadow-2xl rounded-4xl overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ">
      <img
        src={src}
        alt={title}
        className="h-[220px] w-full sm:h-50 object-cover"
        loading="lazy"
      />
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold ">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="text-sm space-y-1 ">
          <p>
            <strong>Location:</strong> {location}, {country}
          </p>
          <p>
            <strong>Duration:</strong> {duration} jours{' '}
          </p>
          <p>
            <strong>Price:</strong> À partir de {price} MAD
          </p>
        </div>
        <button className="mt-4 btn btn-primary  self-start  px-6 py-2  rounded-xl transition">
          Réserver
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
