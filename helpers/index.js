const validator = require("./validator");

const queryResponse = (raw_query, response) => {
  try {
    const query = raw_query.rows;
    response.json({ data: query });
  } catch (err) {
    response.json({ errors: err });
  }
};

const actionResponse = (message, response) => {
  response.json({ message });
};

module.exports = { validator, queryResponse, actionResponse };
