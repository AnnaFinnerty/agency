import Agency from './Agency';
import RandomCompany from './RandomCompany';


function Industry(){
    this.clients = [];
    this.competitors = [];
    this.startCompetitors = 2;
    this.maxCompetitors = 5;
    this.awake();
}

Industry.prototype.awake = function(){
    for(let i =0; i < this.startCompetitors; i++){
        const competitor = new Agency();
        this.competitors.push(competitor);
    }
    console.log('competitors',this.competitors)
    for(let i =0; i < this.startCompetitors; i++){
        const client = new RandomCompany();
        this.clients.push(client);
    }
    console.log('competitors',this.competitors)
    console.log('clients',this.clients)
}

export default Industry