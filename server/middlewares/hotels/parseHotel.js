import { json } from 'express';

const parseHotel = async (req, res, next) => {
  try {
    req.filters = req.query.filter ? JSON.parse(req.query.filter) : {};
  } catch {
    res.status(400).json({
      error: 'invalid filter json',
    });
  }
  if (req.filter.q) {
    delete req.filters.q;
  }
  try {
    if (req.query.sort) {
      const [field, order] = JSON.parse(req.query.sort);
      req.sortBy = { [field]: order === 'ASC' ? 1 : -1 };
    } else {
      req.sortBy = {};
    }
  } catch {
    res.status(400).json({
      error: 'invalid sort list',
    });
  }

  try {
    req.pagination = req.query.range
      ? {
          skip: JSON.parse(req.query.range)[0],
          limit:
            JSON.parse(req.query.range)[1] + 1 - JSON.parse(req.query.range)[0],
        }
      : {
          skip: 0,
          limit: 5,
        };
  } catch {
    res.status(400).json({
      error: 'invalid range list',
    });
  }

  Object.entries(req.query).forEach(([key, value]) => {
    if (['perPage', 'sort', 'filter', 'range'].includes(key)) return;
    if (
      ['category', 'rating', 'basePrice', 'basePrice', 'proximity'].includes(
        key
      )
    ) {
      req.filters[key] = Number(value);
    } else if (['availability', 'breakfastIncluded'].includes(key)) {
      req.filters[key] = value === 'true';
    } else if (key === 'services') {
      req.filters[key] = value.split(',').map((s) => s.trim());
    } else if (
      [
        'name',
        'slug',
        'country',
        'city',
        'address',
        'description',
        'shortDescription',
      ].includes(key)
    ) {
      req.filters[key] = value;
    }
  });
  if (
    Object.keys(req.query).includes('roomType') &&
    Object.keys(req.query).includes('bedType')
  ) {
    req.filters.rooms = [
      {
        type: req.query.roomType,
        price: Number(req.query.basePrice),
        bedType: req.query.bedType,
      },
    ];
    delete req.query.roomType;
    delete req.query.bedType;
  }
  next();
};

export default parseHotel;
