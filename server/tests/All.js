import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  sujet: String,
  message: String,
  status: { type: String, enum: ['lu', 'non_lu'], default: 'non_lu' },
  createdAt: { type: Date, default: Date.now },
});

// Utilisateur avec likes et voyages enregistrés
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Programme / activités journalières
const ProgramSchema = new mongoose.Schema({
  jour: Number,
  titre: String,
  description: String,
  activites: [
    {
      ordre: Number,
      optionel: Boolean,
      titre: String,
      heure: String,
      description: String,
      prix: Number,
    }
  ],
});

// Tarification complète avec promos et options
const TarificationSchema = new mongoose.Schema({
  chambres: {
    simple: { prix: Number },
    double: { prix: Number },
    triple: { prix: Number },
    quadruple: { prix: Number },
  },
  inclus: [String],
  non_inclus: [String],
  options: [
    {
      id: String,
      label: String,
      description: String,
      prix: Number,
      obligatoire: Boolean,
      type: String,
      multiple: Boolean,
    }
  ],
  promotions: [
    {
      type: { type: String, enum: ["early_booking", "last_minute"] },
      active: Boolean,
      description: String,
      prix_promo_par_chambre: mongoose.Schema.Types.Mixed,
      date_limite: Date,
      date_depart_max: Date,
    }
  ],
});

// Transport avec mode (vol, bus, train, ...)
const TransportSchema = new mongoose.Schema({
  mode: { type: String, enum: ['vol', 'bus', 'train', 'bateau'], required: true },
  allerSimple: Boolean,
  allerRetour: Boolean,
  direct: Boolean,
  escales: Boolean,
  nbEscales: Number,
  duree: String,
  aeroportDepart: String,
  aeroportArrive: String,
  bagages: {
    aller: String,
    retour: String,
  },
  prix: Number,
  depart: String,
  arrive: String,
  compagnie: String,
});

// Logement avec condition sur catégorie et types chambres
const LogementSchema = new mongoose.Schema({
  type: { type: String, enum: ['hotel', 'auberge', 'appartement', 'maison', 'camping'], required: true },
  categorie: { 
    type: String, 
    enum: ['1*','2*','3*','4*','5*'], 
    required: function() { return this.type === 'hotel'; } 
  },
  details: String, // infos libres pour autres types que hôtel
  meals: {
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
  },
  piscine: Boolean,
  proximite: String,
  wifiGratuit: Boolean,
  climatisation: Boolean,
  typesChambres: [{ type: String }], // ex: ["simple", "double", "suite"]
});

// Voyage / Destination complet
const VoyageSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  country: String,
  lieu_depart: String,
  lieu_arrive: String,
  date_depart: Date,
  heure_depart: String,
  date_retour: Date,
  duree: Number,
  place: Number,
  place_restante: Number,
  date_limite_reservation: Date,
  transfert: Boolean,
  period: String,
  label: String,
  document: [String],
  logement: LogementSchema,
  transport: TransportSchema,
  program: [ProgramSchema],
  tarification: TarificationSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Réservation avec status
const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  voyageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voyage', required: true },
  dateReservation: { type: Date, default: Date.now },
  chambre: String,
  optionsChoisies: [String],
  nombrePersonnes: Number,
  prixTotal: Number,
  status: { type: String, enum: ['en_attente', 'valide', 'annule'], default: 'en_attente' },
  dateLimitePaiement: Date,
  paiementEffectue: Boolean,
});

// Export des modèles
export const Message = mongoose.model('Message', MessageSchema);
export const User = mongoose.model('User', UserSchema);
export const Voyage = mongoose.model('Voyage', VoyageSchema);
export const Reservation = mongoose.model('Reservation', ReservationSchema);





const filters = {
  price: { $lte: 500 },
  destination: { $regex: "marr", $options: "i" },
  availability: true,
  status: "archived",// this is an enum in the model;
  services: ["gym", "spa"] // this is a list of stings from an enum too 
}