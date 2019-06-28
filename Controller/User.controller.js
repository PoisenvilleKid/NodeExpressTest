import User from "../Models/User.Model";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
mongoose.Promise = Promise;
import { runInNewContext } from "vm";

// Test method to make sure we are hitting the User Controller
exports.test = function(req, res) {
  res.send("Hello from the User controller!");
};

// Method to create a new user on registration
exports.createUser = function(req, res) {
  /*
        Create new user based given a username and password
        TODO: later on add a validation function
    */
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });

  /*
        Save the user to the db
        if we get an error of some kind return an error
    */
  user.save()
      .then(result => {
          res.send({success: true, result: result});
      })
      .catch(err => {
          res.send({success: false, result: err});
      });
};

// Method to Login a user and compare the hashed password
// With the plaintext password entered in the body
exports.loginUser = function(req,res) {
  User.findOne({username : req.body.username})
      .then(user => {

        // This method compares the plaintext password with the hashed 
        // password in the db, if we have a match give a 200 status code
        // and enter the user... else give them a 401
        bcrypt.compare(req.body.password, user.password,(err,result) => {
          if(err) {
            return res.status(401).send("Auth Failed");
          }

          // If the user logs in successfully add a token along with 
          // a 200 code and succes message
          if(result) {
            const token = jwt.sign({
              userId: user._id
            },
            'Secret',
            {
              expiresIn: "2h"
            });
            return res.send(
              {
                success: true, 
                result: result, 
                token: token
              });
          }
          return res.status(401).send("Auth Failed");
        })
      })
      .catch(err => {
        return res.send({success: false, result: err});
    });
}

// Method to get the information of a user
exports.getUser = function(req,res) {
    User.findOne({username : req.params.username})
        .then(result => {
            if(!result) return res.json({success: false, result: 'User not found'});
            res.send({success: true, result: result});
        })
        .catch(err => res.send({success:false, result: err}));
}

// Method to delete a user 
// right now we go by username but we would like to 
// go by user id
exports.deleteUser = function(req, res) {
  User.findOneAndRemove({ username: req.params.username})
      .then(result => {
          if(!result) return res.send({success: false, result: 'No User found!'})
          res.send({success: true, result: result});
      })
      .catch(err => res.send({success:false, result: err}));
};
