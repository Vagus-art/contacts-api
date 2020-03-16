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
} = require("../helpers/");

//templates de responses (try catch por nulidades si se escapa un error, mantener el mismo key para los mensajes desde el server)
const { queryResponse, actionResponse } = require("../helpers/");

//para validar param de id
const { param, body } = require("express-validator");

//OBTENER TODOS LOS CONTACTOS ORDENADOS ALFABETICAMENTE (LIMITE DE 10)
router.get("/", (request, response) => {
  try {
    db.query("SELECT * FROM contacts ORDER BY name LIMIT 10", (err, res) => {
      if (err) {
        response.json({ errors: err });
      } else {
        queryResponse(res, response);
      }
    });
  } catch (err) {
    response.json({ errors: err });
  }
});

//OBTENER TODOS LOS CONTACTOS ORDENADOS ALFABETICAMENTE (LIMITE DE 10) OFFSET PARA DIVISION POR PAGINAS O SCROLL INFINITO
router.get(
  "/offset/:offset",
  [param("offset").isInt().withMessage("OFFSET must be INT")],
  validate,
  (request, response) => {
    try {
      let { offset } = request.params;
      offset = offset === 0 ? 1 : offset * 10;
      db.query(
        `SELECT * FROM contacts ORDER BY name OFFSET ${offset} LIMIT 10`,
        (err, res) => {
          if (err) {
            response.json({ errors: err });
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

//OBTENER CONTACTO POR ID
router.get("/:id", [param("id").isInt().withMessage("ID must be INT")], validate, (request, response) => {
  try {
    const { id } = request.params;
    db.query(`SELECT * FROM contacts WHERE id=${id}`, (err, res) => {
      if (err) {
        response.json({ errors: err });
      } else {
        queryResponse(res, response);
      }
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
        `SELECT * FROM contacts WHERE name ILIKE '%${name}%' ORDER BY NAME LIMIT 5`,
        (err, res) => {
          if (err) {
            response.json({ errors: err });
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
          actionResponse("POST Success", response.status(200));
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
            actionResponse(`UPDATE Success ID=${id}`, response.status(200));
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
      .escape().withMessage("ID must be INT")
  ],
  validate,
  (request, response) => {
    try {
      const { id } = request.params;
      db.query(`DELETE FROM contacts WHERE id=${id}`, (err, res) => {
        if (err) {
          response.status(400).json({ errors: err });
        } else if (res.rowCount == 0) {
          actionResponse(`ID '${id}' not found`, response.status(400));
        } else {
          actionResponse(`DELETE Success ID=${id}`, response.status(200));
        }
      });
    } catch (err) {
      response.status(400).json({ errors: err });
    }
  }
);

//ELIMINAR CONTACTOS POR ARREGLO DE IDS
router.delete(
  "/",
  [body("id").isArray().withMessage("ID must be an array of INT"), body("id.*").isInt().withMessage("ID must be an array of INT")],
  validate,
  (request, response) => {
    try {
      const { id } = request.body;
      db.query(
        `DELETE FROM contacts WHERE id IN (${id.join()})`,
        (err, res) => {
          if (err) {
            response.json({ errors: err });
          } else if (res.rowCount == 0) {
            actionResponse(
              `None of these IDS '${id.join()}' were found`,
              response.status(400)
            );
          } else {
            actionResponse(
              `DELETE Success ID=[${id.join()}]`,
              response.status(200)
            );
          }
        }
      );
    } catch (err) {
      response.status(400).json({ errors: err });
    }
  }
);

module.exports = router;
