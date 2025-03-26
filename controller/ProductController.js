const productConfig = require('../config/db/product');

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

    // show product image
    async getImage (req, res){
        try {
            const result = await productConfig.product_image(req.params.id);
            if (result.length > 0 && result[0].Anh) {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(result[0].Anh, 'binary');
            } else {
                res.status(404).send('Image not found');
            }
        } catch (err) {
            console.error(err);
        }
    }

    // create new product form
    async create(req, res){
        try {
            res.render('create_product');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new ProductController();