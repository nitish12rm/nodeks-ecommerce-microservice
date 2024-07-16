const ProductRepository = require("../repositories/productRepository");

class ProductServices{
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async createProduct(product){
        const createdProduct = this.productRepository.create(product);
        return createdProduct;
    }

    async getProductByid(productId){
        const product = this.productRepository.findById(productId);
        return product;
    }

    async getAllProduct(){
        const products = this.productRepository.findAll();
        return products;
    }
}

module.exports = ProductServices;