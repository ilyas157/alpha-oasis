const toMongooseFilters = (req, res, next) => {
  let room = {
    matchAll: {},
  };
  console.log(Object.entries(req.filters));
  Object.entries(req.filters).forEach(([key, value]) => {
    if (
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
      req.filters[key] = { $regex: value, $options: 'i' };
    } else if (key === 'basePrice') {
      req.filters.basePrice = { $lte: value };
    } else if (key === 'services') {
      req.filters.services = { $all: value };
    }
  });
 
  next();
};

export default toMongooseFilters;
