//TODO: Please write code in this file.
function printInventory(inputs) {

    var  sum_list=[];
     for (var i = 0; i < inputs.length; i++) {
            var exist=false;

            var barcode=inputs[i].length>11?inputs[i].substring(0,10):inputs[i];
            var count=inputs[i].length>11?parseInt(inputs[i].substring(11)):1;

            for (var x = 0; x < all_items.length; x++) {
                if(all_items[x].barcode===barcode){
                    for (var y = 0; y < sum_list.length; y++) {
                        if (all_items[x].name===sum_list[y].name) {
                            sum_list[y].count=sum_list[y].count+count;
                            sum_list[y].reduce=sum_list[y].reduce+count;
                            exist=true;
                            break;
                        }
                    }
                    if (!exist) {
                        all_items[x].count=count;
                        all_items[x].reduce=count;

                        sum_list.push(all_items[x]);
                    }
                }
            }
        }


    var promotions=[
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
    reduce_list=promotions[0].barcodes;

        for (var i = 0; i < sum_list.length; i++) {
            for (var j = 0; j < reduce_list.length; j++) {
                if (sum_list[i].barcode===reduce_list[j]) {
                    if (sum_list[i].reduce>2) {
                        sum_list[i].reduce=sum_list[i].reduce-Math.floor(sum_list[i].reduce/3);
                    }
                }
            }
        }



     var expectText ='***<没钱赚商店>购物清单***\n' ;
    var total_price=0 ;
        for (var i = 0; i < sum_list.length; i++) {

            var subtotal=(sum_list[i].price*sum_list[i].reduce).toFixed(2);
            var count_unit=sum_list[i].count+sum_list[i].unit;

           	expectText= expectText +
            '名称：'+ sum_list[i].name + '，' +
            '数量：'+ count_unit + '，' +
            '单价：'+ sum_list[i].price.toFixed(2) + '(元)，' +
            '小计：'+ subtotal+'(元)\n';

    		total_price+= sum_list[i].price*sum_list[i].reduce;

        }


    var result_reduce='----------------------\n'+'挥泪赠送商品：\n';
    var reduce=0;
        for (var q = 0;q < sum_list.length; q++) {
            if (sum_list[q].reduce!=sum_list[q].count) {

                var reduce_count_list = (sum_list[q].count-sum_list[q].reduce)+sum_list[q].unit;

                result_reduce=result_reduce+
                '名称：'+ sum_list[q].name + '，' +
                '数量：'+ reduce_count_list +'\n';


    			var reduce=reduce+(sum_list[q].count-sum_list[q].reduce)*sum_list[q].price;
            }
        }


    var result_sum_price;
        result_sum_price='----------------------\n'+'总计：'+total_price.toFixed(2)+'(元)\n';
        result_sum_price=result_sum_price+'节省：'+reduce.toFixed(2)+'(元)\n';
        result_bottom='**********************';

    result =expectText+result_reduce+result_sum_price+result_bottom;
    console.log(result)




}
