const Product = require("../models/product");
class ProductRepository{
    async create(product){
         const createdProduct = await Product.create(product);
         return createdProduct.toObject();
    }

    async findById(productId){
        const product = await Product.findById(productId).lean();//mongoose return in the form of document but lean transforms it into json object
        return product;
    }

    async findAll(){
        const products = Product.find().lean();
        return products;
    }
}
module.exports = ProductRepository;