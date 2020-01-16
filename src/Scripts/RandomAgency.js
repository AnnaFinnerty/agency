import Helpers from './Helpers';

function RandomAgency(){
    this.icons = ['compass','coffee','cut','sitemap']
    this.helpers = new Helpers();
}

RandomAgency.prototype.generateRandomAgency = (isFake) => {
    // const name = this.randomAgencyName();
    // const icon = this.helpers.randomFromArray(this.icons);
    return {}
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

export default RandomAgency