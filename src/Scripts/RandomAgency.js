import Agency from './Agency';
import Helpers from './Helpers';

function RandomAgency(){
    this.icons = ['compass','coffee','cut','sitemap']
    this.helpers = new Helpers();
}

RandomAgency.prototype.generateRandomAgency = function(isFake){
    const name = this.randomAgencyName();
    // const icon = this.helpers.randomFromArray(this.icons);
    const agency = new Agency(name);
    return agency
}

RandomAgency.prototype.randomAgencyName = function(){
    const firstWords = ["Inspire", "Revolution","Energize","Creative"];
    const secondWords = ["Digital", "Software", "Intelligence","Solutions"];
    const r = Math.random();
    const first = this.helpers.RandomFromArray(firstWords);
    const second = this.helpers.RandomFromArray(secondWords);
    if(r < .5){
        return first + " " + second
    } else {
        return second + " " + first
    }
}

export default RandomAgency