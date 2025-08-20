import mongoose from 'mongoose';

export const typeChoices = ['omra_hajj', 'voyage_organisé'];
export const subTypeChoices = [
  'voyage_local_simple',
  'voyage_local_circuit',
  'voyage_inter',
  'omra_simple',
  'omra_voyage',
  'hajj',
];
export const trajet = new mongoose.Schema({
  depart: {
    ville_depart: String,
    lieu_depart: String,
    date_depart: Date,
    heure_depart: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
  },
  arrivé: {
    ville_arrivé: String,
    lieu_arrivé: String,
    date_arrivé: Date,
    heure_arrivé: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
  },
  info_transport: {
    longueur_trajet: Number,
    durée: Number,
    type_transport: { type: String, enum: ['bus', 'avion'] },
    type_vol: { type: String, enum: ['direct', 'indirect', ''] },
    nb_escales: Number,
    durré_escales: Number,
    aéroport_escales: [String],
    compagnie: String,
    class: [String],
    bagages: Number,
    prix_transport: Number,
  },
});

export const repas = new mongoose.Schema({
  petit_déjeuner: {
    inclus: Boolean,
    lieu: String,
  },
  déjeuner: {
    inclus: Boolean,
    lieu: String,
  },
  dinner: {
    inclus: Boolean,
    lieu: String,
  },
});

export const jour = new mongoose.Schema({
  date: Date,
  activités: [
    {
      titre: String,
      durée: Number,
      inclus: Boolean,
      prix: Number,
      descrition: String,
    },
  ],
  repas: repas,
});

export const Steps = new mongoose.Schema({
  trajet: [trajet],
  séjour: [
    {
      hebergement: { type: mongoose.Schema.Types.ObjectId, ref: 'Hebergement' },
      jours: [jour],
    },
  ],
});

export const VoyageSchema = new mongoose.Schema(
  {
    info_generale: {
      destination: String,
      pays: [String],
      villes: [String],
      période: String,
      type: { type: String, enum: typeChoices },
      sous_type: { type: String, enum: subTypeChoices },
      prix_basique: Number,
      nb_places: Number,
      nombreReservations: Number,
      date_limite_reservation: Date,
      status: { type: String, enum: ['expiré', 'valable'] },
      label: String,
      inclus: [String],
      description: String,
      durée: Number,
    },
    etapes: [Steps],
  },
  { timestamps: true }
);

const Voyage = mongoose.model('Voyage', VoyageSchema);
export default Voyage;

const destinationCollectionSchemaFilled = [
  {
    info_generale: {
      destination: 'Marrakech',
      pays: [],
      villes: [],
      période: 'été,hiver / ramadan, shawal',
      type: 'omra&hajj/ voyage',
      sous_type: '',
      prix_basique: '',
      nb_places: '',
      date_limite_reservation: '',
      status: '',
      label: '',
      inclus: ['navette aéroport'],
    },
    étapes: [
      {
        trajet: [
          {
            depart: {
              ville_depart: 'ville',
              lieu_depart: 'lieu: (aero, agence)',
              date_depart: 'data',
              heure_depart: 'heure',
            },
            arrivé: {
              ville_arrivé: 'ville',
              lieu_arrivé: 'lieu: (aero, agence)',
              date_arrivé: 'data',
              heure_arrivé: 'heure',
            },
            info_transport: {
              longueur_trajet: ['km', 'km'],
              durée: ['heure', 'heure'],
              type_transport: ['bus', 'avion'],
              type_vol: 'direct/escale',
              nb_escales: 0,
              durré_escales: ['heure', 'heure'],
              aéroport_escales: ['aero1', 'aero2'],
              compagnie: 'RAM',
              class: ['business', 'economie'],
              bagages: 'kg',
            },
          },
          {},
        ],
        séjour: [
          {
            hebergement: {
              ville: '',
              type: '',
              nuité: '',
              note: '',
              address: '',
              proximité: '',
              services: [,],
              chambre: [
                {
                  typeChambre: '',
                  typeLit: '',
                  prix: '',
                },
                {},
              ],
            },
            jours: [
              {
                date: '',
                activités: [
                  {
                    titre: '',
                    durée: '',
                    inclus: '',
                    prix: '',
                    descrition: '',
                  },
                  {},
                  {},
                ],
                repas: {
                  petit_déjeuner: {
                    inclus: '',
                    lieu: '',
                  },
                  déjeuner: {
                    inclus: '',
                    lieu: '',
                  },
                  dinner: {
                    inclus: '',
                    lieu: '',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
