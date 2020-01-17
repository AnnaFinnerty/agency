class Company{
    constructor(name, shortName, sector, icon){
        this.name = name;
        this.shortName = shortName;
        this.sector = sector;
        this.icon = icon;
        this.activeProject = null;
        this.completedProjects = 0;
        this.happiness = 5;

    }
    startProject(){

    }
    completeProject(){
        this.completedProjects+= 1;
    }
    cancelProject(){
        this.activeProject = false;
    }
}

export default Company