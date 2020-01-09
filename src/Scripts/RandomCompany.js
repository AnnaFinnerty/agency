function RandomCompany(){
    this.usedNames = [];
}

RandomCompany.prototype.generateRandomCompany = function(){
    const sectors = Object.keys(this.projectSectors);
    return{
        name: this.randomCompanyName(),
        sector: this.randomFromArray(sectors)
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

RandomCompany.prototype.projectSectors = {
    'healthcare': {
        minCost: 2,
        maxCost: 5,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
    'finance': {
        minCost: 5,
        maxCost: 10,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
    'housing': {
        minCost: 2,
        maxCost: 5,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
    'local business': {
        minCost: 1,
        maxCost: 3,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
}

RandomCompany.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

export default RandomCompany