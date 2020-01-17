import RandomAgency from './RandomAgency';
import RandomCompany from './RandomCompany';
import RandomProject from './RandomProject';

function Industry(){
    this.clients = [];
    this.competitors = [];
    this.startCompetitors = 2;
    this.maxCompetitors = 5;
    this.randomCompany = new RandomCompany();
    this.randomAgency = new RandomAgency();
    this.randomProject = new RandomProject();
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
}

Industry.prototype.newProject = function(startProject){
    const r = Math.random();
    let client;
    if(r < .2 || !this.competitors.length){
        client = this.randomCompany.generateRandomCompany();
        this.clients.push(client);
    } else {
        client = this.competitors[Math.floor(Math.random()*this.competitors.length)]
    }
    const project = this.randomProject.generateRandomProject(client,true);
    return project
}

export default Industry