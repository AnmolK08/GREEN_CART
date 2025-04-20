import express from ' express ';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/order.controller.js';
import authSeller from '../middlewares/authSeller.middleware.js';
import authUser from '../middlewares/authUser.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/cod' , authUser , placeOrderCOD);
orderRouter.get('/user' , authUser , getUserOrders);
orderRouter.get('/seller' , authSeller , getAllOrders);

export default orderRouter;