const validator = require("./validator");

const queryResponse = (raw_query, response) => {
    try{
        const query = raw_query.rows;
        response.json({ data: query });
    }
    catch(err){
        response.json({ errors: err });
    }
}

module.exports = { validator, queryResponse };