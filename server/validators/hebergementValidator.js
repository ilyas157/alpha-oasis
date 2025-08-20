import Joi from 'joi';
import { allowedServices } from '../models/Hebergement.js';

const roomValidSchema = Joi.object({
  typeChambre: Joi.string().valid('single', 'double', 'triple', 'quadruple'),
  typeLit: Joi.string().valid('twin', 'double', 'single'),
  prix: Joi.number().min(0),
});
export const PostHebergementValidSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  note: Joi.number().min(0).max(5),
  country: Joi.string(),
  city: Joi.string(),
  availability: Joi.boolean(),
  services: Joi.array().items(Joi.string().valid(...allowedServices)),
  rooms: Joi.array().items(roomValidSchema),
  rating: Joi.number().min(0).max(10),
  BreakfastIncluded: Joi.boolean(),
  description: Joi.string(),
  proximity: Joi.number(),
  prix_basique: Joi.number().min(0),
  images: Joi.array().items(Joi.string().uri()),
  thumbnail: Joi.optional(),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid('libre', 'privé'),
});

export const HebergementQueryValidSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  note: Joi.number().min(0).max(5),
  country: Joi.string(),
  city: Joi.string(),
  availability: Joi.boolean(),
  proximity: Joi.number().min(0).max(15),
  address: Joi.string(),
  services: Joi.array().items(Joi.string().valid(...allowedServices)),
  rooms: roomValidSchema,
  prix_basique: Joi.number().min(0),
  rating: Joi.number().min(0).max(10),
  BreakfastIncluded: Joi.boolean(),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid('libre', 'privé'),
}).unknown(false);

const string =
  ' name=type=note=country=city=availability=address=services=rooms[typeLit]=rooms[prix]=rooms[typeChambre]=rating=BreakfastIncluded=tags=status=';
