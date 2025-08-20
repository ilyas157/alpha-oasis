const formatDocument = (doc) => {
  const obj = doc.toObject();
  const data = { id: obj._id, ...obj  };
  delete data._id;
  delete data.__v;
  return data;
};

export default formatDocument;
