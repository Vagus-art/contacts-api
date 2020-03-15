const { body, param, validationResult } = require("express-validator");

const contactValidationRules = () => {
  return [
    // name must be 5 chars long
    body("name")
      .isLength({ min: 5 })
      .trim()
      .escape()
      .withMessage("Name must be at least 5 characters long..."),
    // phone must be 5 chars long and int
    body("phone")
      .trim()
      .escape()
      .isInt()
      .isLength({ min: 5 })
      .withMessage("Phone number must be 5 digits long and only numbers...")
  ];
};

const updateContactValidationRules = () => {
  return [
    // name must be 5 chars long
    body("name")
      .isLength({ min: 5 })
      .trim()
      .escape()
      .withMessage("Name must be at least 5 characters long..."),
    // phone must be 5 chars long and int
    body("phone")
      .isInt()
      .isLength({ min: 5 })
      .trim()
      .escape()
      .withMessage("Phone number must be 5 digits long and only numbers..."),
    param("id")
      .isInt()
      .trim()
      .escape()
      .withMessage("Identifier is not valid")
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
  updateContactValidationRules,
  validate
};
