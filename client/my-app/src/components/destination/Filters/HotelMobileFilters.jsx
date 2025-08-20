import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarsInput from './StarsInput';
import qs from 'qs';
import { allowedServices } from '../../../../../../server/models/Hebergement';

const HotelMobileFilters = ({
  initialFilters,
  changePage,
  changeTags,
  changeModal,
  changeDrawerOpen,
}) => {
  const [showServices, setShowServices] = useState(true);
  const [button_check, setButton_check] = useState('cochez tout');
  const navigate = useNavigate();

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
  const defaultFilters = {
    name: '',
    type: '',
    note: 0,
    country: '',
    city: '',
    services: [],
    proximity: 0,
    rooms: {
      typeChambre: '',
      typeLit: '',
      prix: null,
    },
    BreakfastIncluded: false,
  };
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...initialFilters,
  });
  const handleApplyFilters = () => {
    changeDrawerOpen(false);
    changePage(0);
    console.log('these are filters before the deep compare', filters);

    const activeFilters = {};

    const isDeepEqual = (a, b) => {
      if (a === b) return true;
      if (typeof a !== typeof b) return false;

      if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((v, i) => isDeepEqual(v, b[i]));
      }

      if (typeof a === 'object' && a !== null && b !== null) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;

        return keysA.every((key) => isDeepEqual(a[key], b[key]));
      }

      return false;
    };

    Object.entries(filters).forEach(([key, value]) => {
      const defaultValue = defaultFilters[key];
      if (!isDeepEqual(value, defaultValue)) {
        activeFilters[key] = value;
      }
    });

    console.log('active filters are : ', activeFilters);
    const cleanObject = (obj) => {
      if (typeof obj !== 'object' || obj === null) return obj;

      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (
          value === '' ||
          value === null ||
          (Array.isArray(value) && value.length === 0)
        ) {
          continue; // skip empty values
        }

        if (typeof value === 'object' && !Array.isArray(value)) {
          const cleaned = cleanObject(value);
          if (Object.keys(cleaned).length > 0) {
            result[key] = cleaned;
          }
        } else {
          result[key] = value;
        }
      }

      return result;
    };

    // Clean your active filters
    const cleanedFilters = cleanObject(activeFilters);
    if (Object.keys(cleanedFilters).length === 0) {
      changeModal(true);
    }
    const query = qs.stringify(cleanedFilters, {
      arrayFormat: 'comma',
      encode: false,
    });
    let tagsList = [];
    console.log('this is the cleaned filters', cleanedFilters);
    Object.entries(cleanedFilters).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        console.log('keysssss', Object.keys(value));
        Object.keys(value).forEach((k) => {
          tagsList.push(k);
        });
      } else {
        tagsList.push(key);
      }
    });
    console.log('this is the tag list', tagsList);
    changeTags(tagsList);
    console.log('filters now are: ', filters);
    console.log('the query is:', query);

    navigate('?' + query);
  };

  return (
    <>
      <section className=" px-15 py-5">
        <div className="flex justify-center gap-50 max-w-xl mx-auto">
          <ul className="flex flex-col gap-5">
            <li>
              <input
                type="text"
                placeholder="Nom hebergement"
                className="input"
                value={filters.name}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Pays"
                className="input"
                value={filters.country}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, country: e.target.value }));
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Ville"
                className="input"
                value={filters.city}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, city: e.target.value }));
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Type"
                className="input"
                value={filters.type}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, type: e.target.value }));
                }}
              />
            </li>

            <li className="flex flex-col gap-2">
              <span>Type de chambre</span>
              <select
                className="select select-bordered w-full max-w-xs"
                value={filters.rooms.typeChambre}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    rooms: { ...prev.rooms, typeChambre: e.target.value },
                  }))
                }
              >
                <option disabled value="">
                  Choisissez un type de chambre
                </option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
                <option value="quadruple">Quadruple</option>
              </select>
            </li>

            <li className="flex flex-col gap-2">
              <span>Type de lit</span>
              <select
                className="select select-bordered w-full max-w-xs"
                value={filters.rooms.typeLit}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    rooms: { ...prev.rooms, typeLit: e.target.value },
                  }))
                }
              >
                {filters.rooms.typeChambre === 'double' ? (
                  <>
                    <option disabled value="">
                      Choisissez un type de lit
                    </option>
                    <option value="double">Lit double</option>
                    <option value="twin">Lit jumeaux</option>
                  </>
                ) : (
                  <>
                    <option value="">Choisissez un type de lit</option>
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
                    <div className="grid grid-cols-2 gap-5">
                      {servicesList.map((service) => (
                        <label key={service} className="label cursor-pointer">
                          <input
                            type="checkbox"
                            name="services"
                            checked={filters.services.includes(service)}
                            className="checkbox checkbox-primary"
                            onChange={(e) => {
                              setFilters((prev) => {
                                if (prev.services.includes(service)) {
                                  return {
                                    ...prev,
                                    services: prev.services.filter(
                                      (s) => s !== service
                                    ),
                                  };
                                }
                                return {
                                  ...prev,
                                  services: [...prev.services, service],
                                };
                              });
                            }}
                          />
                          <span className="label-text capitalize">
                            {service.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                      <button
                        className=" row-start-6 btn btn-shadow col-span-2  "
                        onClick={() => {
                          setFilters((prev) => {
                            if (
                              prev.services.length !== allowedServices.length
                            ) {
                              return { ...prev, services: allowedServices };
                            }
                            return { ...prev, services: [] };
                          });
                          setButton_check((prev) => {
                            return prev === 'tout cocher'
                              ? 'tout décocher'
                              : 'tout cocher';
                          });
                        }}
                      >
                        {button_check}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>

            <li className="self-center">
              <span>Catégorie:</span>
              <StarsInput
                rating={Math.floor(filters.note)}
                changeNote={(i) => setFilters((prev) => ({ ...prev, note: i }))}
              />
            </li>

            <li className="flex flex-col gap-2">
              <span>
                Prix: {filters.rooms.prix === null ? '' : filters.rooms.prix}
              </span>
              <input
                type="range"
                min={0}
                max={1000}
                step={100}
                value={filters.rooms.prix}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    rooms: {
                      ...prev.rooms,
                      prix: e.target.value,
                    },
                  }))
                }
                className="range range-neutral "
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
                      setFilters((prev) => ({
                        ...prev,
                        proximity: Number(e.target.value),
                      }))
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
                      setFilters((prev) => ({
                        ...prev,
                        proximity: Number(e.target.value),
                      }))
                    }
                  />
                  <span className="label-text">≤ 10 km</span>
                </label>

                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="proximity"
                    className="radio radio-primary"
                    checked={filters.proximity === 15}
                    value={15}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        proximity: Number(e.target.value),
                      }))
                    }
                  />
                  <span className="label-text">≤ 15 km</span>
                </label>
              </div>
            </li>

            <li className="flex justify-between">
              <span>Petit déjeuner inclus ?</span>
              <input
                type="checkbox"
                checked={filters.BreakfastIncluded}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    BreakfastIncluded: e.target.checked,
                  }))
                }
                className="checkbox checkbox-primary"
              />
            </li>

            <li className="flex gap-10">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate('/hebergement');
                  setFilters(defaultFilters);
                  changeTags([]);
                }}
              >
                Réinitialiser
              </button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>
                Appliquer
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HotelMobileFilters;
