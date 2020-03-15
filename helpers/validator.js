const { body, validationResult } = require("express-validator");

const contactValidationRules = () => {
  return [
    // username must be an email
    body("name").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body("phone")
      .isInt()
      .isLength({ min: 5 })
  ];
};

const validate = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return response.json({
    errors: extractedErrors
  });
};

module.exports = {
  contactValidationRules,
  validate
};
