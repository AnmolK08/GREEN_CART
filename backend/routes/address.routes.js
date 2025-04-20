import express from 'express';
import authSeller from '../middlewares/authSeller.middleware.js';
import { addAddress, getAddress } from '../controllers/address.controller.js';

const addressRouter = express.Router();

addressRouter.post('/add' , authSeller , addAddress);
addressRouter.post('/get' , authSeller , getAddress);

export default addressRouter;