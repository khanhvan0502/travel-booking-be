const trimObject = (obj) => {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] = typeof value === "string" ? value.trim() : value;
  }
  return result;
};

const trimRequest = (req, _, next) => {
  if (req.body) {
    req.body = trimObject(req.body);
  }

  if (req.query) {
    req.query = trimObject(req.query);
  }

  if (req.params) {
    req.params = trimObject(req.params);
  }
  next();
};

module.exports = trimRequest;
