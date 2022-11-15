const mongoose = require('mongoose');


const connectToDb = async() =>{
 const db = await mongoose.connect( 'mongodb+srv://hyderali:Ilovewindows10@bootcamp.dj1hc7i.mongodb.net/myDB?retryWrites=true&w=majority' );

 console.log(`Database connected ${db.connection.host}`);
}

module.exports = connectToDb;

