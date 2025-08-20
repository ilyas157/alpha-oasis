import Joi from "joi";
import { allowedServices } from '../models/Hotels.js';




const roomValidationSchema = Joi.object({
  type: Joi.string().valid('single', 'double', 'triple', 'quadruple'),
  bedType: Joi.string().valid('twin', 'double','single'),
  price: Joi.number(),
});



export const getHotelValidSchema = Joi.object({
    name: Joi.string(),
    slug:  Joi.string(), // for SEO-friendly URLs
    category: Joi.number().min(1).max(5),
    country: Joi.string(),
    city: Joi.string(),
    availability: Joi.boolean(),
    address: Joi.string(),
    services: Joi.array().items(Joi.string().valid(...allowedServices)),
    rooms: Joi.array().items(roomValidationSchema),
    rating: Joi.number().min(1).max(5),
    basePrice: Joi.number(),
    breakfastIncluded: Joi.boolean(),
    description: Joi.string(),
    shortDescription: Joi.string(),
    images: Joi.array().items(Joi.string().uri()),
    thumbnail: Joi.string().uri(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published', 'archived'),
},)




export const createHotelValidSchema = Joi.object({
    name: Joi.string().required(),
    slug:  Joi.string(), // for SEO-friendly URLs
    category: Joi.number().min(1).max(5).required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    availability: Joi.boolean().required().required(),
    address: Joi.string(),
    services: Joi.array().items(Joi.string().valid(...allowedServices)),
    rooms: Joi.array().items(roomValidationSchema),
    rating: Joi.number().min(1).max(10),
    basePrice: Joi.number(),
    breakfastIncluded: Joi.boolean().required(),
    description: Joi.string(),
    shortDescription: Joi.string(),
    images: Joi.array().items(Joi.string().uri()),
    thumbnail: Joi.string().uri(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published', 'archived'),
},).unknown()
  



