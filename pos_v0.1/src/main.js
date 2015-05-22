//TODO: Please write code in this file.
function printInventory(inputs) {

    var array = [];

    	for ( var i=0; i<inputs.length; i++ )
    	{
    		var exist = false ;
    		for ( var j=0; j<array.length; j++ )
    		{
    			if ( array[j].name == inputs[i].name )
    			{
    				array[j].count++;
    				exist = true;
                    break;
    			}
    		}
    		if (!exist)
    		{
    			var temp ={};
    			temp.name = inputs[i].name ;
    			temp.barcode =inputs[i].barcode;
    			temp.unit = inputs[i].unit;
    			temp.price = inputs[i].price.toFixed(2) ;
    			temp.count = 1;
    			array.push(temp);
    		}
    	}

        var sum = 0;
        var expectText = '***<没钱赚商店>购物清单***\n' ;

    	for ( var i=0; i<array.length;i++ )
        {

    		sum+=array[i].count*array[i].price;

            expectText +='名称：'+array[i].name+'，'+
            '数量：'+array[i].count+array[i].unit+'，'+
            '单价：'+array[i].price+'(元)，'+
            '小计：'+(array[i].price*array[i].count).toFixed(2)+'(元)\n';

    	}

        expectText += '----------------------\n' +
    	              '总计：'+sum.toFixed(2)+'(元)\n' +
    	              '**********************'

        console.log(expectText);

}
