/**
 * Created by mradojewski on 14.03.2017.
 */
var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN);

configurator.export('book-inventory-666').then(function(result) {
    console.log(result);
});



