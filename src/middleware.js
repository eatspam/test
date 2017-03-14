/**
 * Created by mradojewski on 14.03.2017.
 */
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());

    app.myLogger = function (req, res, next) {
        console.log("Server request", new Date());
        next();
    };

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        if (err.statusCode === 500) {
            res.status(500).send('Server error!');
        }
        next(err);
    });

    return app;
};