import Joi from 'joi';
import { PostHebergementValidSchema } from './hebergementValidator.js';
import { typeChoices, subTypeChoices } from '../models/Voyages.js';

export const trajet = Joi.object({
  depart: {
    ville_depart: Joi.string(),
    lieu_depart: Joi.string(),
    date_depart: Joi.date(),
    heure_depart: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .messages({
        'string.pattern.base':
          '"heure_depart" must be in HH:mm format (e.g., 09:30)',
      }),
  },
  arrivé: {
    ville_arrivé: Joi.string(),
    lieu_arrivé: Joi.string(),
    date_arrivé: Joi.date(),
    heure_depart: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .messages({
        'string.pattern.base':
          '"heure_depart" must be in HH:mm format (e.g., 09:30)',
      }),
  },
  info_transport: {
    longueur_trajet: Joi.number(),
    durée: Joi.number().min(0),
    type_transport: Joi.string().valid('bus', 'avion'),
    type_vol: Joi.string().valid('direct', 'indirect', ''),
    nb_escales: Joi.number().min(0),
    durré_escales: Joi.number().min(0).max(24),
    aéroport_escales: Joi.array().items(Joi.string()),
    compagnie: Joi.string().allow(''),
    class: Joi.array().items(Joi.string()),
    bagages: Joi.number().min(0),
  },
});

export const repas = Joi.object({
  petit_déjeuner: {
    inclus: Joi.boolean(),
    lieu: Joi.string().allow(''),
  },
  déjeuner: {
    inclus: Joi.boolean(),
    lieu: Joi.string().allow(''),
  },
  dinner: {
    inclus: Joi.boolean(),
    lieu: Joi.string().allow(''),
  },
});

export const jour = Joi.object({
  date: Joi.date(),
  activités: Joi.array().items(
    Joi.object({
      titre: Joi.string(),
      durée: Joi.number().min(0),
      inclus: Joi.boolean(),
      prix: Joi.number().min(0),
      descrition: Joi.string(),
    })
  ),
  repas: repas,
});

export const miniSéjour = Joi.object({
  hebergement: Joi.string().hex().length(24),
  jours: Joi.array().items(jour),
});
export const Steps = Joi.object({
  trajet: Joi.array().items(trajet),
  séjour: Joi.array().items(miniSéjour),
});

export const PostVoyageValidSchema = Joi.object({
  info_generale: {
    destination: Joi.string(),
    pays: Joi.array().items(Joi.string()),
    villes: Joi.array().items(Joi.string()),
    période: Joi.string(),
    type: Joi.string().valid(...typeChoices),
    sous_type: Joi.string().valid(...subTypeChoices),
    prix_basique: Joi.number().min(0),
    nb_places: Joi.number().min(1),
    nombreReservations: Joi.number().min(0),
    date_limite_reservation: Joi.date(),
    status: Joi.string().valid('expiré', 'valable'),
    label: Joi.string(),
    inclus: Joi.array().items(Joi.string()),
    description: Joi.string(),
    durée: Joi.number(),
  },
  etapes: Joi.array().items(Steps),
});

export const PutVoyageValidSchema = Joi.object({
  info_generale: {
    destination: Joi.string(),
    pays: Joi.array().items(Joi.string()),
    villes: Joi.array().items(Joi.string()),
    période: Joi.string(),
    type: Joi.string().valid(...typeChoices),
    sous_type: Joi.string().valid(...subTypeChoices),
    prix_basique: Joi.number().min(0),
    nb_places: Joi.number().min(1),
    nombreReservations: Joi.number().min(0),
    date_limite_reservation: Joi.date(),
    status: Joi.string().valid('expiré', 'valable'),
    label: Joi.string(),
    inclus: Joi.array().items(Joi.string()),
    description: Joi.string(),
    durée: Joi.number(),
  },
  etapes: Joi.array().items(Steps),
});

export const VoyageQueryValidSchema = Joi.object({
  destination: Joi.string(),
  pays: Joi.array().items(Joi.string()),
  villes: Joi.array().items(Joi.string()),
  période: Joi.string(),
  type: Joi.string().valid(...typeChoices),
  sous_type: Joi.string().valid(...subTypeChoices),
  prix_basique: Joi.number().min(0),
  nb_places: Joi.number().min(1),
  nombreReservations: Joi.number().min(0),
  date_limite_reservation: Joi.date(),
  durée: Joi.number(),
  status: Joi.string().valid('expiré', 'valable'),
  ville_depart: Joi.string(),
  lieu_depart: Joi.string(),
  date_depart: Joi.date(),
  ville_arrivé: Joi.string(),
  lieu_arrivé: Joi.string(),
  date_arrivé: Joi.date(),
  type_transport: Joi.string().valid('bus', 'avion'),
  type_vol: Joi.string().valid('direct', 'indirect', ''),
});

const r = {
  'info_generale.destination': { $regex: 'jhef', $options: 'i' },
  'info_generale.pays': { $all: ['firjfr', 'jfknrf'] },
  'info_generale.villes': { $all: ['firjfr', 'jfknrf'] },
  'info_generale.période': 'frfrtbvt',
  'info_generale.type': 'frknrkf',
  'info_generale.sous_type': 'frknrkf',
  'info_generale.prix_basique': { $lte: 4520 },
  'info_generale.nb_places': 74,
  'info_generale.date_limite_reservation': { $lte: new Date('2025-07-30') },
  'info_generale.status': 'expiré',
  etapes: {
    $elemMatch: {
      trajet: {
        $elemMatch: {
          'depart.ville_depart': { $regex: 'jhef', $options: 'i' },
          'depart.lieu_depart': { $regex: 'jhef', $options: 'i' },
          'depart.date_depart': new Date('2025-07-30'),
          'arrivé.ville_arrivé': { $regex: 'jhef', $options: 'i' },
          'arrivé.lieu_arrivé': { $regex: 'jhef', $options: 'i' },
          'arrivé.date_arrivé': new Date('2025-07-30'),
          'info_transport.type_transport': 'bus',
          'info_transport.type_vol': '',
        },
      },
    },
  },
};
