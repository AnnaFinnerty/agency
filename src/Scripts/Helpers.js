function Helpers(){}

Helpers.prototype.RandomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

Helpers.prototype.RandomBetweenInts = function(start,end){
    return Math.floor(Math.random()*(end-start)) + start
}

//find a random number of items from an array, without repeating
Helpers.prototype.XRandomWithoutRepeats = function(arr,x){
    const tempArr = [];
    tempArr.fill(0,arr.length-1);
    for(let i = 0; i < x; i++){
        const r = Math.floor(Math.random()*tempArr);

    }
}

Helpers.prototype.monify = function(num){
   return '$' + num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

export default Helpers