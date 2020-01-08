class Employee{
    constructor(id, name, gender,age,level, skillset, stats, salary){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.level = level;
        this.skillset = skillset;
        this.stats = stats;
        this.salary = salary;
    }
    printInfo(){
        console.log("employee info");
        console.log(this.name);
        console.log('gender:',this.gender);
        console.log('age:',this.age);
        console.log('level:',this.level);
        console.log('job', this.job);
        console.log('stats:', this.stats)
        console.log('salary', "$"+ this.salary);
    }
}

export default Employee