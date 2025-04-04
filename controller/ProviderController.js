// const providerConfig = require('../config/db/provider');
import providerConfig from '../config/db/provider.js';

class ProviderController{
    // show all providers
    async index(req, res){
        try {
            const provider = await providerConfig.getAll();
            res.render('provider', {provider});
        } catch (error) {
            console.log(error);
        }
    }
    
    // search provider
    async search(req, res){
        try {
            const {id} = req.params;
            const provider = await providerConfig.search(id);
            res.render('provider', {provider});
        } catch (error) {
            console.log(error);
        }
    }

    // create new provider form
    async create(req, res){
        try {
            res.render('create_provider');
        } catch (error) {
            console.log(error);
        }
    }

    // get data from create form and create new provider
    async store(req, res){
        try {
            const {name, phone, email, street, district, city} = req.body;
            await providerConfig.insert(name, phone, email, street, district, city);
            res.redirect('/provider');
        } catch (error) {
            console.log(error);
        }
    }

    // update data form
    async update(req, res){
        try {
            const {id} = req.params;
            const edit_provider = (await providerConfig.search(id))[0];
            res.render('update_provider', {edit_provider});
        } catch (error) {
            console.log(error);
        }
    }

    // get data from update and edit provider
    async edit(req, res){
        try {
            const {id, name, phone, email, street, district, city} = req.body;
            await providerConfig.update(id, name, phone, email, street, district, city);
            res.redirect('/provider');
        } catch (error) {
            console.log(error);
        }
    }

    // delete provider
    async delete(req, res){
        try {
            await providerConfig.delete(req.params.id);
            res.redirect('/provider');
        } catch (error) {
            console.log(error);
        }
    }
}

// module.exports = new ProviderController();
export default new ProviderController();