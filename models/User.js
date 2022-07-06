const mongoose= require('mongoose')
const Schema = mongoose.Schema

//Create schema

const UserSchema = new Schema({
    googleID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    image:{
        data:Buffer,
        type:String
    }
})

//create collection, add schema

exports.module =users= mongoose.model('users', UserSchema)