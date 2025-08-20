const toMongoFilters = (req, res, next) => {
  Object.entries(req.filters).forEach(([key, value]) => {
    if (['name', 'country', 'city', 'tags'].includes(key)) {
      req.filters[key] = { $regex: value, $options: 'i' };
    } else if (key === 'rooms') {
      if (req.filters.rooms.prix) {
        req.filters.rooms = {
          $elemMatch: {
            ...req.filters.rooms,
            prix: { $lte: req.filters.rooms.prix },
          },
        };
      } else {
        req.filters.rooms = {
          $elemMatch: {
            ...req.filters.rooms,
          },
        };
      }
    } else if (key === 'services') {
      req.filters.services = { $all: value };
    } else if (key === 'proximity') {
      if (value <= 5) {
        req.filters.proximity= { $lte: value};
      } else if (value <= 10) {
        req.filters.proximity= { $gt: 5 ,$lte: value};
      }else if (value <= 15) {
        req.filters.proximity = { $gt: 10, $lte: value };
      }
    } else if (['note', 'rating'].includes(key)) {
      console.log('type de note est ', typeof value);
      req.filters[key] = { $lt: value + 1, $gte: value };
    }
  });
  console.log('turned to acceptable mongoose', req.filters);
  console.log(req.filters.proximity);
  next();
};
export default toMongoFilters;
