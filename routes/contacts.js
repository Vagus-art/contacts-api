const { Router } = require("express");
const router = Router();
const { UNIQUE_VIOLATION } = require("pg-error-constants");

//conexion a base de datos por variables de entorno
const db = require("../database");

//para validar todas las formas de input
const {
  contactIdValidationRules,
  contactOffsetValidationRules,
  contactSearchValidationRules,
  contactValidationRules,
  updateContactValidationRules,
  deleteContactValidationRules,
  deleteContactArrayValidationRules,
  validate
} = require("../helpers/");

//templates de responses (try catch por nulidades si se escapa un error, mantener el mismo key para los mensajes desde el server)
const { queryResponse, actionResponse, errorResponse, serverErrorResponse, countResponse } = require("../helpers/");

//OBTENER TODOS LOS CONTACTOS ORDENADOS ALFABETICAMENTE (LIMITE DE 10)
router.get("/", (request, response) => {
  try {
    db.query("SELECT * FROM contacts ORDER BY name LIMIT 10", (err, res) => {
      if (err) {
        serverErrorResponse(response);
      } else {
        queryResponse(res, response);
      }
    });
  } catch (err) {
    serverErrorResponse(response);
  }
});

//OBTENER TODOS LOS CONTACTOS ORDENADOS ALFABETICAMENTE (LIMITE DE 10) OFFSET PARA DIVISION POR PAGINAS O SCROLL INFINITO
router.get(
  "/offset/:offset",
  contactOffsetValidationRules(),
  validate,
  (request, response) => {
    try {
      let { offset } = request.params;
      offset = offset === 0 ? 1 : offset * 10;
      db.query(
        `SELECT * FROM contacts ORDER BY name OFFSET ${offset} LIMIT 10`,
        (err, res) => {
          if (err) {
            serverErrorResponse(response);
          } else {
            queryResponse(res, response);
          }
        }
      );
    } catch (err) {
      serverErrorResponse(response);
    }
  }
);

//OBTENER CONTACTO POR ID
router.get(
  "/:id",
  contactIdValidationRules()
  ,
  validate,
  (request, response) => {
    try {
      const { id } = request.params;
      db.query(`SELECT * FROM contacts WHERE id=${id}`, (err, res) => {
        if (err) {
          serverErrorResponse(response);
        } else {
          queryResponse(res, response);
        }
      });
    } catch (err) {
      serverErrorResponse(response);
    }
  }
);

//BUSQUEDA
router.get(
  "/search/:name",
  contactSearchValidationRules(),
  (request, response) => {
    try {
      const { name } = request.params;
      db.query(
        `SELECT * FROM contacts WHERE name ILIKE '%${name}%' ORDER BY NAME LIMIT 5`,
        (err, res) => {
          if (err) {
            serverErrorResponse(response);
          } else {
            queryResponse(res, response);
          }
        }
      );
    } catch (err) {
      serverErrorResponse(response);
    }
  }
);

//OBTENER DATOS DE TABLA
router.get("/info/rowcount", (request, response) => {
  try {
    db.query("SELECT COUNT(*) FROM contacts", (err, res) => {
      if (err) {
        serverErrorResponse(response);
      } else {
        countResponse(res, response);
      }
    });
  } catch (err) {
    serverErrorResponse(response);
  }
});

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
            errorResponse(
              "That phone already exist in our databases...",
              response
            );
          } else {
            errorResponse(
              "There has been an error with your form...",
              response
            );
          }
        } else {
          actionResponse("POST Success", response);
        }
      }
    );
  } catch (err) {
    serverErrorResponse(response);
  }
});

//ACTUALIZAR CONTACTO POR ID
router.put(
  "/",
  updateContactValidationRules(),
  validate,
  (request, response) => {
    try {
      const { name, phone, id } = request.body;
      db.query(
        `UPDATE contacts SET name='${name}',phone=${phone} WHERE id=${id}`,
        (err, res) => {
          if (err) {
            if (
              err.code == UNIQUE_VIOLATION &&
              err.constraint == "contacts_phone_key"
            ) {
              errorResponse(
                "That phone already exist in our databases...",
                response
              );
            } else {
              errorResponse(
                "There has been an error with your form...",
                response
              );
            }
          } else {
            actionResponse(`UPDATE Success ID=${id}`, response);
          }
        }
      );
    } catch (err) {
      serverErrorResponse(response);
    }
  }
);

//ELIMINAR CONTACTO POR ID
router.delete(
  "/:id",
  deleteContactValidationRules(),
  validate,
  (request, response) => {
    try {
      const { id } = request.params;
      db.query(`DELETE FROM contacts WHERE id=${id}`, (err, res) => {
        if (err) {
          serverErrorResponse(response);
        } else if (res.rowCount == 0) {
          errorResponse(`ID '${id}' not found`, response);
        } else {
          actionResponse(`DELETE Success ID=${id}`, response);
        }
      });
    } catch (err) {
      serverErrorResponse(response);
    }
  }
);

//ELIMINAR CONTACTOS POR ARREGLO DE IDS
router.delete(
  "/",
  deleteContactArrayValidationRules(),
  validate,
  (request, response) => {
    try {
      const { id } = request.body;
      const idString = id.join();
      db.query(
        `DELETE FROM contacts WHERE id IN (${idString})`,
        (err, res) => {
          if (err) {
            serverErrorResponse(response);
          } else if (res.rowCount == 0) {
            errorResponse(
              `None of these IDS '${idString}' were found`,
              response
            );
          } else {
            actionResponse(`DELETE Success ID=[${idString}]`, response);
          }
        }
      );
    } catch (err) {
      serverErrorResponse(response);
    }
  }
);

module.exports = router;
