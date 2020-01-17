import RandomProject from './RandomProject';

class Company{
    constructor(name, shortName, sector, icon){
        this.name = name;
        this.shortName = shortName;
        this.sector = sector;
        this.icon = icon;
        this.activeProject = null;
        this.completedProjects = 0;
        this.satisfaction = 50;
        this.quit = false;

    }
    newProject(){
        this.activeProject = new RandomProject();
    }
    completeProject(){
        this.completedProjects+= 1;
        this.activeProject = null;
    }
    cancelProject(){
        this.activeProject = null;
        if(this.satisfaction === 0){
            this.quit = true;
        }
    }
}

export default Company