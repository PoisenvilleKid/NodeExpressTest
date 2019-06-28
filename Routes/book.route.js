import express from 'express';
import book_controller from '../Controller/book.controller';
const router = express.Router();



// a simple test url to check that all of our files are communicating correctly.
router.get('/test', book_controller.test);

// Rout to post a new book to the DB
router.post('/create', book_controller.product_create);

// Route to get ALL the books in the DB
router.get('/get', book_controller.returnBooks);

// Route to get a book by its name
router.get('/get/:name', book_controller.returnBook);

/* Route to delete a book by its name/
   TODO: Figure out a way to get a book by its ID
   since its a unique field and dont want to delete 
   multiple books of the same name 
*/
router.delete('/delete/:name', book_controller.deleteBook);

export default router;