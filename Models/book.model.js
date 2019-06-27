import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let bookSchema = new Schema({
    name: String,
    price: Number
});

let Book = mongoose.model('Book', bookSchema);

export default Book;

