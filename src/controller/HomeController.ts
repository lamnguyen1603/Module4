import {Request, Response} from "express";
import productService from "../service/ProductService";

class HomeController {
    private productService;
    constructor() {
        this.productService = productService;
    }
    showHome = async (req: Request,res: Response)=> {
        let products = await productService.getAll()
        res.render('home',{products : products})
    }
    showCreate = async (req: Request,res: Response) => {
        res.render('products/create')
    }
    createProduct = async  (req : Request,res :Response) => {
        if(req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage' + image.name);
                let product =req.body;
                product.image = '/storage' + image.name;
                await productService.save(product)
                res.redirect(301,'/home');
            }
        }

    }
    showFormEdit = async (req: Request, res:Response) => {
        let id = req.params.id;
        let product = await this.productService.findById(id)
        res.render('products/edit',{products : product})

    }
    updateProduct = async (req : Request,res :Response) => {
        if(req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage' + image.name);
                let id = req.params.id;
                let products =req.body;
                products.image = '/storage' + image.name;
                await this.productService.update(id,products)
                res.redirect(301,'/home');
            }
        }
    }
    showFormDelete = async (req : Request,res :Response) => {
        let id = req.params.id;
        res.render('products/delete', {id: id})
    }
    removeProduct = async (req : Request,res :Response)=>{
        let id = req.params.id
        await this.productService.moveProduct(id);
        res.redirect(301,'/home');
    }
}
export  default new HomeController()