const mongoose = require('mongoose');
const {Schema,Model}=mongoose;
const bookSchema = new Schema({
    title:{
        type:String,
        default:"----"
    },
    isbn:{
      type:Number,
    },
    author:{
        type:String,
        default:"----"
    }
});
const bookmodel = mongoose.model('Book',bookSchema);
module.exports = bookmodel;

