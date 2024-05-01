'use strict';

function validateName(req, res, next) {
  if (!req.query.name) {
    res.status(500).json({ error: "Name parameter is required" });
  } else {
    next();
  }
}

module.exports = validateName;