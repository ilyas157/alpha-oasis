import React from 'react';

const types = [
  { value: 'omra_hajj', label: 'Omra & Hajj' },
  { value: 'voyage', label: 'Voyages organisés' },
  { value: 'hotel', label: 'Hôtel' },
];

export default function FilterSidebar({filters, onChange, onReset, className = '' }) {
  // Helper to update a filter
  const set = (key, value) => onChange({ ...filters, [key]: value });
  // Multi-select for type
  const toggleType = (type) => {
    const arr = filters.type || [];
    if (arr.includes(type)) {
      set('type', arr.filter((t) => t !== type));
    } else {
      set('type', [...arr, type]);
    }
  };
  return (
    <aside className={`bg-white ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filtres</h2>
        <button className="btn shadow text-sm  " onClick={onReset}>Réinitialiser</button>
      </div>
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1">Recherche</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Pays, ville, titre..."
            value={filters.search || ''}
            onChange={e => set('search', e.target.value)}
          />
        </div>
        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Prix max</label>
          <input
            type="range"
            min={1000}
            max={20000}
            step={100}
            value={filters.prix ?? 20000}
            onChange={e => set('prix', Number(e.target.value))}
            className="range w-full"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>1 000 MAD</span>
            <span>{filters.prix ? filters.prix.toLocaleString('fr-FR') : '20 000'} MAD</span>
          </div>
        </div>
        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">Durée max (jours)</label>
          <input
            type="range"
            min={1}
            max={30}
            value={filters.duree ?? 30}
            onChange={e => set('duree', Number(e.target.value))}
            className="range w-full"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>1</span>
            <span>{filters.duree ?? 30}</span>
          </div>
        </div>
        {/* Boolean toggles */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox  checked:border-yellow-500 checked:bg-yellow-300 checked:text-yellow-700" checked={filters.dejeuner === true} onChange={e => set('dejeuner', e.target.checked ? true : null)} />
            Petit déjeuner inclus
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox"className="checkbox  checked:border-yellow-500 checked:bg-yellow-300 checked:text-yellow-700"checked={filters.hebergement === true} onChange={e => set('hebergement', e.target.checked ? true : null)} />
            Hébergement
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox  checked:border-yellow-500 checked:bg-yellow-300 checked:text-yellow-700" checked={filters.transfert === true} onChange={e => set('transfert', e.target.checked ? true : null)} />
            Transfert inclus
          </label>
        </div>
        {/* Multi-select type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button
                key={t.value}
                type="button"
                className={` btn btn-shadow px-3 py-1 rounded-full ${filters.type?.includes(t.value) ? 'bg-yellow-300 ' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => toggleType(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {/* Number of people */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de personnes</label>
          <input
            type="number"
            min={1}
            className="input input-bordered w-full"
            value={filters.nb_personnes ?? ''}
            onChange={e => set('nb_personnes', e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        {/* Dates (optional) */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Date de départ</label>
          <input type="date" className="input input-bordered w-full" value={filters.date_depart || ''} onChange={e => set('date_depart', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de retour</label>
          <input type="date" className="input input-bordered w-full" value={filters.date_retour || ''} onChange={e => set('date_retour', e.target.value)} />
        </div> */}
      </div>
    </aside>
  );
} 