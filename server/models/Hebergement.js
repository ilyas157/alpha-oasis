import mongoose from 'mongoose';

export const allowedServices = [
  'wifi',
  'pool',
  'spa',
  'gym',
  'parking',
  'restaurant',
  'airport_shuttle',
  'pet_friendly',
  'laundry',
  'air_conditioner',
  // add more allowed service strings here
];

export const roomSchema = new mongoose.Schema({
  typeChambre: {
    type: String,
    enum: ['single', 'double', 'triple', 'quadruple'],
  },
  typeLit: {
    type: String,
    enum: ['twin', 'double', 'single'],
    default: 'double',
  },
  prix: Number,
});
const HebergementSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    slug: String, // for SEO-friendly URLs
    note: { type: Number,default: 4 },
    country: String,
    city: String,
    availability: { type: Boolean, default: false },
    address: String,
    services: [
      {
        type: String,
        enum: allowedServices,
      },
    ],
    prix_basique: Number,
    rooms: [roomSchema],
    rating: Number,
    BreakfastIncluded: Boolean,
    proximity: Number,
    description: String,
    images: [String],
    thumbnail: String,
    tags: [String],
    status: {
      type: String,
      enum: ['libre', 'privé'],
      default: 'libre',
    },
  },
  { timestamps: true }
);


const Hebergement = mongoose.model("Hebergement", HebergementSchema);
export default Hebergement;
