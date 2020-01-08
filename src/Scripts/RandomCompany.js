function RandomCompany(){
    this.usedNames = [];
}

RandomCompany.prototype.generateRandomCompany = function(){
    return{
        name: this.randomCompanyName()
    }
}

RandomCompany.prototype.randomCompanyName = () => {
    const first = ["Inspire", "Revolution"];
    const second = ["Digital", "Software", "Intelligence"];
    const r = Math.random();
    if(r < .5){
        return first + " " + second
    } else {
        return second + " " + first
    }
}

export default RandomCompany