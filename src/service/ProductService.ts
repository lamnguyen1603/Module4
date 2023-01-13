import {Product} from "../model/product";

class ProductService {
    constructor() {
    }
    getAll = async () => {
        let products = await Product.find().populate('category');
        return products
    }
    save = async (product) => {
        return Product.create(product)
    }
    findById = async (id)=> {
        let products = await Product.findOne({_id :id})
        return products
    }

    private update = async (id,newProduct) => {
        let product = await Product.findOne({_id : id})
        if(!product) {
            return null
        }
        return Product.updateOne({_id : id},newProduct)
    }
   private moveProduct = async (id) => {
        let product = await Product.findOne({_id : id});
        if(!product){
            return null
        }
        return Product.deleteOne({_id : id});
    }
}

export default new ProductService();