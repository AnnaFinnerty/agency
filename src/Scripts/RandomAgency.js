function RandomAgency(){

}

RandomAgency.prototype.createRandomAgency = (isFake) => {
    const name = this.randomAgencyName();
    
}

RandomAgency.prototype.randomAgencyName = () => {
    const first = ["Inspire", "Revolution"];
    const second = ["Digital", "Software", "Intelligence"];
    const r = Math.random();
    if(r < .5){
        return first + " " + second
    } else {
        return second + " " + first
    }
}