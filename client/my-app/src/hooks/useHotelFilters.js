// hooks/useHotelFilters.js
import { useMemo, useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'destination':
    case 'rating':
    case 'country':
    case 'city':
    case 'roomType':
    case 'price':
    case 'bedType':
    case 'proximity':
      return { ...state, [action.type]: action.value };
    case 'services':
      if (state.services.includes(action.value)) {
        return {
          ...state,
          services: state.services.filter((s) => s !== action.value),
        };
      }
      return { ...state, services: [...state.services, action.value] };
    case 'add all services':
      return { ...state, services: [...servicesList] };
    case 'delete services':
      return { ...state, services: [] };
    case 'breakfast':
      return { ...state, breakfastIncluded: !state.breakfastIncluded };
    case 'reset':
      return { ...initialFilters };
    default:
      return state;
  }
};

const parseSearchParams = (searchParams) => {
  const parsed = {};
  searchParams.forEach((value, key) => {
    if (value === 'true') parsed[key] = true;
    else if (value === 'false') parsed[key] = false;
    else if (value.includes(',')) parsed[key] = value.split(',');
    else if (!isNaN(value)) parsed[key] = Number(value);
    else parsed[key] = value;
  });
  return { ...initialFilters, ...parsed };
};

const useHotelFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedParams = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );
  const [filters, dispatch] = useReducer(reducer, parsedParams);

  const applyFiltersToURL = (filters) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(','));
      } else if (
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        params.set(key, value);
      }
    }
    setSearchParams(params);
  };

  // Keep reducer in sync with URL on back/forward
  useEffect(() => {
    dispatch({ type: 'reset', value: parsedParams });
  }, [searchParams.toString()]);

  return {
    filters,
    dispatch,
    applyFiltersToURL,
    resetFilters: () => {
      dispatch({ type: 'reset' });
      setSearchParams({});
    },
  };
};

export default useHotelFilters;
