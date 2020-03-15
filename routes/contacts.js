const { Router } = require("express");
const router = Router();
const { UNIQUE_VIOLATION } = require("pg-error-constants");

//conexion a base de datos por variables de entorno
const db = require("../database");

//para validar post y put
const {
  contactValidationRules,
  updateContactValidationRules,
  validate
} = require("../helpers/validator");

//para validar param de id
const { param } = require("express-validator");

//OBTENER TODOS LOS CONTACTOS
router.get("/", (request, response) => {
  return db.query("SELECT * FROM contacts", (err, res) => {
    if (err) {
      response.json({ errors: err });
    }
    const query = res.rows;
    response.json({ data: query, errors: err });
  });
});

//OBTENER CONTACTO POR ID
router.get("/:id", [param("id").isInt()], validate, (request, response) => {
  const { id } = request.params;
  return db.query(`SELECT * FROM contacts WHERE id=${id}`, (err, res) => {
    if (err) {
      response.json({ errors: err });
    }
    const query = res.rows;
    response.json({ data: query, errors: err });
  });
});

//CREAR NUEVO CONTACTO
router.post("/", contactValidationRules(), validate, (request, response) => {
  const { name, phone } = request.body;
  db.query(
    `INSERT INTO contacts (name,phone) VALUES ('${name}',${phone})`,
    (err, res) => {
      if (err) {
        if (
          err.code == UNIQUE_VIOLATION &&
          err.constraint == "contacts_phone_key"
        ) {
          response
            .status(400)
            .json({
              errors: [{ name: "That phone already exist in our databases..." }]
            });
        } else {
          response
            .status(400)
            .json({
              errors: [{ name: "There has been an error with your form..." }]
            });
        }
      } else {
        const query = res;
        response.status(200).json({ message: query });
      }
    }
  );
});

//ACTUALIZAR CONTACTO (POR ID)
router.put(
  "/:id",
  updateContactValidationRules(),
  validate,
  (request, response) => {
    const { id } = request.params;
    const { name, phone } = request.body;
    db.query(
      `UPDATE contacts SET name='${name}',phone=${phone} WHERE id=${id}`,
      (err, res) => {
        if (err) {
          if (
            err.code == UNIQUE_VIOLATION &&
            err.constraint == "contacts_phone_key"
          ) {
            response
              .status(400)
              .json({
                errors: [
                  { name: "That phone already exist in our databases..." }
                ]
              });
          } else {
            response
              .status(400)
              .json({
                errors: [{ name: "There has been an error with your form..." }]
              });
          }
        } else {
          const query = res;
          response.status(200).json({ message: query });
        }
      }
    );
  }
);

//ELIMINAR CONTACTO POR ID
router.delete("/:id", [param("id").isInt()], validate, (request, response) => {
    const { id } = request.params;
    return db.query(`DELETE FROM contacts WHERE id=${id}`, (err, res) => {
      if (err) {
        response.json({ errors: err });
      }
      const query = res.rows;
      response.json({ data: query, errors: err });
    });
  });

module.exports = router;
