import express, { Router } from 'express';
import { registerController, loginController, textController, forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, getOrdersStatusController } from '../controller/authController.js';
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

//update profile
router.put('/profile', requireSingIn, updateProfileController)


//order
router.get("/orders", requireSingIn, getOrdersController)

//All-order
router.get("/all-orders", requireSingIn, getAllOrdersController)


//order-Status Update
router.put("/orders-status/:orderId", requireSingIn, isAdmin, getOrdersStatusController)





export default router