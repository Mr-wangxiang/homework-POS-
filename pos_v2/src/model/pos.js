var Pos = (function() {
    function Pos() {

    }
    Pos.prototype.scan = function(tag) {
        var tag_array = tag.split('-');
        tag_array[1] = parseFloat(tag_array[1]) || 1;
        return {
            barcode: tag_array[0],
            count: tag_array[1]
        };
    };

    Pos.prototype.print_paid_items_string = function(cart) {
        var tool = new Tool();
        var expectText = '***<没钱赚商店>购物清单***\n' +
            '打印时间：' + tool.print_the_time() + '\n' +
            '----------------------\n';
        (cart.cartitems).forEach(function(cartitem) {
            var cart_item = cartitem.get_item_by_barcode()
            var count_add_unit = cartitem.count + cart_item.unit;

            expectText += '名称：' + cart_item.name + '，' +
                '数量：' + count_add_unit + '，' +
                '单价：' + cart_item.price.toFixed(2) + '(元)，' +
                '小计：' + cartitem.get_subtotal().toFixed(2) + '(元)\n';
        });
        return expectText;
    };

    Pos.prototype.print_gift_items_string = function(cart) {
        var expectText = '----------------------\n' +
            '挥泪赠送商品：\n';
        (cart.cartitems).forEach(function(cartitem) {
            if (cartitem.is_promotion()) {
                var promotion = cartitem.get_item_by_barcode();
                var count = cartitem.get_promotion_count() + promotion.unit;

                expectText += '名称：' + promotion.name + '，' +
                              '数量：' + count + '\n';
            }
        });
        return expectText;
    };

    Pos.prototype.print_sum_price_string = function(cart) {

        var expectText = '----------------------\n' +
            '总计：' + cart.get_sum().toFixed(2) + '(元)\n' +
            '节省：' + cart.get_promotion_sum().toFixed(2) + '(元)\n' +
            '**********************';
        return expectText;
    };

    Pos.prototype.print_goods_list = function(cart) {
        var expectText = this.print_paid_items_string(cart);
        expectText += this.print_gift_items_string(cart);
        expectText += this.print_sum_price_string(cart);
        return expectText;
    };
    return Pos;
})();
