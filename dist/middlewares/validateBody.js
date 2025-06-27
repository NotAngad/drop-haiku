'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const validateBody = schema => {
  return (req, res, next) => {
    const payload = req?.body;
    const { error } = schema.validate(payload, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: true,
        message: 'Validation failed',
        details: error.details.map(err => err.message),
      });
    }
    next();
  };
};
exports.default = validateBody;
