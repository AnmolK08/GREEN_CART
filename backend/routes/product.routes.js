import express from 'express';
import { upload } from '../config/multer.js';
import { addProduct, changeStock, productById, productList } from '../controllers/product.controller.js';
import authSeller from '../middlewares/authSeller.middleware.js';

const productRouter = express.Router();

productRouter.post('/add' , upload.array('image') , authSeller , addProduct);
productRouter.get('/list' , productList);
productRouter.get('/id' , productById);
productRouter.post('/stock' , authSeller , changeStock);

export default productRouter;
