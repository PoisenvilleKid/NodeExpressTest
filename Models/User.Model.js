import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/*
    Define a user Schema with a username in password
    Since this is a demo library/boilerplate this will be 
    the basic properties for now
    TODO: salt and has password before its inserted in DB
    TODO: add more properties as we get more comfortable
*/ 
const userSchema = new Schema({
    username: {
        type:String, required: true, unique: true
    },
    password: {
        type:String, required: true,
    }
});

let User = mongoose.model('User',userSchema);

export default User;