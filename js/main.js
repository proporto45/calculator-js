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
        var adding_action_one, adding_action_two;
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
            adding_action_one = parseInt(self.sorted[i]);
            adding_action_two = self.productsList[adding_action_one];
            self.pricesSum += parseInt(adding_action_two);
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
        self.productsDiscount = parseInt(self.productsDiscount);
        if (self.pricesSum <= self.productsDiscount) {
            alert('Такой скидки не бывает =)');
        }
        else if (self.listLength != 0 && self.productsDiscount != '') {
            self.addDiscount();
        } else if (self.listLength == 0) {
            alert('Для применения скидки, сначала необходимо заполнить поля Продукт и Цена');
        }
        else if (self.productsDiscount == '') {
            alert('Для применения скидки, сначала необходимо ввести значение Скидки');
        }
    },
    addDiscount: function () {
        var self = this;
        self.productsDiscount = parseInt(self.productsDiscount);
        var action_one, action_two, action_three, action_length;
        action_length = self.sorted.length;
        for (var x = 0; x < action_length; x++) {
            action_one = parseInt(self.sorted[x]);
            action_two = parseInt(self.productsList[action_one]);
            action_three = self.pricesSum / action_two;
            self.discount = Math.round(self.productsDiscount / action_three);
             if (x == (action_length - 1) && self.discountZero) {
                self.discount--;
                self.discountZero = false;
                 console.log(self.discountZero);
            }
            else if (self.discount == 0 && x != (self.sorted.length - 1)) {
                self.discountZero = true;
                console.log(self.discountZero);
                self.discount++;
            }
            self.discountPrice = action_two - self.discount;
            console.warn(self.sorted);
            $('tr.price_' + action_two + ' > td:last-child').html(self.discountPrice);
        }

    }
};