const { Router } = require("express");
const router = Router();
const db = require("../database");
const { contactValidationRules, validate } = require("../helpers/validator");

router.get("/", (request, response) => {
  return db.query("SELECT * FROM contacts", (err, res) => {
    if (err) {
      response.json({ errors: err });
    }
    const query = res.rows;
    response.json({ data: query, errors: err });
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  return db.query(`SELECT * FROM contacts WHERE id=${id}`, (err, res) => {
    if (err) {
      response.json({ errors: err });
    }
    const query = res.rows;
    response.json({ data: query, errors: err });
  });
});

router.post("/", contactValidationRules(), validate, (request, response) => {
  const { name, phone } = request.body;
  db.query(
    `INSERT INTO contacts (name,phone) VALUES ('${name}',${phone})`,
    (err, res) => {
      if (err) {
        switch (err.code) {
          case 23505:
            switch (err.constraint) {
              case "contacts_phone_key":
                response.status(400).json({ errors: [{name:"phone already exist"}] });
                break;
              default:
                response.status(400).json({
                  errors: [{name:"there is duplicate data in your form"}]
                });
                break;
            }
          default:
            response.status(400).json({
              errors: [{name:"there has been an error accessing our database servers"}]
            });
            break;
        }
      } else {
        const query = res;
        response.status(200).json({ message: query });
      }
    }
  );
});

module.exports = router;
