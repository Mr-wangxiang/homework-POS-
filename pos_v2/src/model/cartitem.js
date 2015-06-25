function CartItem(barcode,count) {
    this.barcode = barcode;
    this.count = count;
}
CartItem.prototype.get_item_by_barcode = function () {
    var all_items = loadAllItems();
    var barcode = this.barcode;
    var result;
    (all_items).forEach(function (item) {
        if (item.barcode === barcode) {
            result = item;
        }
    });
    return result;
};
CartItem.prototype.get_promotion_count = function () {
    var barcode = this.barcode;
    var count = this.count;
    var promotion_count = 0;
    var promotions = loadPromotions();
    for (var i = 0; i < promotions.length; i++) {
        var promotion = promotions[i];
        if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
            promotion.barcodes.forEach(function (promotion_barcode) {
                if (barcode === promotion_barcode) {
                    promotion_count = parseInt(count / 3);
                }
            });

        }
        return promotion_count;
    }
};
CartItem.prototype.get_subtotal = function () {
    return (this.count - this.get_promotion_count()) * this.get_item_by_barcode().price;
};
CartItem.prototype.get_promotion_subtotal = function () {
    return this.get_promotion_count() * this.get_item_by_barcode().price;
};
CartItem.prototype.is_promotion = function () {
    return this.get_promotion_count() ? true : false;
};
