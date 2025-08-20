const toMongoFilters = (req, res, next) => {
  let filters = {};
  const trajet = {};
  Object.entries(req.filters).forEach(([key, value]) => {
    if (
      [
        'période',
        'type',
        'sous_type',
        'nb_places',
        'status',
        'durée',
        'nombreReservations',
      ].includes(key)
    ) {
      filters['info_generale.' + key] = value;
    } else if (['pays', 'villes'].includes(key)) {
      filters['info_generale.' + key] = {
        $all: value.map((v) => new RegExp(v, 'i')),
      };
      console.log(filters['info_generale.' + key]);
    } else if (key === 'destination') {
      filters['info_generale.destination'] = { $regex: value, $options: 'i' };
    } else if (key === 'date_limite_reservation') {
      filters['info_generale.date_limite_reservation'] = {
        $lte: new Date(value),
      };
    } else if (key === 'prix_basique') {
      filters['info_generale.prix_basique'] = { $lte: value };
    } else if (key === 'ville_depart') {
      trajet['depart.ville_depart'] = { $regex: value, $options: 'i' };
    } else if (key === 'lieu_depart') {
      trajet['depart.lieu_depart'] = { $regex: value, $options: 'i' };
    } else if (key === 'date_depart') {
      trajet['depart.date_depart'] = { $lte: new Date(value) };
    } else if (key === 'ville_arrivé') {
      trajet['arrivé.ville_arrivé'] = { $regex: value, $options: 'i' };
    } else if (key === 'lieu_arrivé') {
      trajet['arrivé.lieu_arrivé'] = { $regex: value, $options: 'i' };
    } else if (key === 'date_arrivé') {
      trajet['arrivé.date_arrivé'] = new Date(value);
    } else if (key === 'type_transport') {
      trajet['info_transport.type_transport'] = value;
    } else if (key === 'type_vol') {
      trajet['info_transport.type_vol'] = value;
    }
  });

  // Build the inner $elemMatch filter for trajet
  /*
  Object.keys(trajet).forEach((k) => {
    if (Object.keys(trajet[k]).length === 0) {
      delete trajet[k];
    }
  });
  */
  if (Object.keys(trajet).length > 0) {
    filters.etapes = {
      $elemMatch: {
        trajet: {
          $elemMatch: trajet,
        },
      },
    };
  }
  req.filters = filters;
  console.log('turned to acceptable mongoose', req.filters);
  next();
};

export default toMongoFilters;
