//RESPONSE PARA QUERIES QUE DEVUELVEN DATOS
const queryResponse = (raw_query, response) => {
  try {
    const query = raw_query.rows;
    response.status(200).json({ data: query, success:true });
  } catch (err) {
    response.status(400).json({ errors: [{error:"There has been an error consulting our databases."}], success:false });
  }
};

//RESPONSE PARA QUERY COUNT
const countResponse = (raw_query, response) => {
  try {
    const count = raw_query.rows[0].count;
    response.status(200).json({ data: count, success:true });
  } catch (err) {
    response.status(400).json({ errors: [{error:"There has been an error consulting our database info."}], success:false });
  }
};

//RESPONSE PARA QUERIES QUE REALIZAN ACCIONES (INSERT, UPDATE, DELETE)
const actionResponse = (message, response) => {
  response.status(200).json({ message, success:true });
};

//RESPONSE PARA QUERIES QUE TERMINAN EN ERROR
//LO DEVUELVO DENTRO DE UN ARREGLO PORQUE ES LA ESTRUCTURA QUE DEVUELVE VALIDATOR (YA QUE PUEDEN HABER VARIOS ERRORES DE VALIDACION A LA VEZ)
const errorResponse = (error, response) => {
  response.status(400).json({ errors: [{error}], success:false });
};

//RESPONSE PARA QUERIES QUE TERMINAN EN ERROR DE SERVIDOR
const serverErrorResponse = (response) => {
  response.status(400).json({ errors: [{error:"Server Error."}], success:false });
};


module.exports = {
  queryResponse,
  actionResponse,
  errorResponse,
  countResponse,
  serverErrorResponse
};
