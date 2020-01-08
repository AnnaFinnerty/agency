const RandomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

const RandomBetweenInts = function(start,end){
    return Math.floor(Math.random()*(end-start)) + start
}

//find a random number of items from an array, without repeating
const XRandomWithoutRepeats = function(arr,x){
    const tempArr = [];
    tempArr.fill(0,arr.length-1);
    for(let i = 0; i < x; i++){
        const r = Math.floor(Math.random()*tempArr);

    }
}

export default {RandomFromArray, RandomBetweenInts, XRandomWithoutRepeats}