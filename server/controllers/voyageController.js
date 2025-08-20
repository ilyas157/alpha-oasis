import Voyage from '../models/Voyages.js';
import formatDocument from '../utils/fomatDoc.js';

export const getVoyage = async (req, res) => {
  try {
    const { pagination, sortBy, filters } = req;
    const limit = pagination.limit;
    const skip = pagination.skip;
    console.log('juste avant le find', JSON.stringify(req.sortBy));
    const voyages = await Voyage.find(filters)
      .populate('etapes.séjour.hebergement')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    const total = await Voyage.countDocuments(filters);
    if (!voyages) return res.status(404).json({ error: 'voyages not found' });
    const data = voyages.map(formatDocument);
    res.status(200).json({ voyages: data, totale: total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Voyage' });
  }
};
export const getVoyageBasic = async (req, res) => {
  try {
    const { pagination, sortBy, filters } = req;
    const limit = pagination.limit;
    const skip = pagination.skip;
    console.log('limit is :', limit, 'skip is : ', skip);
    console.log('Fetching voyages (basic info only)');

    const voyages = await Voyage.find(filters, {
      _id: 1,
      'info_generale.label': 1,

      'info_generale.destination': 1,
      'info_generale.durée': 1,
      'info_generale.prix_basique': 1,
      'info_generale.note': 1,
      'info_generale.status': 1,
      'info_generale.type': 1,
      'info_generale.sous_type': 1,
      'info_generale.nombreReservations': 1,
    })
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    const total = await Voyage.countDocuments();

    if (!voyages) {
      return res.status(404).json({ error: 'Voyages not found' });
    }

    // Optional: flatten `info_generale` into top-level keys
    const data = voyages.map((v) => ({
      id: v._id,
      title: v.info_generale?.label,
      destination: v.info_generale?.destination,
      duration: v.info_generale?.durée,
      price: v.info_generale?.prix_basique,
      status: v.info_generale?.status,
      type: v.info_generale?.type,
      sous_type: v.info_generale?.sous_type,
      bookings: v.info_generale?.nombreReservations,
      image:
        'https://images.unsplash.com/photo-1600289730889-17f9ad4c38f0?q=80&',
    }));
    res.status(200).json({ voyages: data, totale: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getVoyageByID = async (req, res) => {
  try {
    const voyage = await Voyage.findById(req.params.id).populate(
      'etapes.séjour.hebergement'
    );
    if (!voyage) return res.status(404).json({ error: 'voyage not found' });
    const data = formatDocument(voyage);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getVoyageByIDNonP = async (req, res) => {
  try {
    const voyage = await Voyage.findById(req.params.id);
    if (!voyage) return res.status(404).json({ error: 'voyage not found' });
    const data = formatDocument(voyage);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createVoyage = async (req, res) => {
  try {
    const created = await Voyage.create(req.body);
    if (!created) return res.status(400).json({ error: 'Voyage not created' });
    const data = formatDocument(created);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteVoyage = async (req, res) => {
  try {
    const deleted = await Voyage.findByIdAndDelete(req.params.id);
    const data = formatDocument(deleted);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const unflatten = (obj) => {
  const result = {};

  for (const flatKey in obj) {
    const keys = flatKey.split('.');
    let current = result;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = obj[flatKey];
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    });
  }

  return result;
};

export const updateVoyage = async (req, res) => {
  try {
    console.log(req.body);
    const updated = await Voyage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: 'voyage not found' });
    const data = formatDocument(updated);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const deleted = await Voyage.deleteMany();
    res.status(200).json({ message: 'everything is deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
