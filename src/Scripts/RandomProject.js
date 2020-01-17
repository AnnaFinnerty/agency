
import Project from '../Scripts/Project';

function RandomProject(){
    this.projectId = 101;
}

RandomProject.prototype.generateRandomProject = function(company, isStartProject) {
    const id = this.projectId;
    this.projectId += 1;
    const sectors = Object.keys(this.projectSectors);
    const sector = this.randomFromArray(sectors);
    const types = Object.keys(this.projectTypes);
    const type = this.randomFromArray(types);
    const name = company.name + " " + type;
    const shortName = company.shortName + " " + type;
    const requirements = this.projectTypes[type];
    const estimatedMonthsToCompletion = isStartProject ? this.randomBetweenInts(6,18): 0; 
    const monthsActive = isStartProject ? Math.floor(this.randomBetweenInts(0,estimatedMonthsToCompletion)): 0;
    const percentComplete = monthsActive/estimatedMonthsToCompletion;

    const budget = this.randomBetweenInts(5,100);
    const adjustedBudget = budget * 1000;
    const project = new Project(id, company, name,shortName, sector,type, requirements, adjustedBudget, estimatedMonthsToCompletion,monthsActive,percentComplete);
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
        required:['html','css','javascript'],
        optional:['jQuery']
    },
    'web app': {
        required: ['html','css','javascript'],
        optional:['jQuery']
    },
    'mobile app': {
        required: ['html','css','javascript'],
        optional: ['jQuery']
    },
    'data platform': {
        required:['python','sql','javascript'],
        optional: ['jQuery']
    },
}

RandomProject.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

RandomProject.prototype.randomBetweenInts = function(start,end){
    return Math.floor(Math.random()*(end-start)) + start
}

export default RandomProject