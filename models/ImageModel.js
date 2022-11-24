const mongoose = require('mongoose');

const ImageModel = new mongoose.Schema( {
 name:String,
 Image:{
    data:Buffer ,
    contentType:String}
 } );

 module.exports = new mongoose.model( 'Images' , ImageModel )