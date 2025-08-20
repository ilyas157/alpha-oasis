import React from 'react';

const FilterBar = ({
  filters,
  changeFilters,
  changeApplyfilter
}) => {
  return (
    <>
      {/* pays */}
      <li>
        <input
          type="text"
          placeholder="Pays"
          className="input outline-1 w-40"
          value={filters.pays}
          onChange={(e) => {
            changeFilters((prev) => ({
              ...prev,
              pays: e.target.value,
            }));
          }}
        />
      </li>

      {/* Ville */}
      <li>
        <input
          type="text"
          placeholder="Ville"
          className="input outline-1 w-40"
          value={filters.ville}
          onChange={(e) =>
            changeFilters((prev) => ({
              ...prev,
              ville: e.target.value,
            }))
          }
        />
      </li>

      {/* Durée */}
      <li>
        <select
          value={filters.durée}
          onChange={(e) =>
            changeFilters((prev) => ({
              ...prev,
              durée: Number(e.target.value),
            }))
          }
          className="select outline-1  w-32"
        >
          <option value="1">1 jour</option>
          <option value="2">2 jours</option>
          <option value="3">3 jours</option>
          <option value="4">4 jours</option>
          <option value="5">5 jours</option>
          <option value="6">6 jours</option>
          <option value="7">7 jours</option>
          <option value="1000">plus qu'une semaine</option>
        </select>
      </li>

      {/* Prix */}
      <li>
        <label className="label justify-start gap-3">
          <span className="label-text text-sm">Prix max : </span>
          <span className="font-bold">
            {Number(filters.prix).toLocaleString('fr-FR')} MAD
          </span>
        </label>
        <input
          type="range"
          min={1000}
          max={20000}
          step={100}
          className="range range-sm w-44"
          value={filters.prix}
          onChange={(e) =>
            changeFilters((prev) => ({
              ...prev,
              prix: Number(e.target.value),
            }))
          }
        />
      </li>

      {/* Commodités */}
      <li>
        <div className="flex flex-col gap-1">
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Vols inclus</span>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={filters.vols}
              onChange={(e) =>
                changeFilters((prev) => ({
                  ...prev,
                  vols: e.target.checked,
                }))
              }
            />
          </label>
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Wifi</span>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={filters.wifi}
              onChange={(e) =>
                changeFilters((prev) => ({
                  ...prev,
                  wifi: e.target.checked,
                }))
              }
            />
          </label>
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Petit déjeuner</span>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={filters.dejeuner}
              onChange={(e) =>
                changeFilters((prev) => ({
                  ...prev,
                  dejeuner: e.target.checked,
                }))
              }
            />
          </label>
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Hébergement</span>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={filters.hebergement}
              onChange={(e) =>
                changeFilters((prev) => ({
                  ...prev,
                  hebergement: e.target.checked,
                }))
              }
            />
          </label>
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Transfert inclus</span>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={filters.transfert}
              onChange={(e) =>
                changeFilters((prev) => ({
                  ...prev,
                  transfert: e.target.checked,
                }))
              }
            />
          </label>
        </div>
      </li>

      {/* Dates */}
      <li>
        {' '}
        <p className="text-center">Date de début</p>
        <input
          type="date"
          className="input input-bordered w-44"
          placeholder="Date de départ"
          value={filters.date_depart}
          onChange={(e) =>
            changeFilters((prev) => ({
              ...prev,
              date_depart: e.target.value,
            }))
          }
        />
      </li>
      <li>
        <p className="text-center">Date de retour</p>
        <input
          type="date"
          className="input input-bordered w-44"
          placeholder="Date de retour"
          value={filters.date_retour}
          onChange={(e) =>
            changeFilters((prev) => ({
              ...prev,
              date_retour: e.target.value,
            }))
          }
        />
      </li>

      {/* Nombre de personnes */}
      <li>
        <p className="text-center">Nb personnes</p>
        <input
          type="number"
          className="input input-bordered w-32"
          placeholder="Nb personnes"
          min={1}
          value={filters.nb_personnes}
          onChange={(e) =>
            changeFilters((prev) => ({
              ...prev,
              nb_personnes: Number(e.target.value),
            }))
          }
        />
      </li>
      <li className="flex gap-5">
        <button
          className="btn btn-neutral px-10 "
          onClick={() => {
            document.getElementById('my-drawer').checked = false;
            changeApplyfilter((prev) => !prev);
          }}
        >
          Appliquer
        </button>
        <button
          className="btn btn-neutral px-2 "
          onClick={() => {
            changeFilters(() => ({
              pays: '',
              ville: '',
              durée: 1,
              prix: 6000,
              vols: null,
              wifi: null,
              dejeuner: null,
              hebergement: null,
              transfert: null,
              date_depart: '',
              date_retour: '',
              nb_personnes: 1,
            }));
            changeApplyfilter((prev) => !prev);
          }}
        >
          Réinitialiser
        </button>
      </li>
    </>
  );
};

export default FilterBar;
