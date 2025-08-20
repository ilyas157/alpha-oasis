import {useMemo, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StarsInput from './StarsInput';

const HotelFilters = () => {
  const servicesList = [
    'wifi',
    'pool',
    'spa',
    'gym',
    'parking',
    'restaurant',
    'pet_friendly',
    'laundry',
    'air_conditioner',
  ];

  const initialFilters = {
    destination: '',
    rating: 4,
    country: '',
    city: '',
    roomType: 'single',
    services: [],
    price: 5000,
    bedType: '',
    breakfastIncluded: false,
    proximity: 5,
  };
  const [turnOn, setTurn] = useState('cochez tout');
  const reducer = (state, action) => {
    switch (action.type) {
      case 'destination':
        return { ...state, destination: action.value };
      case 'rating':
        return { ...state, rating: action.value };
      case 'country':
        return { ...state, country: action.value };
      case 'city':
        return { ...state, city: action.value };
      case 'roomType':
        return { ...state, roomType: action.value };
      case 'services':
        if (state.services.includes(action.value)) {
          return {
            ...state,
            services: state.services.filter(
              (service) => service !== action.value
            ),
          };
        }
        return { ...state, services: [...state.services, action.value] };
      case 'delete services':
        return { ...state, services: action.value };
      case 'add all services':
        return { ...state, services: [...servicesList] };
      case 'price':
        return { ...state, price: action.value };
      case 'bedType':
        return { ...state, bedType: action.value };
      case 'breakfast':
        return { ...state, breakfastIncluded: !state.breakfastIncluded };
      case 'proximity':
        return { ...state, proximity: action.value };
      default:
        return initialFilters;
    }
  };
  const getInitialFilters = (searchParams) => {
    const state = {};
    searchParams.forEach((value, key) => {
      let parsedValue;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (value.includes(',')) parsedValue = value.split(',');
      else if (!isNaN(value)) parsedValue = Number(value);
      else parsedValue = value;

      state[key] = parsedValue;
    });

    return {
      destination: '',
      rating: 4,
      country: '',
      city: '',
      roomType: 'single',
      services: [],
      price: 5000,
      bedType: '',
      breakfastIncluded: false,
      proximity: 5,
      ...state, // override with values from URL
    };
  };
  const addFilterToUrl = (filters) => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        // Handle arrays like services: ['wifi', 'pool']
        if (Array.isArray(value)) {
          newParams.set(key, value.join(','));
        } else {
          newParams.set(key, value);
        }
      }
    });
    setSeachParams(newParams);
  };
  const [searchParams, setSeachParams] = useSearchParams();
  const initialFilter = useMemo(
    () => getInitialFilters(searchParams),
    [searchParams]
  );
  const [filters, dispatch] = useReducer(reducer, initialFilter);

  const [showServices, setShowServices] = useState(false);
  const [page, setPage] = useState(1);
  const pageParam = searchParams.get('proximity');
  return (
    <>
      <section className="hidden lg:block px-15  py-5">
        <div className="flex justify-center gap-50  max-w-xl mx-auto">
          <ul className="flex  flex-col gap-5">
            <li>
              <input
                type="text"
                placeholder="destination"
                className="input  "
                value={filters.destination}
                onChange={(e) =>
                  dispatch({ type: 'destination', value: e.target.value })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Pays"
                className="input "
                value={filters.country}
                onChange={(e) =>
                  dispatch({ type: 'country', value: e.target.value })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="ville"
                className="input "
                value={filters.city}
                onChange={(e) =>
                  dispatch({ type: 'city', value: e.target.value })
                }
              />
            </li>
            <li className="flex flex-col  gap-2">
              <span>type de chambre</span>
              <select
                className="select select-bordere w-full max-w-xs"
                value={filters.roomType}
                onChange={(e) => {
                  dispatch({ type: 'roomType', value: e.target.value });
                  dispatch({
                    type: 'bedType',
                    value: e.target.value === 'double' ? 'double' : 'single',
                  });
                }}
              >
                <option disabled={true}>chosie un type de chambre</option>
                <option value="single">single</option>
                <option value="double">double</option>
                <option value="triple">triple</option>
                <option value="quadruple">quadruple</option>
              </select>
            </li>
            <li className="flex flex-col  gap-2">
              <span>type de lit</span>
              <select
                className="select select-bordered w-full max-w-xs"
                value={filters.bedType}
                onChange={(e) =>
                  dispatch({ type: 'bedType', value: e.target.value })
                }
              >
                {filters.roomType === 'double' ? (
                  <>
                    <option disabled={true}>Choix du lit</option>
                    <option value="double">Lit double</option>
                    <option value="twin">Lit jumeaux</option>
                  </>
                ) : (
                  <>
                    <option disabled value="">
                      Choix du lit
                    </option>
                    <option value="single">Lit simple</option>
                  </>
                )}
              </select>
            </li>
            <li>
              <div className="w-full max-w-md mx-auto">
                <button
                  onClick={() => setShowServices(!showServices)}
                  className="btn btn-primary w-full"
                >
                  {showServices
                    ? 'Masquer les services'
                    : 'Afficher les services'}
                </button>

                {showServices && (
                  <div className="mt-4 p-4 bg-base-200 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">
                      Filtres par services
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {servicesList.map((service) => (
                        <label key={service} className="label cursor-pointer">
                          <input
                            type="checkbox"
                            name="services"
                            placeholder={service}
                            checked={filters.services.includes(service)}
                            className="checkbox checkbox-primary"
                            onChange={(e) =>
                              dispatch({
                                type: 'services',
                                value: e.target.placeholder,
                              })
                            }
                          />
                          <span className="label-text capitalize">
                            {service.replace('_', ' ')}
                          </span>
                        </label>
                      ))}

                      <button
                        className=" btn p-4 btn-md row-start-6"
                        onClick={
                          () => {
                            if (filters.services.length === 0) {
                              dispatch({ type: 'add all services' });
                              setTurn((prev) =>
                                prev === 'cochez tout'
                                  ? 'décochez tout'
                                  : 'cochez tout'
                              );
                            } else {
                              dispatch({ type: 'delete services', value: [] });
                              setTurn((prev) =>
                                prev === 'cochez tout'
                                  ? 'décochez tout'
                                  : 'cochez tout'
                              );
                            }
                          }
                          //
                        }
                      >
                        {turnOn}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li className="self-center">
              <span>Catégorie:</span>
              <StarsInput
                rating={filters.rating}
                changeRating={(n) => dispatch({ type: 'rating', value: n })}
              />
            </li>
            <li className="flex flex-col gap-2">
              <span>prix: {filters.price}</span>
              <input
                type="range"
                min={0}
                max={50000}
                step={1000}
                value={filters.price}
                onChange={(e) =>
                  dispatch({ type: 'price', value: e.target.value })
                }
                className="range range-neutral "
              />
            </li>

            <li className="flex justify-between">
              <span>petit déjeuner inclue ?</span>
              <input
                type="checkbox"
                checked={filters.breakfastIncluded}
                onChange={(e) => dispatch({ type: 'breakfast' })}
                className="checkbox checkbox-primary"
              />
            </li>
            <li className="flex flex-col gap-2">
              <span className="font-medium">Proximité du centre ville</span>
              <div className="flex items-center gap-4">
                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="proximity"
                    className="radio radio-primary"
                    checked={filters.proximity === 5}
                    value={5}
                    onChange={(e) =>
                      dispatch({
                        type: 'proximity',
                        value: Number(e.target.value),
                      })
                    }
                  />
                  <span className="label-text">≤ 5 km</span>
                </label>

                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="proximity"
                    className="radio radio-primary"
                    checked={filters.proximity === 10}
                    value={10}
                    onChange={(e) =>
                      dispatch({
                        type: 'proximity',
                        value: Number(e.target.value),
                      })
                    }
                  />
                  <span className="label-text">≤ 10 km</span>
                </label>

                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="proximity"
                    className="radio radio-primary"
                    checked={filters.proximity === 20}
                    value={20}
                    onChange={(e) =>
                      dispatch({
                        type: 'proximity',
                        value: Number(e.target.value),
                      })
                    }
                  />
                  <span className="label-text">≤ 20 km</span>
                </label>
              </div>
            </li>

            <li className="flex gap-10">
              <button
                className="btn btn-primary"
                onClick={() => {
                  addFilterToUrl(initialFilters);
                  dispatch({ type: '' });
                }}
              >
                réinitialiser
              </button>
              <button
                className="btn btn-primary "
                onClick={() => addFilterToUrl(filters)}
              >
                appliquer
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HotelFilters;
