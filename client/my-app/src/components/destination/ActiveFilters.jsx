import React from 'react';

const filterLabels = {
  search: 'Recherche',
  prix: 'Prix max',
  duree: 'Durée max',
  dejeuner: 'Petit déjeuner',
  hebergement: 'Hébergement',
  transfert: 'Transfert',
  type: 'Type',
  nb_personnes: 'Personnes',
};

export default function ActiveFilters({ filters, onRemove }) {
  const chips = [];
  if (filters.search) chips.push({ key: 'search', label: `${filterLabels.search}: ${filters.search}` });
  if (filters.prix != null) chips.push({ key: 'prix', label: `${filterLabels.prix}: ${filters.prix.toLocaleString('fr-FR')} MAD` });
  if (filters.duree != null) chips.push({ key: 'duree', label: `${filterLabels.duree}: ${filters.duree}` });
  if (filters.dejeuner === true) chips.push({ key: 'dejeuner', label: filterLabels.dejeuner });
  if (filters.hebergement === true) chips.push({ key: 'hebergement', label: filterLabels.hebergement });
  if (filters.transfert === true) chips.push({ key: 'transfert', label: filterLabels.transfert });
  if (filters.type && filters.type.length) chips.push({ key: 'type', label: `${filterLabels.type}: ${filters.type.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}` });
  if (filters.nb_personnes != null) chips.push({ key: 'nb_personnes', label: `${filterLabels.nb_personnes}: ${filters.nb_personnes}` });

  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map(chip => (
        <span key={chip.key} className=" bg-yellow-300 px-5 py-1 rounded-full flex items-center text-sm">
          {chip.label}
          <button className="ml-2 bg-yellow-300  hover:text-red-600" onClick={() => onRemove(chip.key)} title="Supprimer ce filtre">×</button>
        </span>
      ))}
    </div>
  );
} 