import express, { Router } from 'express';
import { registerController, loginController, textController, forgetPasswordController } from '../controller/authController.js';
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router()

//routing
//Resgister || method post

router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController)

//  Forget Password || POST
router.post('/forget-password', forgetPasswordController)


//test routes
router.get('/test', requireSingIn, isAdmin, textController);


//Protected user Route
router.get('/user-auth', requireSingIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//Protected admin Route
router.get('/admin-auth', requireSingIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});



export default router