// const productConfig = require('../config/db/product');
// const categoryConfig = require('../config/db/category');
import productConfig from '../config/db/product.js';
import categoryConfig from '../config/db/category.js';

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
            const category = await productConfig.getCategory_by_name(id);
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
            const {name, author, publisher, category, 
                price, inventory, pages, description, imageBase64} = req.body;
            const images = JSON.parse(imageBase64); // Giải mã chuỗi JSON thành mảng
            await productConfig.insert(name, author, publisher, category, price, inventory, pages, description, images);
            res.redirect('/product');
        } catch (error) {
            console.log(error);
        }
    }

    // update data form
    async update(req, res){
        try {
            const {id} = req.params;
            const edit_product = (await productConfig.search(id))[0];
            const list_category = await categoryConfig.getAll();
            const checked_category = await productConfig.getCategory_by_id(id);
            const images = await productConfig.getImage(id);
            const imageBase64 = await productConfig.getImageBase64(id);
            const json_image = JSON.stringify(imageBase64);
            res.render('update_product',{
                edit_product,
                list_category,
                checked_category,
                json_image,
                images
            });
        } catch (error) {
            console.log(error);
        }
    }

    // edit product
    async edit(req, res){
        try {
            const {id, name, author, publisher, category, 
                price, inventory, pages, description, imageBase64} = req.body;
            const images = JSON.parse(imageBase64); // Giải mã chuỗi JSON thành mảng
            await productConfig.update(id, name, author, publisher, category, price, inventory, pages, description, images);
            res.redirect('/product');
        } catch (error) {
            console.log(error);
        }
    }

    // delete product
    async delete(req, res){
        try {
            await productConfig.delete(req.params.id);
            res.redirect('/product');
        } catch (error) {
            console.log(error);
        }
    }
}

// module.exports = new ProductController();
export default new ProductController();