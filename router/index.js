const productRouter = require('./product');
const providerRouter = require('./provider');
const categoryRouter = require('./category');

function router(app){
    app.get('/', (req, res)=>{
        res.render('home');
    });
    
    app.use('/product', productRouter); // trang product

    app.use('/category', categoryRouter); // trang category
    
    app.use('/provider', providerRouter);  // trang provider

}

module.exports = router;