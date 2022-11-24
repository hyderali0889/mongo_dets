const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bootcamps = require("./routes/mainBootcampRoutes")
const courses = require("./routes/mainCourseRoutes")
const mongo = require('./config/db')
const err = require('./middlewares/errHandlerMiddleware')
const image = require('./routes/mainImageRoutes');


dotenv.config({ path: "./config/conf.env" });



//app.use(mid)

mongo();
app.use(express.json());

app.use( '/v1/bootcamps' ,bootcamps  )
app.use( '/v1/courses' ,courses  )
app.use( '/v1/uploadImage' , image )

app.use( err );


// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` App running in ${process.env.NODE_ENV} at port ${PORT}`);
});
