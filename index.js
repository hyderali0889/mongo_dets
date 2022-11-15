const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bootcamps = require("./routes/mainBootcampRoutes")
const mongo = require('./config/db')
const err = require('./middlewares/errHandlerMiddleware')

dotenv.config({ path: "./config/conf.env" });

//app.use(mid);

mongo();
app.use(express.json());

app.use( '' ,bootcamps  )

app.use( err );


// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` App running in ${process.env.NODE_ENV} at port ${PORT}`);
});
