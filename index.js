const express = require("express");
const app = express();
const port = 4000;
const { Pool } = require('pg')

const pool = new Pool({
  user: 'agustin',
  host: 'localhost',
  database: 'helloworld',
  password: 'agustin',
  port: 5432,
})

app.get('/',async (request,response)=>{
    pool.query('SELECT * FROM helloworld', (err, res) => {
        const query = res.rows;
        response.json(query);
        pool.end();
    }); 
})



app.listen(port,()=>console.log(`app listening on port ${port}`));