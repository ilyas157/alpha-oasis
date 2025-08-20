import Destination from '../models/Destinations.js';

// get all the destinations
export const getDestinations = async (req, res) => {
  try {
    let sort = {};
    if (req.query.sort) {
      const [field, order] = JSON.parse(req.query.sort);
      sort[field] = order === 'ASC' ? 1 : -1;
    }
    const destinations = await Destination.find().sort(sort);
    if (!destinations)
      res.status(404).json({ error: 'destinations not found' });
    const data = destinations.map((d) => ({
      ...d.toObject(),
      id: d._id.toString(),
    }));
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set(
      'Content-Range',
      `destinations 0-${data.length - 1}/${data.length}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get destinations' });
  }
};

// get destination by id
export const getDestinationsById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) res.status(404).json({ error: 'destinations not found' });
    const data = { ...destination.toObject(), id: destination._id.toString() };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get this destination' });
  }
};

//create destination

export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    const data = { ...destination.toObject(), id: destination._id.toString() };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create this destination' });
  }
};

//delete destination by id

export const deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) res.status(404).json({ error: 'destination not found' });
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete this destination' });
  }
};

//update destination by id
export const updateDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination) res.json({ error: 'updating not possible' });
    const data = {
      ...destination.toObject(),
      id: destination._id.toString(),
    };
    res.status(201).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update destination' });
  }
};
