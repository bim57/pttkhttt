// const dashboardConfig = require('../config/db/dashboard');
import dashboardConfig from '../config/db/dashboard.js';

class DashboardController{
    // show the dashboard
    async index(req, res){
        try {
            res.render('dashboard');
        } catch (error) {
            console.log(error);
        }
    }
}

// module.exports = new DashboardController();
export default new DashboardController();