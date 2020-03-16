const queryResponse = (raw_query, response) => {
  try {
    const query = raw_query.rows;
    response.status(200).json({ data: query });
  } catch (err) {
    response.status(400).json({ errors: err });
  }
};

const actionResponse = (message, response) => {
  response.json({ message });
};

module.exports = {
  queryResponse,
  actionResponse
};
