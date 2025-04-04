// const receiptConfig = require('../config/db/receipt');
import receiptConfig from '../config/db/receipt.js';

class ReceiptController{
    // show all receipts
    async index(req, res){
        try {
            const receipt = await receiptConfig.getAll();
            res.render('receipt', {receipt});
        } catch (error) {
            console.log(error);
        }
    }
    
    // search receipt
    async search(req, res){
        try {
            const {id} = req.params;
            const receipt = await receiptConfig.search(id);
            res.render('receipt', {receipt});
        } catch (error) {
            console.log(error);
        }
    }

    // view receipt details
    async view(req, res){
        try {
            const {id} = req.params;
            const receipt_info = (await receiptConfig.view(id))[0];
            const product_detail = await receiptConfig.view_product_in_receipt(id);
            res.render('view_receipt', {
                id,
                receipt_info,
                product_detail
            });
        } catch (error) {
            console.log(error);
        }
    }

    // create new receipt form
    async create(req, res){
        try {
            res.render('create_receipt');
        } catch (error) {
            console.log(error);
        }
    }

    // // get data from create form and create new receipt
    // async store(req, res){
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // // update data form
    // async update(req, res){
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // // get data from update and edit receipt
    // async edit(req, res){
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // // delete receipt
    // async delete(req, res){
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

// module.exports = new ReceiptController();
export default new ReceiptController();