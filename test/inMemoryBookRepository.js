/**
 * Created by mradojewski on 14.03.2017.
 */
module.exports = function() {
    var items = [];

    return {
        _items: function(state) {
            items = state;
        },
        stockUp: function (book) {
            var updated = false;
            items.forEach(function(item) {
                if(item.isbn === book.isbn) {
                    item.count = book.count;
                    updated = true;
                }
            });
            if(!updated) {
                items.push({"isbn": book.isbn, "count": book.count});
            }
            return Promise.resolve();
        },
        findAll: function () {
            return Promise.resolve(items);
        },
        getStock: function (isbn) {
            var foundItemCount = null;
            items.forEach(function(item) {
                if(item.isbn === isbn) {
                    foundItemCount = item.count;
                }
            });
            return Promise.resolve(foundItemCount);
        }
    };
};

