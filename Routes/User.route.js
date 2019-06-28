import express from 'express';
import userController from '../Controller/User.controller';
const router = express.Router();

router.get('/Login/Test', userController.test);

router.get('/Users/get/:username',userController.getUser);

router.post('/Login/Create', userController.createUser);

router.delete('/Users/delete/:username', userController.deleteUser);

export default router;