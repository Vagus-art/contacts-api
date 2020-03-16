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

//response generico
const { queryResponse } = require("../helpers/");

//para validar param de id
const { param, body } = require("express-validator");

//OBTENER TODOS LOS CONTACTOS
router.get("/", (request, response) => {
  try {
    db.query("SELECT * FROM contacts LIMIT 10", (err, res) => {
      if (err) {
        response.json({ errors: err });
      }
      queryResponse(res, response);
    });
  } catch (err) {
    response.json({ errors: err });
  }
});

//OBTENER CONTACTO POR ID
router.get("/:id", [param("id").isInt()], validate, (request, response) => {
  try {
    const { id } = request.params;
    db.query(`SELECT * FROM contacts WHERE id=${id}`, (err, res) => {
      if (err) {
        response.json({ errors: err });
      }
      queryResponse(res, response);
    });
  } catch (err) {
    response.json({ errors: err });
  }
});

//BUSQUEDA
router.get(
  "/search/:name",
  [
    param("name")
      .trim()
      .escape()
  ],
  (request, response) => {
    try {
      const { name } = request.params;
      db.query(
        `SELECT * FROM contacts WHERE name ILIKE '%${name}%' LIMIT 5`,
        (err, res) => {
          if (err) {
            response.json({ errors: err });
          }
          queryResponse(res, response);
        }
      );
    } catch (err) {
      response.json({ errors: err });
    }
  }
);

//CREAR NUEVO CONTACTO
router.post("/", contactValidationRules(), validate, (request, response) => {
  try {
    const { name, phone } = request.body;
    db.query(
      `INSERT INTO contacts (name,phone) VALUES ('${name}',${phone})`,
      (err, res) => {
        if (err) {
          if (
            err.code == UNIQUE_VIOLATION &&
            err.constraint == "contacts_phone_key"
          ) {
            response.status(400).json({
              errors: [{ name: "That phone already exist in our databases..." }]
            });
          } else {
            response.status(400).json({
              errors: [{ name: "There has been an error with your form..." }]
            });
          }
        } else {
          const query = res;
          response.status(200).json({ message: query });
        }
      }
    );
  } catch (err) {
    response.json({ errors: err });
  }
});

//ACTUALIZAR CONTACTO (POR ID)
router.put(
  "/:id",
  updateContactValidationRules(),
  validate,
  (request, response) => {
    try {
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
              response.status(400).json({
                errors: [
                  { name: "That phone already exist in our databases..." }
                ]
              });
            } else {
              response.status(400).json({
                errors: [{ name: "There has been an error with your form..." }]
              });
            }
          } else {
            queryResponse(res, response);
          }
        }
      );
    } catch (err) {
      response.json({ errors: err });
    }
  }
);

//ELIMINAR CONTACTO POR ID
router.delete(
  "/:id",
  [
    param("id")
      .isInt()
      .trim()
      .escape()
  ],
  validate,
  (request, response) => {
    try {
      const { id } = request.params;
      db.query(`DELETE FROM contacts WHERE id=${id}`, (err, res) => {
        if (err) {
          response.json({ errors: err });
        }
        queryResponse(res, response);
      });
    } catch (err) {
      response.json({ errors: err });
    }
  }
);

//ELIMINAR CONTACTOS POR ARREGLO DE IDS
router.delete(
  "/",
  [body("id").isArray(), body("id.*").isInt()],
  validate,
  (request, response) => {
    try {
      const { id } = request.body;
      db.query(`DELETE FROM contacts WHERE id IN (${id.join()})`, (err, res) => {
        if (err) {
          response.json({ errors: err });
        }
        queryResponse(res, response);
      });
    } catch (err) {
      response.json({ errors: err });
    }
  }
);

module.exports = router;
