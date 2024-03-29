import express from 'express';
import path from 'path';
import bookRouter from './Routes/book.route';
import userRouter from './Routes/User.route';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import db from './Service/dbConnect';

// app variable to let us use express methods
const app = express();

// Set up Pathway for static files -- HTML/CSS/JS
app.use(express.static(path.join(__dirname,'Public')));

// Middleware to when everytime a user logs in we keep track of
// what that user did last time
app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized: true
}));

// Set these two up to be able to take JSON value
// ***Important always put before your route values***
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up Pathway for all of our routes
app.use(bookRouter);
app.use(userRouter);

/* Set Port Number and run server with yarn run start nodemon will
*/
let port = 1234;
app.listen(port, function () {
 console.log('Server is up and running on port ' + port);
});