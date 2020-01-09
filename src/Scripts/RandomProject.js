
import Project from '../Scripts/Project';
import RandomCompany from '../Scripts/RandomCompany';

function RandomProject(){
    this.projectId = 101;
    this.randomCompany = new RandomCompany();
}

RandomProject.prototype.generateRandomProject = function(company) {
    const id = this.projectId;
    this.projectId += 1;
    company = company ? company : this.randomCompany.generateRandomCompany();
    const sectors = Object.keys(this.projectSectors);
    const sector = this.randomFromArray(sectors);
    const types = Object.keys(this.projectTypes);
    const type = this.randomFromArray(types);
    const name = company.name + " " + type;
    const requirements = this.projectTypes[type];
    const estimatedMonthsToCompletion = this.randomBetweenInts(6,18);
    const budget = this.randomBetweenInts(5,100);
    const adjustedBudget = budget * 1000;
    const project = new Project(id, company, name, sector,type, requirements, adjustedBudget, estimatedMonthsToCompletion);
    return project
}

RandomProject.prototype.projectSectors = {
    'healthcare': {
        minCost: 2,
        maxCost: 5,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
    'finance': {
        minCost: 5,
        maxCost: 10,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
    'housing': {
        minCost: 2,
        maxCost: 5,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
    'local business': {
        minCost: 1,
        maxCost: 3,
        minDesign: 2,
        maxDesign: 5,
        firstwords: [],
        secondwords: [],
    },
}

RandomProject.prototype.projectTypes = {
    'website': {
        required:{
            frontend: ['html','css','javascript']
        },
        optional:{
            frontend: ['jQuery']
        }
    },
    'web app': {
        required:{
            frontend: ['html','css','javascript']
        },
        optional:{
            frontend: ['jQuery']
        }
    },
    'mobile app': {
        required:{
            frontend: ['html','css','javascript']
        },
        optional:{
            frontend: ['jQuery']
        }
    },
    'data platform': {
        required:{
            frontend: ['html','css','javascript']
        },
        optional:{
            frontend: ['jQuery']
        }
    },
}

RandomProject.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

RandomProject.prototype.randomBetweenInts = function(start,end){
    return Math.floor(Math.random()*(end-start)) + start
}

export default RandomProject