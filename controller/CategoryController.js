const categoryConfig = require('../config/db/category');

class CategoryController{
    // show all category
    async index (req, res){
        try {
            const category = await categoryConfig.getAll();
            res.render('category', {category});
        } catch (err) {
            console.log(err);
        }
    }

    // search category
    async search(req, res){
        try {
            const {id} = req.params;
            res.render('category');
        } catch (err) {
            console.log(err);
        }
    }

    // view detail category
    async view(req, res){
        try {
            const {id} = req.params;
            const category_detail = await categoryConfig.viewProduct(id);
            const detail_header = (await categoryConfig.detailHeader(id))[0];
            res.render('view_category', {
                detail_header,
                category_detail
            });
        } catch (error) {
            console.log(error);
        }
    }

    // create form
    async create(req, res){
        try {
            res.render('create_category');
        } catch (error) {
            console.log(error);
        }
    }

    // get data from create form and add new category
    async store(req, res){
        try {
            const {id, name} = req.body;
            const category = await categoryConfig.insert(id, name);
            res.redirect('/category');
        } catch (error) {
            console.log(error);
        }
    }

    // delete data
    async delete(req, res){
        try {
            const del_category = await categoryConfig.delete(req.params.id);
            res.redirect('/category');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CategoryController();