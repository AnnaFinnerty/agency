function RandomCompany(){
    this.usedNames = [];
}

RandomCompany.prototype.generateRandomCompany = function(){
    return{
        name: this.randomCompanyName()
    }
}

RandomCompany.prototype.randomCompanyName = function(){
    const firstWords = ["Inspire", "Revolution"];
    const secondWords = ["Digital", "Software", "Intelligence"];
    const r = Math.random();
    const first = this.randomFromArray(firstWords);
    const second = this.randomFromArray(secondWords);
    if(r < .5){
        return first + " " + second
    } else {
        return second + " " + first
    }
}

RandomCompany.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

export default RandomCompany