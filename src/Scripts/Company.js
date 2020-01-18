class Company{
    constructor(name, shortName, sector, icon, rep){
        this.name = name;
        this.shortName = shortName;
        this.sector = sector;
        this.icon = icon;
        this.activeProject = null;
        this.completedProjects = 0;
        this.satisfaction = 50;
        this.quit = false;
        this.rep = rep;
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