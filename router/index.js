// const productRouter = require('./product');
// const providerRouter = require('./provider');
// const categoryRouter = require('./category');

import productRouter from './product.js';
import providerRouter from './provider.js';
import categoryRouter from './category.js';
import receiptRouter from './receipt.js'

function router(app){
    app.get('/', (req, res)=>{
        res.render('home');
    });
    
    app.use('/product', productRouter); // trang product

    app.use('/category', categoryRouter); // trang category
    
    app.use('/provider', providerRouter);  // trang provider

    app.use('/receipt', receiptRouter);  // trang hóa đơn

}

// module.exports = router;
export default router;