const express = require('express');
const app = express();
const logger = require('morgan')
require('dotenv').config();
const connectDB = require("./db/dbConfig");
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors');
connectDB();
app.use(cors())
app.use(express.json());
app.use(logger('dev'));
app.use("/", require("./routes/noteRoutes"));
app.use(errorHandler);



app.listen(8080, () => {
    console.log('app listening on port 8080');
});