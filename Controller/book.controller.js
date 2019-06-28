import Book from '../Models/book.model';
import { runInNewContext } from 'vm';

// Method to return the string when user hits test endpoint
exports.test = function(req,res) {
    res.send('Hello From The Controller My Name Is Fred It Is Nice To Meet You');
}

// Method to insert a new book object in the DB
exports.product_create = function(req,res) {
    // Create a new book object based on
    // API body variables
    let book = new Book({
        name: req.body.name,
        price: req.body.price
    });

    // Save the book to the DB
    // Return an error if we cant
    book.save()
        .then(result => {
            res.send({success: true, result: result});
        })
        .catch(err => {
            res.send({success: false, result: err});
        });
}

// Get all the books from the DB
// If we have an error catch it and return the error
exports.returnBooks =  function(req,res,next) {
    Book.find()
        .then(result => {
            if(!result) return res.send({success:false, result:'No result found'});
            res.send({success: true, result: result});
        })
        .catch(err => res.send({success: false, result: err}));
}

// Get a particuler book by its Name
// We get the name in the payload of req
exports.returnBook = function(req,res,next) {
    Book.findOne({name : req.params.name})
        .then(result => {
            if(!result) return res.send({success:false, result: 'No result found'});
            res.send({success:true, result: result});
        })
        .catch(err => res.send({success: false, result: err}));
}

// Delete a book by its name
// TODO: eventually we want to delete by ID since it is unique
exports.deleteBook = function(req,res,next) {
    Book.findOneAndRemove({name: req.params.name})
        .then(result => {
            if(!result) return res.send({success: false, result: 'No result found'});
            res.send({success: true, result: result});
        })
        .catch(err => res.send({success: false, result: err}));
}