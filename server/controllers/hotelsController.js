import { Router } from 'express';
import Hotel, {hotels} from '../models/Hotels.js';




export const getHotels = async (req, res) => {
  try {
    const { query, pagination, sortBy, filters } = req;
    const limit = pagination.limit;
    const skip = pagination.skip;
    const hotels = await Hotel.find(filters)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    const total = await Hotel.countDocuments(req.filters);
    if (!hotels) res.status(404).json({ error: 'Hotels not found' });
    const data = hotels.map((d) => ({
      ...d.toObject(),
      id: d._id.toString(),
    }));
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set(
      'Content-Range',
      `hotels ${skip}-${skip + data.length - 1}/${total}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

export const getHotelsById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) res.status(404).json({ error: 'Hotel not found' });
    const data = { ...hotel.toObject(), id: hotel._id.toString() };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
};

export const createHotel = async (req, res) => {
  try {
    const created = await Hotel.create(req.body);
    if (!created) res.status(400).json({ error: "Can't create this Hotel" });

    const data = { ...created.toObject(), id: created._id.toString() };

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create hotel' });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) res.status(400).json({ error: "Can't update this Hotel" });
    const data = { ...updated.toObject(), id: updated._id.toString() };

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Hotel' });
  }
};


export const deleteAll = async (req, res) => {
  try {
    const deleted = await Hotel.deleteMany();
    res.status(200).json({ message: "everything is deleted" });
  } catch (error) {
    res.status(500).json({error : "failed to delete all"})
  }
}

export const seedHotels = async (req, res) => {
  try {
    const data = await Hotel.insertMany(hotels);
    res.status(200).json({ message: "everything is created" });
  } catch (error) {
    res.status(500).json({error : "failed to seed data"})
  }
}