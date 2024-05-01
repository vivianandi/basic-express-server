'use strict';

function handleError(error, req, res, next) {
  let errorObject = {
    status: 500,
    error: error.message || 'Server Error',
    path: req.path
  };

  res.status(500).json(errorObject);
}

module.exports = handleError;