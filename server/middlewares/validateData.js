export const validateFilters = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.filters, {
    convert: true,
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    return res.status(401).json({ error: error.details.map((d) => d.message) });
  }
  req.filters = value;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const filters = req.query;
  if (req.query.sort) {
    const [field, order] = JSON.parse(req.query.sort);
    req.sortBy = { [field]: order === 'ASC' ? 1 : -1 };
    delete filters.sort;
  } else {
    req.sortBy = {};
  }
  req.pagination = req.query.range
    ? {
        skip: JSON.parse(req.query.range)[0],
        limit:
          JSON.parse(req.query.range)[1] + 1 - JSON.parse(req.query.range)[0],
      }
    : {
        skip: 0,
        limit: 10005,
      };
  delete filters.range;
  if (req.query.services) {
    filters.services = req.query.services.split(',');
  }
  console.log('initial query', filters);
  const { error, value } = schema.validate(filters, {
    convert: true,
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    return res.status(401).json({ error: error.details.map((d) => d.message) });
  }
  req.filters = value;
  console.log('converted query', value);
  next();
};

export const validateVoyageQuery = (schema) => (req, res, next) => {
  const filters = req.query;
  if (req.query.sort) {
    const [field, order] = JSON.parse(req.query.sort);
    req.sortBy = { ["info_generale." + field]: order === 'ASC' ? 1 : -1 };
    console.log("how",req.sortBy)
    delete filters.sort;
  } else {
    req.sortBy = {};
  }
  req.pagination = req.query.range
    ? {
        skip: JSON.parse(req.query.range)[0],
        limit:
          JSON.parse(req.query.range)[1] + 1 - JSON.parse(req.query.range)[0],
      }
    : {
        skip: 0,
        limit: 10005,
      };
  delete filters.range;
  if (req.query.pays) {
    filters.pays = req.query.pays.split(',');
  }
  if (req.query.villes) {
    filters.villes = req.query.villes.split(',');
  }
  console.log('initial query', filters);
  const { error, value } = schema.validate(filters, {
    convert: true,
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    return res.status(401).json({ error: error.details.map((d) => d.message) });
  }
  req.filters = value;
  console.log('converted query', value);
  next();
};

export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    convert: true,
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    return res.status(401).json({ error: error.details.map((d) => d.message) });
  }
  const toflatten = value ? value : req.body;
  req.body = value ? value : req.body;//flatten(toflatten);
  console.log(req.body)
  next();
};


export const flatten = (obj, prefix = '', result = {}) => {
  for (const key in obj) {
    if (!Object.hasOwn(obj, key)) continue;

    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
    ) {
      flatten(value, prefixedKey, result); // Recurse into object
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        flatten(item, `${prefixedKey}.${index}`, result);
      });
    } else {
      result[prefixedKey] = value; // Assign flat key-value
    }
  }

  return result;
};