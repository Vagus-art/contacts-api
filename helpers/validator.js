const { body, param, validationResult } = require("express-validator");

//VALIDACION DE PARAMETRO OFFSET EN GET (contacts)
const contactOffsetValidationRules = () => {
  return [
    param("offset")
      .isInt()
      .withMessage("OFFSET must be INT")
  ];
};

//VALIDACION DE PARAMETROS BUSQUEDA (contacts)
const contactSearchValidationRules = () => {
  return [
    param("name")
      .trim()
      .escape()
  ];
};

//VALIDACION DE FORMULARIO POST/INSERT (contacts)
const contactValidationRules = () => {
  return [
    body("name")
      .isLength({ min: 5 })
      .trim()
      .escape()
      .withMessage("Name must be at least 5 characters long..."),
    body("phone")
      .trim()
      .escape()
      .isInt()
      .isLength({ min: 5 })
      .withMessage("Phone number must be 5 digits long and only numbers...")
  ];
};

//VALIDACION DE FORMULARIO PUT/UPDATE (contacts)
const updateContactValidationRules = () => {
  return [
    body("name")
      .isLength({ min: 5 })
      .trim()
      .escape()
      .withMessage("Name must be at least 5 characters long..."),
    body("phone")
      .isInt()
      .isLength({ min: 5 })
      .trim()
      .escape()
      .withMessage("Phone number must be 5 digits long and only numbers..."),
    body("id")
      .isInt()
      .trim()
      .escape()
      .withMessage("Identifier is not valid")
  ];
};

//VALIDACION DE PARAMETROS DELETE (contacts)
const deleteContactValidationRules = () => {
  return [
    param("id")
      .isInt()
      .trim()
      .escape()
      .withMessage("ID must be INT")
  ];
};

//VALIDACION DE FORMULARIO DELETE POR ARREGLO (contacts)
const deleteContactArrayValidationRules = () => {
  return [
    body("id")
      .isArray()
      .withMessage("ID must be an array of INT"),
    body("id.*")
      .isInt()
      .withMessage("ID must be an array of INT")
  ];
};

//MIDDLEWARE DE VALIDACION, EN CASO DE HABER UN ERROR CORTA EL REQUEST ANTES DE INTERACTUAR CON LA BASE DE DATOS, Y LO DEVUELVE EN UN RESPONSE
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
  contactOffsetValidationRules,
  contactSearchValidationRules,
  contactValidationRules,
  updateContactValidationRules,
  deleteContactValidationRules,
  deleteContactArrayValidationRules,
  validate
};
