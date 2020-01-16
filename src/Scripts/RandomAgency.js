import Agency from './Agency';
import Helpers from './Helpers';

function RandomAgency(){
    this.icons = ['compass','coffee','cut','sitemap']
    this.helpers = new Helpers();
}

RandomAgency.prototype.generateRandomAgency = function(isFake){
    const name = this.randomAgencyName();
    // const icon = this.helpers.randomFromArray(this.icons);
    const agency = new Agency();
    return agency
}

RandomAgency.prototype.randomAgencyName = function(){
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