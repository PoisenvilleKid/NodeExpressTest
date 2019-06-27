import express from 'express';
import path from 'path';
import router from './Routes/book.route';
import bodyParser from 'body-parser';

// app variable to let us use express methods
const app = express();

// Set up Pathway for static files -- HTML/CSS/JS
app.use(express.static(path.join(__dirname,'Public')));

// Set these two up to be able to take JSON value
// ***Important always put before your route values***
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up Pathway for all of our routes
app.use(router);

/* Set Port Number and run server with yarn run start nodemon will
*/
let port = 1234;
app.listen(port, function () {
 console.log('Server is up and running on port ' + port);
});