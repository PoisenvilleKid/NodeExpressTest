import express from 'express';
import userController from '../Controller/User.controller';
const router = express.Router();

// Route To test that we successfully access the User Controller
router.get('/LoginTest', userController.test);

// Route to get the information of a user based on URL paramter endpoint
router.get('/Users/get/:username',userController.getUser);

// Route to sign up a user for the first time 
router.post('/Register', userController.createUser);

// Route to Login a user... 
// we will either enter an app or kickback and error message
router.post('/Login', userController.loginUser);

// Route to delete a user based on their username
// TODO: Delete by user ID rather than username
router.delete('/Users/delete/:username', userController.deleteUser);

// Export our routes so that app.js has access 
export default router;