import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/** Room preference */
const RoomPreferenceSchema = new Schema({
  typeChambre: { type: String },
  typeLit: { type: String },
  prix: { type: Number },
  roomID: { type: Schema.Types.ObjectId, ref: 'Hebergement' },
});

/** Transport preference */
const TransportPreferenceSchema = new Schema({
  type: { type: String }, // bus, avion, etc
  price: { type: Number },
  trajetID: { type: Schema.Types.ObjectId, ref: 'Trajet' },
});

/** General preferences */
const PreferencesSchema = new Schema({
  hebergement: {
    room: RoomPreferenceSchema,
  },
  transport: [TransportPreferenceSchema],
  generale: { type: String }, // sickness, age, etc
});

/** Counter for unique reservationID */
const CounterSchema = new Schema({
  date: { type: String, unique: true }, // YYYYMMDD
  seq: { type: Number, default: 0 },
});
const Counter = model('Counter', CounterSchema);

/** Reservation schema */
const ReservationSchema = new Schema(
  {
    reservationID: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      genre: { type: String, required: true, enum: ['femme', 'homme'] },
      date_depart: Date,
    },
    type_reservation: {
      type: String,
      enum: ['hebergement', 'voyage', 'omra_hajj'],
      required: true,
    },
    truc_reserver: { type: Schema.Types.ObjectId, required: true },
    préference_user: PreferencesSchema,
    nb_personne: { type: Number, default: 1 },
    modePaiement: String,
    montant: { type: Number, required: true },
    montant_unitaire: { type: Number, required: true },
    date_reservation: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['confirmée', 'en attente', 'annulée'],
      default: 'en attente',
    },
  },
  { timestamps: true }
);

ReservationSchema.pre('save', async function (next) {
  if (!this.reservationID) {
    // Find the **highest serial number used so far**
    const lastReservation = await this.constructor
      .findOne({ reservationID: { $regex: /^RES-/ } })
      .sort({ reservationID: -1 }); // descending

    let nextSerial = 1;
    if (lastReservation) {
      const match = lastReservation.reservationID.match(/RES-(\d{3})$/);
      if (match) nextSerial = parseInt(match[1], 10) + 1;
    }

    this.reservationID = `RES-${String(nextSerial).padStart(3, '0')}`;
  }
  next();
});

export default model('Reservation', ReservationSchema);

/*
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const RoomPreferenceSchema = new Schema({
  typeChambre: { type: String },
  typeLit: { type: String },
  prix: { type: Number },
  roomID: { type: Schema.Types.ObjectId, ref: 'Hebergement' },
});

const TransportPreferenceSchema = new Schema({
  type: { type: String }, // bus, avion, etc
  price: { type: Number },
  trajetID: { type: Schema.Types.ObjectId, ref: 'Trajet' },
});

const PreferencesSchema = new Schema({
  hebergement: {
    room: RoomPreferenceSchema,
  },
  transport: [TransportPreferenceSchema],
  generale: { type: String }, // sickness, age, etc
});

const ReservationSchema = new Schema(
  {
    reservationID: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      genre: { type: String,  required: true, enum: ['femme', 'homme'] },
    },

    type_reservation: {
      type: String,
      enum: ['hebergement', 'voyage', 'omra_hajj'],
      required: true,
    },
    truc_reserver: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    préference_user: PreferencesSchema,
    nb_personne: { type: Number, default: 1 },
    modePaiement: String,
    montant: { type: Number, required: true },
    montant_unitaire: { type: Number, required: true },
    date_reservation: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['confirmée', 'en attente', 'annulée'],
      default: 'en attente',
    },
  },
  { timestamps: true }
);

ReservationSchema.pre('save', async function (next) {
  if (!this.reservationID) {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

    // Count how many reservations exist today
    const countToday = await this.constructor.countDocuments({
      createdAt: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    });

    const serial = String(countToday + 1).padStart(3, '0'); // e.g., 001, 002
    this.reservationID = `RES-${serial}`;
  }
  next();
});

export default model('Reservation', ReservationSchema);


*/
