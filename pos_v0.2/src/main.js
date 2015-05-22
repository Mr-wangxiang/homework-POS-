//TODO: Please write code in this file.
function printInventory(inputs) {

    var allItems = loadAllItems();
    var array = [];

    for ( var i=0; i<inputs.length; i++ )
    {
    	for ( var j=0; j<allItems.length; j++)
    	{
    		if ( inputs[i] == allItems[j].barcode )
    		{
    			var exist = false ;

    			for ( var x=0; x<array.length; x++ )
    			{
    					if ( array[x].name == allItems[j].name )
    					{
    						array[x].count++;
    						exist = true;
                            break;
    					}
		        }

    				if (!exist)
    				{
    					var temp ={};
    					temp.barcode =allItems[j].barcode;
    					temp.name = allItems[j].name ;
    					temp.unit = allItems[j].unit;
    					temp.price = allItems[j].price.toFixed(2) ;
    					temp.count = 1;
    					array.push(temp);
    				}
    		}
    	}
    }

    var expectText ='***<没钱赚商店>购物清单***\n' ;
    var sum = 0;

	for ( var i=0; i<array.length; i++ )
    {

		sum += array[i].count*array[i].price;

        expectText += '名称：'+array[i].name+'，'+
        '数量：'+array[i].count+array[i].unit+'，'+
        '单价：'+array[i].price+'(元)，'+
        '小计：'+(array[i].price*array[i].count).toFixed(2)+'(元)\n';

	}

    expectText += '----------------------\n' +
    	          '总计：'+sum.toFixed(2)+'(元)\n' +
    	          '**********************'
    
    console.log(expectText);

}
