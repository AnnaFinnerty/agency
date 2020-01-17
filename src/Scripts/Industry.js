import RandomAgency from './RandomAgency';
import RandomCompany from './RandomCompany';


function Industry(){
    this.clients = [];
    this.competitors = [];
    this.startCompetitors = 2;
    this.maxCompetitors = 5;
    this.randomCompany = new RandomCompany();
    this.randomAgency = new RandomAgency();
    this.awake();
}

Industry.prototype.awake = function(){
    for(let i =0; i < this.startCompetitors; i++){
        const competitor = this.randomAgency.generateRandomAgency();
        this.competitors.push(competitor);
    }
    console.log('competitors',this.competitors)
    for(let i =0; i < this.startCompetitors; i++){
        const client = this.randomCompany.generateRandomCompany();
        this.clients.push(client);
    }
    console.log('competitors',this.competitors)
    console.log('clients',this.clients)
}

Industry.prototype.newProject = function(){
    const r = Math.random();
    
}

export default Industry