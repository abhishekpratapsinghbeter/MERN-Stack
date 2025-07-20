const dotenv = require("dotenv")
const express =require('express')
const app = express();
const cors = require('cors');

dotenv.config({path:'./config.env'})
require("./src/models/connection/conn")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./src/routes/logging/loggingRoutes'));
const PORT = process.env.PORT || 5003;
  
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})