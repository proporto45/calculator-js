/**
 * Created by propo on 27.09.2016.
 */
$(function () {

});

var CalcDiscount = function (data) {
    if (this instanceof CalcDiscount) {
        var self = this;
        $('section').on('click', '.js-adding-button_item', function (e) {

            e.preventDefault();
        });

    }
    else {
        return new CalcDiscount(data);
    }
}
CalcDiscount.prototype = {

}