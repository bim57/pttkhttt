// const productRouter = require('./product');
// const providerRouter = require('./provider');
// const categoryRouter = require('./category');
// const receiptRouter = require('./receipt');
// const dashboardRouter = require('./dashboard');

import productRouter from './product.js';
import providerRouter from './provider.js';
import categoryRouter from './category.js';
import receiptRouter from './receipt.js';
import dashboardRouter from './dashboard.js';

function router(app){
    app.use('/', dashboardRouter); // trang dáhboard
    
    app.use('/product', productRouter); // trang product

    app.use('/category', categoryRouter); // trang category
    
    app.use('/provider', providerRouter);  // trang provider

    app.use('/receipt', receiptRouter);  // trang hóa đơn

}

// module.exports = router;
export default router;