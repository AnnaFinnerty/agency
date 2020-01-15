function RandomCompany(){
    this.usedNames = [];
    this.icons = ['arrows alternate','chart line','cloud download','location arrow','random',
                  'share square', 'bullhorn', 'certificate',
                ]
}

RandomCompany.prototype.generateRandomCompany = function(){
    const sectors = Object.keys(this.projectSectors);
    const names = this.randomCompanyName();
    return{
        name: names.name,
        shortName: names.shortName,
        sector: this.randomFromArray(sectors),
        icon: this.randomFromArray(this.icons)
    }
}

RandomCompany.prototype.randomCompanyName = function(){
    const firstWords = ["Inspire", "Revolution", "Domain"];
    const secondWords = ["Digital", "Software", "Intelligence"];
    const r = Math.random();
    const first = this.randomFromArray(firstWords);
    const second = this.randomFromArray(secondWords);
    const short = first[0] + second[0];
    let name;
    if(r < .5){
        name = first + " " + second
    } else {
        name = second + " " + first
    }
    return {
        name: name,
        shortName: short,
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