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
  type: {
    type: String,
    enum: ['single', 'double', 'triple', 'quadruple'],
    required: false,
  },
  bedType: {
    type: String,
    enum: ['twin', 'double', 'single'],
    default: 'double',
  },
  price: { type: Number, required: false },
});
const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    slug: String, // for SEO-friendly URLs
    category: { type: Number, required: false, default: 4 },
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
    rooms: [roomSchema],
    rating: Number,
    basePrice: Number,
    breakfastIncluded: Boolean,
    description: String,
    shortDescription: String,
    images: [String],
    thumbnail: String,
    tags: [String],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel;
export const hotels = [
  {
    name: 'La Mamounia',
    slug: 'la-mamounia',
    category: 5,
    country: 'Morocco',
    city: 'Marrakesh',
    availability: true,
    address: 'Avenue Bab Jdid 40, Marrakesh 40000',
    services: ['wifi', 'spa', 'parking', 'restaurant', 'gym'],
    rooms: [
      { type: 'double', bedType: 'double', price: 500 },
      { type: 'single', bedType: 'single', price: 400 },
    ],
    rating: 4.8,
    basePrice: 400,
    breakfastIncluded: true,
    description:
      'Legendary luxury palace hotel opposite the Koutoubia Mosque in Marrakesh.',
    shortDescription: 'Iconic luxury in Marrakesh.',
    images: ['https://example.com/mamounia1.jpg'],
    thumbnail: 'https://example.com/mamounia_thumb.jpg',
    tags: ['luxury', 'palace', 'spa'],
    status: 'published',
  },
  {
    name: 'El Fenn',
    slug: 'el-fenn-marrakesh',
    category: 5,
    country: 'Morocco',
    city: 'Marrakesh',
    availability: true,
    address: 'Derb Moulay Abdullah Ben Hezzian 2, Marrakesh',
    services: ['wifi', 'spa', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 300 },
      { type: 'single', bedType: 'single', price: 240 },
    ],
    rating: 4.6,
    basePrice: 240,
    breakfastIncluded: true,
    description:
      'Boutique riad hotel with art‑filled interiors, private pools and rooftop bar.',
    shortDescription: 'Stylish boutique riad in the Medina.',
    images: ['https://example.com/elfenn1.jpg'],
    thumbnail: 'https://example.com/elfenn_thumb.jpg',
    tags: ['boutique', 'riad', 'design'],
    status: 'published',
  },
  {
    name: 'Royal Mansour Marrakech',
    slug: 'royal-mansour-marrakech',
    category: 5,
    country: 'Morocco',
    city: 'Marrakesh',
    availability: true,
    address: 'Rue Abou Abbas el Seuri, Marrakesh',
    services: [
      'wifi',
      'spa',
      'gym',
      'restaurant',
      'parking',
      'airport_shuttle',
    ],
    rooms: [
      { type: 'double', bedType: 'double', price: 1000 },
      { type: 'single', bedType: 'single', price: 850 },
    ],
    rating: 4.9,
    basePrice: 850,
    breakfastIncluded: true,
    description:
      'Royal‑family owned palatial hotel made of private riads and gardens.',
    shortDescription: 'Ultimate Moroccan craftsmanship & luxury.',
    images: ['https://example.com/royalmansour_marrakech.jpg'],
    thumbnail: 'https://example.com/royalmansour_marrakech_thumb.jpg',
    tags: ['royal', 'palace', 'spa'],
    status: 'published',
  },
  {
    name: 'Royal Mansour Casablanca',
    slug: 'royal-mansour-casablanca',
    category: 5,
    country: 'Morocco',
    city: 'Casablanca',
    availability: true,
    address: 'Avenue des F.A.R, Casablanca',
    services: [
      'wifi',
      'spa',
      'gym',
      'restaurant',
      'parking',
      'airport_shuttle',
    ],
    rooms: [
      { type: 'double', bedType: 'double', price: 650 },
      { type: 'single', bedType: 'single', price: 550 },
    ],
    rating: 4.7,
    basePrice: 550,
    breakfastIncluded: true,
    description:
      'New Art‑Deco high‑rise hotel opened 2024 in central Casablanca.',
    shortDescription: 'Luxury meets business in Casablanca.',
    images: ['https://example.com/royalmansour_casablanca.jpg'],
    thumbnail: 'https://example.com/royalmansour_casa_thumb.jpg',
    tags: ['art-deco', 'luxury', 'spa'],
    status: 'published',
  },
  {
    name: 'Hyatt Regency Casablanca',
    slug: 'hyatt-regency-casablanca',
    category: 5,
    country: 'Morocco',
    city: 'Casablanca',
    availability: true,
    address: 'Place des Nations Unies, Casablanca',
    services: ['wifi', 'spa', 'gym', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 320 },
      { type: 'single', bedType: 'single', price: 250 },
    ],
    rating: 4.4,
    basePrice: 250,
    breakfastIncluded: false,
    description:
      'Classic luxury hotel in the Old Medina near Hassan II Mosque.',
    shortDescription: 'Central Casablanca hotel with spa and pool.',
    images: ['https://example.com/hyatt_casablanca.jpg'],
    thumbnail: 'https://example.com/hyatt_casa_thumb.jpg',
    tags: ['business', 'spa', 'city'],
    status: 'published',
  },
  {
    name: 'Sheraton Casablanca Hotel & Towers',
    slug: 'sheraton-casablanca',
    category: 5,
    country: 'Morocco',
    city: 'Casablanca',
    availability: true,
    address: '100 Avenue des F.A.R, Casablanca',
    services: ['wifi', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 300 },
      { type: 'single', bedType: 'single', price: 260 },
    ],
    rating: 4.3,
    basePrice: 260,
    breakfastIncluded: false,
    description:
      'Large upscale hotel in Casablanca’s Medina business district.',
    shortDescription: 'Sheraton towers near shops and attractions.',
    images: ['https://example.com/sheraton_casablanca.jpg'],
    thumbnail: 'https://example.com/sheraton_casa_thumb.jpg',
    tags: ['business', 'city', 'chain'],
    status: 'published',
  },
  {
    name: 'Riad Fes – Relais & Châteaux',
    slug: 'riad-fes-relais-chateaux',
    category: 5,
    country: 'Morocco',
    city: 'Fès',
    availability: true,
    address: 'Derb Ben Slimane, Fès el Bali, Fès',
    services: ['wifi', 'spa', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 350 },
      { type: 'single', bedType: 'single', price: 280 },
    ],
    rating: 4.7,
    basePrice: 280,
    breakfastIncluded: true,
    description: 'Elegant Relais & Châteaux riad in the heart of Fès medina.',
    shortDescription: 'Luxury riad in historic Fès.',
    images: ['https://example.com/riadfes.jpg'],
    thumbnail: 'https://example.com/riadfes_thumb.jpg',
    tags: ['riad', 'heritage', 'spa'],
    status: 'published',
  },
  {
    name: 'Hotel Continental Tangier',
    slug: 'hotel-continental-tangier',
    category: 4,
    country: 'Morocco',
    city: 'Tangier',
    availability: true,
    address: '36 Rue Dar Baroud, Tanger 90000',
    services: ['wifi', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 120 },
      { type: 'single', bedType: 'single', price: 100 },
    ],
    rating: 4.0,
    basePrice: 100,
    breakfastIncluded: false,
    description:
      'Historic harbour‑side hotel dating back to 1870 in Tangier medina.',
    shortDescription: 'Classic Tangier landmark hotel.',
    images: ['https://example.com/continental_tangier.jpg'],
    thumbnail: 'https://example.com/continental_tangier_thumb.jpg',
    tags: ['historic', 'budget', 'medina'],
    status: 'published',
  },
  {
    name: 'Riad Kalaa Rabat',
    slug: 'riad-kalaa-rabat',
    category: 4,
    country: 'Morocco',
    city: 'Rabat',
    availability: true,
    address: 'Riad Kalaa, Rabat',
    services: ['wifi', 'pool', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 150 },
      { type: 'single', bedType: 'single', price: 120 },
    ],
    rating: 4.5,
    basePrice: 120,
    breakfastIncluded: true,
    description:
      'Tranquil courtyard riad with rooftop terrace and pool in Rabat.',
    shortDescription: 'Boutique riad in Rabat’s medina.',
    images: ['https://example.com/riadkalaa1.jpg'],
    thumbnail: 'https://example.com/riadkalaa_thumb.jpg',
    tags: ['riad', 'boutique', 'courtyard'],
    status: 'published',
  },
  {
    name: 'Hassan Tour Palace Hotel',
    slug: 'hassan-tour-palace-rabat',
    category: 5,
    country: 'Morocco',
    city: 'Rabat',
    availability: true,
    address: 'Rabat, Morocco',
    services: ['wifi', 'spa', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 200 },
      { type: 'single', bedType: 'single', price: 180 },
    ],
    rating: 4.7,
    basePrice: 180,
    breakfastIncluded: true,
    description:
      'Majestic luxury hotel in Rabat with refined architecture and interiors.',
    shortDescription: 'Luxury palace-style hotel in Rabat.',
    images: ['https://example.com/hassanpalace.jpg'],
    thumbnail: 'https://example.com/hassanpalace_thumb.jpg',
    tags: ['luxury', 'palace', 'business'],
    status: 'published',
  },
  {
    name: 'Sofitel Casablanca Tour Blanche',
    slug: 'sofitel-casablanca-tour-blanche',
    category: 5,
    country: 'Morocco',
    city: 'Casablanca',
    availability: true,
    address: 'Place des Nations Unies, Casablanca',
    services: ['wifi', 'spa', 'restaurant', 'parking', 'airport_shuttle'],
    rooms: [
      { type: 'double', bedType: 'double', price: 280 },
      { type: 'single', bedType: 'single', price: 240 },
    ],
    rating: 4.6,
    basePrice: 240,
    breakfastIncluded: true,
    description:
      'Elegant luxury hotel in Casablanca blending modern comforts with Moroccan charm.',
    shortDescription: 'Top‑tier Sofitel in Casablanca.',
    images: ['https://example.com/sofitel_casa.jpg'],
    thumbnail: 'https://example.com/sofitel_casa_thumb.jpg',
    tags: ['luxury', 'spa', 'city'],
    status: 'published',
  },
  {
    name: 'Kenzi Menara Palace & Resort',
    slug: 'kenzi-menara-palace-marrakech',
    category: 5,
    country: 'Morocco',
    city: 'Marrakesh',
    availability: true,
    address: 'Marrakesh, near Bahia Palace',
    services: ['wifi', 'spa', 'pool', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 170 },
      { type: 'single', bedType: 'single', price: 140 },
    ],
    rating: 4.6,
    basePrice: 140,
    breakfastIncluded: true,
    description:
      'Large resort with gardens, pools and full spa near the city centre.',
    shortDescription: 'Resort oasis in Marrakech.',
    images: ['https://example.com/kenzipalace.jpg'],
    thumbnail: 'https://example.com/kenzipalace_thumb.jpg',
    tags: ['resort', 'spa', 'pool'],
    status: 'published',
  },
  {
    name: 'Atlas Essaouira & Spa',
    slug: 'atlas-essaouira-and-spa',
    category: 5,
    country: 'Morocco',
    city: 'Essaouira',
    availability: true,
    address: 'Essaouira, coastal resort',
    services: ['wifi', 'spa', 'pool', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 130 },
      { type: 'single', bedType: 'single', price: 110 },
    ],
    rating: 4.5,
    basePrice: 110,
    breakfastIncluded: true,
    description:
      'Beach‑front resort in Essaouira offering spa, pool and golf nearby.',
    shortDescription: 'Coastal spa resort in Essaouira.',
    images: ['https://example.com/essaouira.jpg'],
    thumbnail: 'https://example.com/essaouira_thumb.jpg',
    tags: ['resort', 'spa', 'beach'],
    status: 'published',
  },
  {
    name: 'Dar Ahlam (Skoura/Desert)',
    slug: 'dar-ahlam-skoura',
    category: 5,
    country: 'Morocco',
    city: 'Skoura',
    availability: true,
    address: 'Palmeraie, Skoura, near Ouarzazate',
    services: ['wifi', 'spa', 'restaurant', 'pool', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 980 },
      { type: 'single', bedType: 'single', price: 900 },
    ],
    rating: 4.9,
    basePrice: 900,
    breakfastIncluded: true,
    description:
      'Exclusive desert palace resort with villas, gardens, spa and desert excursions.',
    shortDescription: 'Luxury desert escape in Skoura.',
    images: ['https://example.com/darahlam.jpg'],
    thumbnail: 'https://example.com/darahlam_thumb.jpg',
    tags: ['desert', 'kasbah', 'luxury'],
    status: 'published',
  },
  {
    name: 'Riad Laaroussa',
    slug: 'riad-laaroussa-fes',
    category: 5,
    country: 'Morocco',
    city: 'Fès',
    availability: true,
    address: 'Medina, Fès el Bali, Fès',
    services: ['wifi', 'pool', 'spa', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 200 },
      { type: 'single', bedType: 'single', price: 160 },
    ],
    rating: 4.7,
    basePrice: 160,
    breakfastIncluded: true,
    description:
      'Elegant riad in Fès with rooftop terrace, traditional décor and spa facilities.',
    shortDescription: 'Stylish historic riad in Fès.',
    images: ['https://example.com/riandlaaroussa.jpg'],
    thumbnail: 'https://example.com/riandlaaroussa_thumb.jpg',
    tags: ['heritage', 'riad', 'spa'],
    status: 'published',
  },
  {
    name: 'Palais Medina & Spa',
    slug: 'palais-medina-spa-fes',
    category: 5,
    country: 'Morocco',
    city: 'Fès',
    availability: true,
    address: 'Avenue Allal El Fassi, Fès',
    services: ['wifi', 'pool', 'spa', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 168 },
      { type: 'single', bedType: 'single', price: 140 },
    ],
    rating: 4.6,
    basePrice: 140,
    breakfastIncluded: true,
    description:
      'Luxury spa hotel with large pool, terrace and modern amenities near Medina.',
    shortDescription: 'Upscale spa hotel in Fès.',
    images: ['https://example.com/palaismedina.jpg'],
    thumbnail: 'https://example.com/palaismedina_thumb.jpg',
    tags: ['spa', 'pool', 'luxury'],
    status: 'published',
  },
  {
    name: 'El Minzah Hotel',
    slug: 'el-minzah-tangier',
    category: 5,
    country: 'Morocco',
    city: 'Tangier',
    availability: true,
    address: 'Tangier city centre',
    services: ['wifi', 'spa', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 220 },
      { type: 'single', bedType: 'single', price: 180 },
    ],
    rating: 4.4,
    basePrice: 180,
    breakfastIncluded: true,
    description:
      'Historic Moorish‑colonial hotel in Tangier with rooftop pool and sea views.',
    shortDescription: 'Classic luxury in Tangier’s heart.',
    images: ['https://example.com/elminzah.jpg'],
    thumbnail: 'https://example.com/elminzah_thumb.jpg',
    tags: ['historic', 'luxury', 'sea_view'],
    status: 'published',
  },
  {
    name: 'Hotel Cecil',
    slug: 'hotel-cecil-tangier',
    category: 4,
    country: 'Morocco',
    city: 'Tangier',
    availability: true,
    address: 'Avenue Mohammed VI 11, Tangier',
    services: ['wifi', 'restaurant', 'parking'],
    rooms: [
      { type: 'double', bedType: 'double', price: 130 },
      { type: 'single', bedType: 'single', price: 100 },
    ],
    rating: 4.0,
    basePrice: 100,
    breakfastIncluded: false,
    description:
      'One of Tangier’s oldest hotels (opened 1865), currently undergoing refurbishment.',
    shortDescription: 'Historic Tangier landmark.',
    images: ['https://example.com/cecil.jpg'],
    thumbnail: 'https://example.com/cecil_thumb.jpg',
    tags: ['historic', 'budget', 'renaissance'],
    status: 'published',
  },
];









const destination = [
  {
    info_generale: {
      destination: 'nom de la destination',
      pays: [],
      villes: [],
      période: 'hiver été /ramadane shawal',
      type: 'omra&hajj, voyages organisé',
      sous_type:
        "cicuit, simple, à l'international/omra et voyage, omra simple",
      prix_basique: 'prix',
      nb_places: '',
      date_limite_reservation: 'date',
      status: 'valable, expiré',
      label: 'offre speciale ...',
      inclus: ['navette aéroport'],
    },
    trajet_aller: {
      depart: [
        {
          ville_depart: 'meknes',
          lieu_depart: "près de l'agence",
          date_depart: 'date',
          heure_depart: 'heure',
        },
        {
          ville_depart: 'fez',
          lieu_depart: 'gare routière',
          date_depart: 'date',
          heure_depart: 'heure',
        },
      ],
      //plusieurs arrivé??
      arrivé: [
        {
          ville_arrivé: 'fez',
          lieu_arrivé: 'hotel à chefchaouen',
          date_arrivé: 'date',
          heure_arrivé: 'heure',
        },
        {
          ville_arrivé: 'meknes',
          lieu_arrivé: "près de l'agence",
          date_arrivé: 'date',
          heure_arrivé: 'heure',
        },
      ],
      longueur_trajet: 'km',
      durré: 'heure',
      type_transport: ['vol', 'bus touristique'],
      //si vol:
      info_vol: {
        type_vol: 'direct, avec escales',
        //escales
        nb_escales: '0, 1, 2...',
        durré_escales: ['heure', 'heure'],
        aéroport_escales: ['', '', ''],

        compagnie: 'rayanair, RAM',
        class: ['business', 'economie'],
        bagages: 'kg',
      },
    },
    séjours: [
      {
        hebergement: [
          {
            ville: '',
            type: 'hotel, apart_hotel, auberge',
            nuité: 'jour',
            address: '',
            proximité: '5km, 10km, 20km',
            services: ['spa', 'salle de sport', 'piscine', 'restauration'],
            //chambre + lit
          },
          {},
        ],
        jours: [
          {
            activités: [
              {
                //jour de l'activité??
                date: 'date',
                durée: 'heure',
                est_gratuite: 'true, false',
                descrition: 'jetski à la plage',
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true/false',
                lieu: 'hotel, soiré, restaurant...',
              },
              déjeuner: {
                inclus: 'true/false',
                lieu: 'hotel, soiré, restaurant...',
              },
              dinner: {
                inclus: 'true/false',
                lieu: 'hotel, soiré, restaurant...',
              },
            },
          },
          {},
          {},
        ],
        trajet: {},
      },
      {},
      {},
    ],
  },
];
const destination1 = {
  info_generale: {
    destination: 'omra',
    pays: ['arabie saudite', 'turquie'],
    villes: ['jedda', 'mecca', 'medina', 'istambule', 'ankara'],
    période: 'rabi 2',
    type: 'omra&hajj',
    sous_type: 'omra et voyage',
    prix_basique: 77000,
    nb_places: 15,
    date_limite_reservation: '01/09/2025',
    status: 'valable, expiré',
    label: 'offre speciale ...',
    inclus: ['navette aéroport'],
  },
  étapes: [
    {
      trajet: {
        depart: [
          {
            ville_depart: 'fès',
            lieu_depart: 'aeroport Fès-Saiss',
            date_depart: '25/09/2025',
            heure_depart: '3h45',
          },
          {
            ville_depart: 'casablanca',
            lieu_depart: 'aeroport M5',
            date_depart: '25/09/2025',
            heure_depart: '2h05',
          },
        ],
        //plusieurs arrivé??
        arrivé: [
          {
            ville_arrivé: 'jedda',
            lieu_arrivé: 'aéroport jedda',
            date_arrivé: '25/09/2025',
            heure_arrivé: '10h45',
          },
          {
            ville_arrivé: 'jedda',
            lieu_arrivé: 'aéroport jedda',
            date_arrivé: '25/09/2025',
            heure_arrivé: '09:28',
          },
        ],
        longueur_trajet: ['....', '....'],
        durré: ['7h', '7:23'],
        type_transport: ['vol'],
        //si vol:
        info_vol: [
          {
            type_vol: 'direct',
            //escales
            nb_escales: 0,
            durré_escales: [],
            aéroport_escales: [],

            compagnie: 'RAM',
            class: ['economie'],
            bagages: '30kg',
          },
          {
            type_vol: 'direct',
            //escales
            nb_escales: 0,
            durré_escales: [],
            aéroport_escales: [],

            compagnie: 'RAM',
            class: ['economie'],
            bagages: '30kg',
          },
        ],
      },
      séjours: {
        hebergement: [
          {
            ville: '',
            type: 'hotel, apart_hotel, auberge',
            nuité: 'jour',
            address: '',
            proximité: '5km, 10km, 20km',
            services: ['spa', 'salle de sport', 'piscine', 'restauration'],
            //chambre + lit
          },
          {},
        ],
        jours: [
          {
            date: '25/09/2025',
            activités: [
              {
                durée: '2h',
                inclus: 'true',
                descrition:
                  "arrivé à l'hôtel à la mecque et distribution des chambres",
              },
              {
                durée: '',
                inclus: 'true',
                descrition: "repos à l'hotel",
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              dinner: {
                inclus: 'true',
                lieu: 'hotel',
              },
            },
          },
          {
            date: '26/09/2025',
            activités: [
              {
                durée: '',
                inclus: 'true',
                descrition: '',
              },
              {
                durée: '',
                inclus: 'true',
                descrition: '',
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true',
                lieu: 'avion',
              },
              déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              dinner: {
                inclus: 'true',
                lieu: 'hotel',
              },
            },
          },
        ],
      },
    },
    {
      trajet: {
        depart: [
          {
            ville_depart: 'mecca',
            lieu_depart: 'hotel',
            date_depart: '27/09/2025',
            heure_depart: '09h00',
          },
        ],
        arrivé: [
          {
            ville_arrivé: 'medina',
            lieu_arrivé: 'hotel medina',
            date_arrivé: '27/09/2025',
            heure_arrivé: '',
          },
        ],
        longueur_trajet: [''],
        durré: [''],
        type_transport: ['bus'], // si train possible donc info transport globale(vol, bus, train)
      },
      séjour: {
        hebergement: [
          {
            ville: '',
            type: 'hotel, apart_hotel, auberge',
            nuité: 'jour',
            address: '',
            proximité: '5km, 10km, 20km',
            services: ['spa', 'salle de sport', 'piscine', 'restauration'],
            //chambre + lit
          },
          {},
        ],
        jours: [
          {
            date: '25/09/2025',
            activités: [
              {
                durée: '2h',
                inclus: 'true',
                descrition:
                  "arrivé à l'hôtel à la mecque et distribution des chambres",
              },
              {
                durée: '',
                inclus: 'true',
                descrition: "repos à l'hotel",
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              dinner: {
                inclus: 'true',
                lieu: 'hotel',
              },
            },
          },
          {
            date: '26/09/2025',
            activités: [
              {
                durée: '',
                inclus: 'true',
                descrition: '',
              },
              {
                durée: '',
                inclus: 'true',
                descrition: '',
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true',
                lieu: 'avion',
              },
              déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              dinner: {
                inclus: 'true',
                lieu: 'hotel',
              },
            },
          },
        ],
      },
    },
    {
      trajet: {
        depart: [
          {
            //pays
            ville_depart: 'medina',
            lieu_depart: 'aeroport medina',
            date_depart: '30/09/2025',
            heure_depart: '',
          },
        ],
        arrivé: [
          {
            //pays:
            ville_arrivé: 'istambule',
            lieu_arrivé: 'hotel medina',
            date_arrivé: '30/09/2025',
            heure_arrivé: '',
          },
        ],
        longueur_trajet: [''],
        durré: [''],
        type_transport: ['vol'], // si train possible donc info transport globale(vol, bus, train)
        info_vol: [
          {
            type_vol: 'direct',
            //escales
            nb_escales: 0,
            durré_escales: [],
            aéroport_escales: [],

            compagnie: 'RAM',
            class: ['economie'],
            bagages: '30kg',
          },
          {
            type_vol: 'direct',
            //escales
            nb_escales: 0,
            durré_escales: [],
            aéroport_escales: [],

            compagnie: 'RAM',
            class: ['economie'],
            bagages: '30kg',
          },
        ],
      },
      séjour: {
        hebergement: [
          {
            ville: '',
            type: 'hotel, apart_hotel, auberge',
            nuité: 'jour',
            address: '',
            proximité: '5km, 10km, 20km',
            services: ['spa', 'salle de sport', 'piscine', 'restauration'],
            //chambre + lit
          },
          {},
        ],
        jours: [
          {
            date: '25/09/2025',
            activités: [
              {
                durée: '2h',
                inclus: 'true',
                descrition:
                  "arrivé à l'hôtel à la mecque et distribution des chambres",
              },
              {
                durée: '',
                inclus: 'true',
                descrition: "repos à l'hotel",
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              dinner: {
                inclus: 'true',
                lieu: 'hotel',
              },
            },
          },
          {
            date: '26/09/2025',
            activités: [
              {
                durée: '',
                inclus: 'true',
                descrition: '',
              },
              {
                durée: '',
                inclus: 'true',
                descrition: '',
              },
            ],
            repas: {
              petit_déjeuner: {
                inclus: 'true',
                lieu: 'avion',
              },
              déjeuner: {
                inclus: 'true',
                lieu: 'hotel',
              },
              dinner: {
                inclus: 'true',
                lieu: 'hotel',
              },
            },
          },
        ],
      },
    },
  ],
};
const destinationCollection = [
  {
    info_generale: {
      destination: 'nom de la destination',
      pays: [],
      villes: [],
      période: 'hiver été /ramadane shawal',
      type: 'omra&hajj, voyages organisé',
      sous_type:
        "cicuit, simple, à l'international/omra et détour touristique, omra simple, hajj",
      prix_basique: '',
      nb_places: '',
      date_limite_reservation: 'date',
      status: 'valable/expiré',
      label: 'offre speciale ...',
      inclus: ['navette aéroport'],
    },
    étapes: [
      {
        trajet: {
          depart: [
            {
              ville_depart: '',
              lieu_depart: '',
              date_depart: '',
              heure_depart: '',
            },
            {},
          ],
          arrivé: [
            {
              ville_arrivé: 'jedda',
              lieu_arrivé: 'aéroport jedda',
              date_arrivé: '25/09/2025',
              heure_arrivé: '10h45',
            },
            {},
          ],
          longueur_trajet: [,],
          durré: [,],
          type_transport: ['vol', 'bus', '...'],
          //si vol:
          info_vol: [
            {
              type_vol: 'direct',
              //escales
              nb_escales: 0,
              durré_escales: [],
              aéroport_escales: [],

              compagnie: '',
              class: [''],
              bagages: '',
            },
            {},
          ],
        },
        séjour: {
          hebergement: [
            {
              ville: '',
              type: 'hotel, apart_hotel, auberge',
              nuité: 'jour',
              address: '',
              proximité: '5km, 10km, 20km',
              services: ['spa', 'salle de sport', 'piscine', 'restauration'],
            },
            {},
          ],
          jours: [
            {
              date: '',
              activités: [
                {
                  durée: '',
                  inclus: '',
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
            {},
            {},
          ],
        },
      },
      {},
      {},
    ],
  },
];
const destinationCollectionSchema = [
  {
    info_generale: {
      destination: '',
      pays: [],
      villes: [],
      période: '',
      type: '',
      sous_type: '',
      prix_basique: '',
      nb_places: '',
      date_limite_reservation: '',
      status: '',
      label: '',
      inclus: [],
    },
    étapes: [
      {
        trajet: {
          depart: [
            {
              ville_depart: '',
              lieu_depart: '',
              date_depart: '',
              heure_depart: '',
            },
            {},
          ],
          arrivé: [
            {
              ville_arrivé: '',
              lieu_arrivé: '',
              date_arrivé: '',
              heure_arrivé: '',
            },
            {},
          ],
          longueur_trajet: [,],
          durée: [,],
          type_transport: [,],
          info_vol: [
            {
              type_vol: '',
              nb_escales: 0,
              durré_escales: [],
              aéroport_escales: [],
              compagnie: '',
              class: [],
              bagages: '',
            },
            {},
          ],
        },
        séjour: {
          hebergement: [
            {
              ville: '',
              type: '',
              nuité: '', //
              category: '', //\\
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
            {},
          ],
          jours: [
            {
              date: '',
              activités: [
                {
                  durée: '',
                  inclus: '',
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
            {},
            {},
          ],
        },
      },
      {},
      {},
    ],
  },
];

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
