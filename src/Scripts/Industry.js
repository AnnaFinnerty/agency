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
    for(let i =0; i < this.startCompetitors; i++){
        const client = this.randomCompany.generateRandomCompany();
        this.clients.push(client);
    }
}
Industry.prototype.monthlyUpdate = function(){
    for(let i = 0; i < this.competitors.length; i++){
        //check if competitor has failed
        //otherwise update competitors
    }
}
Industry.prototype.newProject = function(isStartProject){
    const r = Math.random();
    let client;
    if(r < .2 || !this.competitors.length){
        client = this.randomCompany.generateRandomCompany();
        this.clients.push(client);
    } else {
        client = this.clients[Math.floor(Math.random()*this.clients.length)]
    }
    const project = this.randomProject.generateRandomProject(client,isStartProject);
    return project
}

export default Industry