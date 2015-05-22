function update_inputs(inputs,new_inputs) {

    for ( i=0; i<inputs.length; i++ ) {

        var barcode = inputs[i].indexOf('-')>-1 ? inputs[i].split('-')[0]  : inputs[i];
        var count = inputs[i].indexOf('-')>-1 ? inputs[i].split('-')[1] : 1;

        var exist = false;
		var real_count ;
        for ( j=0; j<new_inputs.length; j++) {
            if ( inputs[i] === new_inputs[j].barcode) {
                new_inputs[j].count += count;
                new_inputs[j].real_count += count;
                exist = true;
                break;
                }
            }
            if (!exist) {
                var new_item = {};
                new_item.barcode = barcode;
                new_item.count = count;
                new_item.real_count = count;
                new_inputs.push(new_item);
            }
    }
    return new_inputs;
}

function update_new_inputs(new_inputs,all_items) {
    for ( i=0; i<new_inputs.length; i++ ) {
        for ( j=0; j<all_items.length; j++) {
            if ( new_inputs[i].barcode === all_items[j].barcode ) {
                new_inputs[i].name = all_items[j].name;
                new_inputs[i].unit = all_items[j].unit;
                new_inputs[i].price = all_items[j].price;
                break;
                }
            }
        }
    return new_inputs;
}

function update_new_inputs_list(new_inputs,reduce_list){
    for( i=0; i<new_inputs.length; i++) {
    	for ( j = 0; j < reduce_list.length; j++) {
            var reduce_count = new_inputs[i].real_count;
            if (new_inputs[i].barcode === reduce_list[j] && reduce_count>2 ) {
                new_inputs[i].real_count -= Math.floor(new_inputs[i].real_count/3);

            }
        }
    }

    return new_inputs;
}

function cal_total_price(total_price,new_inputs) {

    for (i=0; i<new_inputs.length; i++) {

        total_price += new_inputs[i].price*new_inputs[i].real_count;

    }
    return total_price;
}

function shopping_list(new_inputs) {

    var expectText ='***<没钱赚商店>购物清单***\n' ;
    for (i=0; i<new_inputs.length; i++) {

        var subtotal = (new_inputs[i].price*new_inputs[i].real_count).toFixed(2);
        var count_unit = new_inputs[i].count+new_inputs[i].unit;

       	expectText = expectText +
        '名称：'+ new_inputs[i].name + '，' +
        '数量：'+ count_unit + '，' +
        '单价：'+ new_inputs[i].price.toFixed(2) + '(元)，' +
        '小计：'+ subtotal+'(元)\n';

    }
    return expectText;
}

function cal_reduce_price (new_inputs) {
    var reduce_price = 0;
    for ( i=0; i<new_inputs.length; i++) {
        if (new_inputs[i].real_count != new_inputs[i].count) {
            reduce_price +=  Math.floor(new_inputs[i].count/3)* new_inputs[i].price;

            }
        }
    return reduce_price;
}
function song_shopping_list(new_inputs) {
    var result_reduce = '----------------------\n'+
                        '挥泪赠送商品：\n';

    for ( i=0; i<new_inputs.length; i++) {
        if (new_inputs[i].real_count!=new_inputs[i].count) {

            var reduce_count_list =  Math.floor(new_inputs[i].count/3) + new_inputs[i].unit;

            result_reduce=result_reduce+
            '名称：'+ new_inputs[i].name + '，' +
            '数量：'+ reduce_count_list +'\n';
        }
    }
    return result_reduce ;

}

function result_sum_price (total_price,reduce_price) {

    var result_sum_price = '----------------------\n'+
                           '总计：'+total_price.toFixed(2)+'(元)\n'+
                           '节省：'+reduce_price.toFixed(2)+'(元)\n'+
                           '**********************';

    return result_sum_price;

}

function printInventory(inputs) {

    var  all_items = loadAllItems();
    var  new_inputs = [];
    var  item_num = [];
	var  i,j;
    new_inputs = update_inputs(inputs,new_inputs);
    new_inputs = update_new_inputs(new_inputs,all_items);

    var promotions = loadPromotions();
    var reduce_list = promotions[0].barcodes;
    new_inputs = update_new_inputs_list(new_inputs,reduce_list);

    var total_price = 0 ;
    var result = '';
    var real_count = 0;
    total_price = cal_total_price(total_price,new_inputs);
    result += shopping_list(new_inputs);
    result += song_shopping_list(new_inputs);
    reduce_price = cal_reduce_price (new_inputs);
    result += result_sum_price (total_price,reduce_price);

    console.log(result)

}
