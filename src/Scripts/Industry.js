import Agency from './Agency';

function Industry(){
    this.clients = [];
    this.competitors = [];
    this.startCompetitors = 2;
    this.maxCompetitors = 5;
}

Industry.prototype.awake = function(){
    for(let i =0; i < this.startCompetitors; i++){
        const competitor = new Agency();
        this.competitors.push(competitor);
    }
    console.log('competitors',this.competitors)
}

export default Industry