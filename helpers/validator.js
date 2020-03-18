const { body, param, validationResult } = require("express-validator");

//VALIDACION DE ID
//PARAM
const idParamValidationRules = () => {
  return [
    param("id")
      .isInt()
      .trim()
      .escape()
      .withMessage("ID must be INT")
  ];
};
//BODY
const idBodyValidationRules = () => {
  return [
    body("id")
      .isInt()
      .trim()
      .escape()
      .withMessage("ID must be INT")
  ];
};

//VALIDACION DE FORMULARIO POST/INSERT (contacts)
const contactValidationRules = () => {
  return [
    body("name")
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters long...")
      .isString()
      .notEmpty(),

    body("phone")
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Phone number must be 5 digits long and only numbers...")
      .isInt()
      .notEmpty()
  ];
};

//VALIDACION DE PARAMETRO ID EN GET (contacts)
const contactIdValidationRules = () => {
  return idParamValidationRules();
};

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

//VALIDACION DE FORMULARIO PUT/UPDATE (contacts)
const updateContactValidationRules = () => {
  return [
    ...contactIdValidationRules(),
    ...idBodyValidationRules()
  ];
};

//VALIDACION DE PARAMETROS DELETE (contacts)
const deleteContactValidationRules = () => {
  return idParamValidationRules();
};

//VALIDACION DE FORMULARIO DELETE POR ARREGLO (contacts)
const deleteContactArrayValidationRules = () => {
  return [
    ...idBodyValidationRules(),
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
  errors
    .array({ onlyFirstError: true })
    .map(err => extractedErrors.push({ [err.param]: err.msg }));

  return response.status(400).json({
    errors: extractedErrors,
    success: false
  });
};

module.exports = {
  contactIdValidationRules,
  contactOffsetValidationRules,
  contactSearchValidationRules,
  contactValidationRules,
  updateContactValidationRules,
  deleteContactValidationRules,
  deleteContactArrayValidationRules,
  validate
};
