const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const routes = require("./routes");
const cors = require("cors");
//const morgan = require("morgan");

//just in case
app.get('/',(req,res)=>{
    res.send("Hello! this api endpoints start at /api/contacts/");
});

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api',routes);

app.listen(port,()=>console.log(`app listening on port ${port}`));