import User from "../Models/User.Model";
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { runInNewContext } from "vm";

// Test method to make sure we are hitting the User Controller
exports.test = function(req, res) {
  res.send("Hello from the User controller!");
};


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

exports.getUser = function(req,res) {
    User.findOne({username : req.params.username})
        .then(result => {
            if(!result) return res.json({success: false, result: 'User not found'});
            res.send({success: true, result: result});
        })
        .catch(err => res.send({success:false, result: err}));
}

exports.deleteUser = function(req, res) {
  User.findOneAndRemove({ username: req.params.username})
      .then(result => {
          if(!result) return res.send({success: false, result: 'No User found!'})
          res.send({success: true, result: result});
      })
      .catch(err => res.send({success:false, result: err}));
};
