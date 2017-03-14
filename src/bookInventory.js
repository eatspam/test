var bookRepository = require('./bookRepository')();
var app = require('./bookInventoryApp')(bookRepository);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});