//TODO: Please write code in this file.
function printInventory(inputs) {
    var expectText ='***<没钱赚商店>购物清单***\n';
    var sum=0;
    for(var i=0; i< inputs.length; i++){
            //得到数组i个子集和inputs[i]
            //取得子集和的每个元素 如：取到名称--inputs[i].name;
            sum += inputs[i].price*inputs[i].count;
            expectText +='名称：'+inputs[i].name+'，'+'数量：'+inputs[i].count+inputs[i].unit+'，单价：'+inputs[i].price.toFixed(2)+'(元)，小计：'+(inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';

        }
    expectText +='----------------------\n' +
    	'总计：'+sum.toFixed(2)+'(元)\n' +

    	'**********************';
    console.log(expectText);
}
