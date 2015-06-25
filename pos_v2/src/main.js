function printInventory(collection) {
    var pos = new Pos();
    var cart = new Cart();
    (collection).forEach(function (tag) {
        cart.add(pos.scan(tag));
    });
    console.log(pos.print_goods_list(cart));
}
