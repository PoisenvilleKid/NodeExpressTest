import Book from '../Models/book.model';
import db from '../Service/dbConnect';
import { runInNewContext } from 'vm';

exports.test = function(req,res) {
    res.send('Hello From The Controller My Name Is Fred It Is Nice To Meet You');
}

exports.product_create = function(req,res) {
    let book = new Book({
        name: req.body.name,
        price: req.body.price
    });

    book.save(function(err) {
        if(err) {
            return runInNewContext(err);
        }
        res.send('Book Created Succesfully');
    })
}