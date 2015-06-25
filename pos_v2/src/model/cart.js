function Cart() {
    this.cartitems = [];
}
Cart.prototype.add = function (temp) {
    var exsit = false;
    this.cartitems.forEach(function (cartitem) {
        if (cartitem.barcode === temp.barcode) {
            cartitem.count += temp.count;
            exsit = true;
        }
    });
    if (!exsit) {
        this.cartitems.push(new CartItem(temp.barcode,temp.count));
    }
}
Cart.prototype.get_sum = function () {
    var sum = 0;
    this.cartitems.forEach(function (cartitem) {
        sum += cartitem.get_subtotal();
    });
    return sum;
};
Cart.prototype.get_promotion_sum = function () {
    var sum = 0;
    this.cartitems.forEach(function (cartitem) {
        sum += cartitem.get_promotion_subtotal();
    });
    return sum;
};
