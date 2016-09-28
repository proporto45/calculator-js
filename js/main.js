/**
 * Created by proporto45 on 27.09.2016.
 */
$(function () {
    CalcDiscount();
});

var CalcDiscount = function () {
    if (this instanceof CalcDiscount) {
        var self = this;
        self.productName = '';
        self.productPrice = '';
        self.productsDiscount = '';
        self.productsList = {};
        self.listLength = '';
        self.sorted = [];
        self.pricesSum = 0;
        self.discount = 0;
        self.discountZero = false;
        self.discountPrice = 0;
        $('.header_container').on('click', '.js-adding-button_item', function (e) {
            self.checkProductFields();
            e.preventDefault();
        }).on('click', '.js-removing-button_item', function (e) {
            self.removeProductItems();
            e.preventDefault();
        });
        $('.footer_container').on('click', '.js-discount-button_item', function (e) {
            self.checkDiscountField();
            e.preventDefault();
        });

    }
    else {
        return new CalcDiscount();
    }
}
CalcDiscount.prototype = {
    checkProductFields: function () {
        var self = this;
        self.productName = $('.js-product-input_item').val();
        self.productPrice = $('.js-price-input_item').val();
        if (self.productName != '' && self.productPrice != '') {
            self.addProductItem(self.productName, self.productPrice);
        } else {
            alert('Для добавления товара в корзину, необходимо заполнить поля Продукт и Цена');
        }
    },
    addProductItem: function (name, price) {
        var self = this,
            productTemplate = '<tr class="price_' + price + '">' +
                '<td class="table-container __table-item">' + name + '</td>' +
                '<td class="table-container __table-item">' + price + '</td>' +
                '<td class="table-container __table-item"></td>' +
                '</tr>';
        $('.js-table-container > tbody').append(productTemplate);
        self.productsList[name] = price;
        $('.js-product-input_item').val('');
        $('.js-price-input_item').val('');
        self.pricesSum = 0;
        self.sorted = 0;
        self.sorted = Object.keys(self.productsList).sort(function (a, b) {
            return self.productsList[a] - self.productsList[b]
        });
        for (var i = 0; i < self.sorted.length; i++) {
            self.pricesSum += parseInt(self.sorted[i]);
        }
    },
    removeProductItems: function () {
        var self = this,
            tableHead = '<tr>' +
                '<th class="table-container __table-item">Продукт</th>' +
                '<th class="table-container __table-item">Цена</th>' +
                '<th class="table-container __table-item">Цена со скидкой</th>' +
                '</tr>';
        $('.js-table-container > tbody').html(tableHead);
        $('.js-discount-input_item').val('');
        self.productsList = {};
    },
    checkDiscountField: function () {
        var self = this;
        self.listLength = Object.keys(self.productsList).length;
        self.productsDiscount = $('.js-discount-input_item').val();
        if (self.pricesSum <= self.productsDiscount) {
            alert('Такой скидки не бывает =)');
        }
        else if (self.listLength != 0 && self.productsDiscount != '') {
            self.addDiscount(self.productsDiscount);
        } else if (self.listLength == 0) {
            alert('Для применения скидки, сначала необходимо заполнить поля Продукт и Цена');
        }
        else if (self.productsDiscount == '') {
            alert('Для применения скидки, сначала необходимо ввести значение Скидки');
        }
    },
    addDiscount: function (priceDiscount) {
        var self = this;
        self.discount = 0;
        for (var x = 0; x < self.sorted.length; x++) {
            self.discount = Math.round(parseInt(priceDiscount) / (self.pricesSum / parseInt(self.sorted[x])));
            if (self.discount == 0  && x != (self.sorted.length - 1)) {
                self.discount = 1;
                self.discountZero = true;
            }
            if (self.discountZero && x == (self.sorted.length - 1)) {
                self.discount--;
                self.discountZero = false;
            }
            self.discountPrice = parseInt(self.sorted[x]) - Math.round(self.discount);
            $('tr.price_' + self.sorted[x] + ' > td:last-child').html(self.discountPrice);
        }

    }
};