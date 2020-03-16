//RESPONSE PARA QUERIES QUE DEVUELVEN DATOS
const queryResponse = (raw_query, response) => {
  try {
    const query = raw_query.rows;
    response.status(200).json({ data: query });
  } catch (err) {
    response.status(400).json({ errors: err });
  }
};

//RESPONSE PARA QUERIES QUE REALIZAN ACCIONES (INSERT, UPDATE, DELETE)
const actionResponse = (message, response) => {
  response.json({ message });
};

//RESPONSE PARA QUERIES QUE TERMINAN EN ERROR
//....

module.exports = {
  queryResponse,
  actionResponse
};
