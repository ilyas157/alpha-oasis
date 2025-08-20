import mongoose from "mongoose";

const DestinationScheme = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    country : String,
    location: String,
    duration: Number,
    price: Number,
    herbergement: Boolean,
    petit_dej: Boolean,
    Transfert: Boolean,
    nb_personnes: Number,
    type: { type: String, required: true },
    src: String,
});

const Destination = mongoose.model('Destination', DestinationScheme);

export default Destination;