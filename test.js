

var myArr = ["x","x","x","o","o","x","x","o","o","o",]

var newArr = myArr.map(function(item, i,arr){
    console.log(item)
    
    if(item == arr[i+1]) console.log("-") 
    
})