/**
 * Created by propo on 27.09.2016.
 */
$(function () {

});

var CalcDiscount = function (data) {
    if (this instanceof CalcDiscount) {
        var self = this;
        self.productName;
        self.ProductPrice;
        self.ProductsDiscount;
        $('section').on('click', '.js-adding-button_item', function (e) {

            e.preventDefault();
        });

    }
    else {
        return new CalcDiscount(data);
    }
}
CalcDiscount.prototype = {
    addProductItem: function () {
        var self = this;
    },
    checkProductFields: function () {
        var self = this;
    },
    checkDiscountField: function () {
        var self = this;
    },
    addDiscount: function () {
        var self = this;
    }
}