import {Router} from "express";
import homeController from "../controller/HomeController";
import {productRouter} from "./productRouter";

export const router = Router();
router.get('/home',homeController.showHome);
router.use('/products',productRouter);