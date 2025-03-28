const productConfig = require('../config/db/product');
const categoryConfig = require('../config/db/category');

class ProductController{
    // show all products
    async index (req, res){
        try {
            const product = await productConfig.getAll();
            res.render('product', {product});
        } catch (err) {
            console.error(err);
        }
    }

    // search product
    async search(req, res){
        try {
            const {id} = req.params;
            const product = await productConfig.search(id);
            res.render('product', {product});
        } catch (err) {
            console.error(err);
        }
    }

    // view detail product
    async view(req, res){
        try {
            const {id} = req.params;
            const product = (await productConfig.search(id))[0];
            const category = await productConfig.getCategory(id);
            const image = await productConfig.getImage(id);
            res.render('view_product',{
                product,
                category,
                image
            });
        } catch (error) {
            console.error(err);
        }
    }

    // create new product form
    async create(req, res){
        try {
            const category = await categoryConfig.getAll();
            res.render('create_product', {category});
        } catch (err) {
            console.error(err);
        }
    }

    // get data from create form and add new product
    async store(req, res){
        try {
            const {id, name, author, publisher, category, 
            price, inventory, pages, description, imageBase64} = req.body;
            const images = JSON.parse(imageBase64); // Giải mã chuỗi JSON thành mảng
            res.json({id, name, author, publisher, category, 
                price, inventory, pages, description, images});
        } catch (error) {
            console.log(error);
        }
    }

    // edit product
    

    // delete product

}

module.exports = new ProductController();