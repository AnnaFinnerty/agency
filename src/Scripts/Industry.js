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
    console.log('clients',this.clients)
}

Industry.prototype.newProject = function(isStartProject){
    console.log('new project in industry');
    console.log('clients',this.clients)
    const r = Math.random();
    let client;
    if(r < .2 || !this.competitors.length){
        client = this.randomCompany.generateRandomCompany();
        this.clients.push(client);
    } else {
        client = this.clients[Math.floor(Math.random()*this.clients.length)]
    }
    console.log('new project client',client)
    const project = this.randomProject.generateRandomProject(client,isStartProject);
    return project
}

export default Industry