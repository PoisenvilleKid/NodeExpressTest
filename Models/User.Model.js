import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const saltLevel = 10;
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
/*  We cannot store passwords in plaintext so 
    we are gonna import bcrypt and salt and hash a password
    before we save a User into the db.
    Everytime we create a new user from now on
    the password they enter will be salted and hashed
 */
userSchema.pre('save', function(next) {
    let user = this;

    if(!user.isModified('password')) {
        return next();
    }

    // This method generates new salt for each hash
    bcrypt.genSalt(saltLevel, function (err, salt) {

        if(err) {
            return next(err);
        }
    
        // This method will has the password and replace
        // the user password with a hashvalue instead
        bcrypt.hash(user.password,salt, function(err, hash) {
            if(err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    })
})

let User = mongoose.model('User',userSchema);

export default User;