import { useMemo, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StarsInput from '../destination/Filters/StarsInput';
import qs from 'qs'; 
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

const initialFiltersDefaults = {
  name: '',
  type: '',
  note: 4,
  country: '',
  city: '',
  availability: '',
  address: '',
  services: [],
  rooms: {
    typeLit: '',
    prix: 0,
    typeChambre: '',
  },
  rating: 4,
  BreakfastIncluded: false,
  tags: '',
  status: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
    case 'type':
    case 'note':
    case 'country':
    case 'city':
    case 'availability':
    case 'address':
    case 'tags':
    case 'status':
      return { ...state, [action.type]: action.value };
    case 'services':
      if (state.services.includes(action.value)) {
        return {
          ...state,
          services: state.services.filter((s) => s !== action.value),
        };
      }
      return { ...state, services: [...state.services, action.value] };
    case 'delete services':
      return { ...state, services: action.value };
    case 'add all services':
      return { ...state, services: [...servicesList] };
    case 'rooms[typeLit]':
      return {
        ...state,
        rooms: { ...state.rooms, typeLit: action.value },
      };
    case 'rooms[prix]':
      return {
        ...state,
        rooms: { ...state.rooms, prix: Number(action.value) },
      };
    case 'rooms[typeChambre]':
      return {
        ...state,
        rooms: { ...state.rooms, typeChambre: action.value },
      };
    case 'rating':
      return { ...state, rating: Number(action.value) };
    case 'BreakfastIncluded':
      return { ...state, BreakfastIncluded: !state.BreakfastIncluded };
    default:
      return state;
  }
};
const HotelFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters = useMemo(() => {
    const parsed = qs.parse(searchParams.toString());
    return {
      ...initialFiltersDefaults,
      ...parsed,
      // parse nested rooms object properties types explicitly if needed
      rooms: {
        ...initialFiltersDefaults.rooms,
        ...(parsed.rooms || {}),
        prix: parsed.rooms?.prix ? Number(parsed.rooms.prix) : 0,
      },
      services: Array.isArray(parsed.services)
        ? parsed.services
        : parsed.services
        ? [parsed.services]
        : [],
      rating: parsed.rating ? Number(parsed.rating) : 4,
      BreakfastIncluded:
        parsed.BreakfastIncluded === 'true' ||
        parsed.BreakfastIncluded === true
          ? true
          : false,
    };
  }, [searchParams]);

  const [filters, dispatch] = useReducer(reducer, initialFilters);
  const [showServices, setShowServices] = useState(false);
  const [turnOn, setTurn] = useState('cochez tout');

  const applyFiltersToUrl = () => {
    const str = qs.stringify(filters, { encode: false, arrayFormat: 'comma' });
    setSearchParams(str);
  };

  const resetFilters = () => {
    dispatch({ type: 'reset' });
    const str = qs.stringify(initialFiltersDefaults, {
      encode: false,
      arrayFormat: 'comma',
    });
    setSearchParams(str);
  };

  return (
    <section className="hidden lg:block px-15 py-5">
      <div className="flex justify-center gap-50 max-w-xl mx-auto">
        <ul className="flex flex-col gap-5">
          <li>
            <input
              type="text"
              placeholder="Nom"
              className="input"
              value={filters.name}
              onChange={(e) =>
                dispatch({ type: 'name', value: e.target.value })
              }
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Type"
              className="input"
              value={filters.type}
              onChange={(e) => dispatch({ type: 'type', value: e.target.value })}
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Note"
              className="input"
              value={filters.note}
              onChange={(e) => dispatch({ type: 'note', value: e.target.value })}
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Pays"
              className="input"
              value={filters.country}
              onChange={(e) =>
                dispatch({ type: 'country', value: e.target.value })
              }
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Ville"
              className="input"
              value={filters.city}
              onChange={(e) => dispatch({ type: 'city', value: e.target.value })}
            />
          </li>
          {/* ... autres inputs ... */}
          <li>
            <input
              type="text"
              placeholder="Type de lit"
              className="input"
              value={filters.rooms.typeLit}
              onChange={(e) =>
                dispatch({ type: 'rooms[typeLit]', value: e.target.value })
              }
            />
          </li>
          <li>
            <input
              type="number"
              placeholder="Prix"
              className="input"
              value={filters.rooms.prix}
              onChange={(e) =>
                dispatch({ type: 'rooms[prix]', value: e.target.value })
              }
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Type de chambre"
              className="input"
              value={filters.rooms.typeChambre}
              onChange={(e) =>
                dispatch({ type: 'rooms[typeChambre]', value: e.target.value })
              }
            />
          </li>
          <li>
            <input
              type="checkbox"
              checked={filters.BreakfastIncluded}
              onChange={() => dispatch({ type: 'BreakfastIncluded' })}
            />
            <span>Petit déjeuner inclus</span>
          </li>
          {/* boutons appliquer / réinitialiser */}
          <li className="flex gap-10">
            <button className="btn btn-primary" onClick={resetFilters}>
              Réinitialiser
            </button>
            <button className="btn btn-primary" onClick={applyFiltersToUrl}>
              Appliquer
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HotelFilters;