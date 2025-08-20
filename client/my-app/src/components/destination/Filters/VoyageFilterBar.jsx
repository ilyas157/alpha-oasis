import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarsInput from './StarsInput';
import qs from 'qs';
import { allowedServices } from '../../../../../../server/models/Hebergement';

const VoyageFilterBar = ({
  initialFilters,
  changePage,
  changeTags,
  changeModal,
}) => {
  const [showServices, setShowServices] = useState(false);
  const [button_check, setButton_check] = useState('cochez tout');
  const navigate = useNavigate();

  const defaultFilters = {
    destination: '',
    sous_type: '',
    période: '',
    date_depart: '',
    note: 0,
    pays: '',
    villes: '',
    prix_basique: null,
  };
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...initialFilters,
  });
  const handleApplyFilters = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <section className="hidden lg:block px-15 py-5 ">
        <div className="flex justify-center gap-50  max-w-xl mx-auto">
          <ul className="flex flex-col gap-5">
            <li>
              <input
                type="text"
                placeholder="Destination"
                className="input"
                value={filters.destination}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    destination: e.target.value,
                  }));
                }}
              />
            </li>
            <li className="flex flex-col gap-2">
              <span>Départ avant ?</span>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                value={filters.date_depart}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    date_depart: e.target.value,
                  }));
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Pays"
                className="input"
                value={filters.pays}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, pays: e.target.value }));
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Ville"
                className="input"
                value={filters.villes}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, villes: e.target.value }));
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Type"
                className="input"
                value={filters.sous_type}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    sous_type: e.target.value,
                  }));
                }}
              />
            </li>
            <li className="flex flex-col gap-2">
              <span>
                Prix:{' '}
                {filters.prix_basique === null ? '' : filters.prix_basique}
              </span>
              <input
                type="range"
                min={0}
                max={70000}
                step={500}
                value={filters.prix_basique}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    prix_basique: e.target.value,
                  }))
                }
                className="range range-neutral "
              />
            </li>
            <li className="flex flex-col gap-2">
              <span>Période</span>
              <select
                className="select select-bordered w-full max-w-xs"
                value={filters.période}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    période: e.target.value,
                  }))
                }
              >
                <option disabled value="">
                  Période
                </option>
                <option value="été">Été</option>
                <option value="automne">Automne</option>
                <option value="triple">Hiver</option>
                <option value="primtemps">Primtemps</option>
              </select>
            </li>
            <li className="flex gap-10">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate('/voyage');
                  setFilters(defaultFilters);
                  changeTags([]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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

export default VoyageFilterBar;
