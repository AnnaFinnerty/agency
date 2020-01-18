import Helpers from './Helpers';

function RandomEmail(){
    console.log('random email running');
    this.helpers = new Helpers();
}

RandomEmail.prototype.generateRandomEmail = function(boss,employee1,employee2){
    //emails from the boss get priority
    if(boss.stats.happiness > 60 || boss.stats.happiness < 30){
        return this.bossEmail()
    } else {
        if(employee1.stats.happiness > 80){

        }
    }
}

RandomEmail.prototype.generateEmail = function(type,employee1,employee2){
    let text;
    let subject = 'Hello';
    let sender = employee1;
    //bring in time
    const time =  new Date().toLocaleString();
    switch(type){

        case 'start':
            text = 'Hey, thanks for taking over the personnel decisions. Sure it shouldn\'t be too hard!';
            break 

        case 'applicant':
            return this.applicantEmail(employee1)

        case 'project':
            return this.projectEmail(employee1,employee2)

        case 'welcome':
            return this.welcomeEmail(employee1);

        case 'quit':
            return this.quitEmail(employee1);

        default: 
            return this.junkEmail(employee1); 
    }
    const email = {
        subject: subject,
        text: text,
        sender: sender,
        time: time,
        read: false
    }
    return email
}

RandomEmail.prototype.junkEmail = function(employee){
    const junkSubject = ["Happy Birthday to " + employee.name.first,'Hike this weekend'];
    const junkBody = ["Hey, it's " + employee.name.display + " 's birthday","Hey, anybody up for a hike this weekend?"];
    const email = {
        subject: this.helpers.RandomFromArray(junkSubject),
        text: this.helpers.RandomFromArray(junkBody),
        sender: employee,
        time: new Date().toLocaleString(),
        read: false
    }
    return email;
}

RandomEmail.prototype.suggestionEmail = function(employee){
    const suggestionSubject = ["Happy Birthday to " + employee.name.first,'Hike this weekend'];
    const suggestionBody = ["Hey, it's " + employee.name.display + " 's birthday","Hey, anybody up for a hike this weekend?"];
    const email = {
        subject: 'junk',
        text: suggestionBody[Math.floor(Math.random()*suggestionBody.length)],
        sender: employee,
        time: new Date().toLocaleString(),
        read: false,
        consider: true
    }
    return email;
}

RandomEmail.prototype.applicantEmail = function(employee){
    const applicantSubject = ["Application", 'Open Position','Your job posting','I need a job'];
    const applicantBody = [
        "Hello, my name is " + employee.name.display + " and I would like to apply for a position at your company. Attached, pleased find my resume and cover letter",
        "Hi there, I saw your post advertising and open position. Thanks for considering me!",
        "Regards, attached please find my resume for your positing of an open position. Thank you for your consideration"
    ];
    const email = {
        subject: this.helpers.RandomFromArray(applicantSubject),
        text: this.helpers.RandomFromArray(applicantBody),
        sender: employee,
        time: new Date().toLocaleString(),
        read: false,
        consider: true,
        target: employee
    }
    return email;
}

RandomEmail.prototype.projectEmail = function(project){
    const email = {
        subject: "New project for " + project.company.name,
        text: "Does your company have the bandwidth to complete a new " + project.type + " for " +project.company.name + "?",
        sender: project.company.rep,
        time: new Date().toLocaleString(),
        read: false,
        consider: true,
        target: project
    }
    return email;
}

RandomEmail.prototype.welcomeEmail = function(employee){
    const email = {
        subject: 'Thanks again',
        text: "Hey, thanks for taking over the personnel decisions. Sure it shouldn't be too hard!",
        sender: employee,
        time: new Date().toLocaleString(),
        read: false
    }
    return email;
}

RandomEmail.prototype.quitEmail = function(employee){
    const quitSubject = ['I quit',"I'm out",'Notice of resignation',"Can't take it"]
    const quitBody = [
        "I quit. Sincerely, " + employee.name.display,
        "Sorry, I just hate it here. I quit. ",
    ];
    const email = {
        subject: this.helpers.RandomFromArray(quitSubject),
        text: this.helpers.RandomFromArray(quitBody),
        sender: employee,
        time: new Date().toLocaleString(),
        read: false
    }
    return email;
}

RandomEmail.prototype.happyEmail = function(employee){
    const happySubject = ["Great news",'Announcement',"Let's celebrate"];
    const happyBody = [
        "Great news!, " + employee.name.display + ' is having a baby!', 
    ];
    const email = {
        subject: this.helpers.RandomFromArray(happySubject),
        text: this.helpers.RandomFromArray(happyBody),
        sender: employee,
        time: new Date().toLocaleString(),
        read: false
    }
    return email;
}

RandomEmail.prototype.bossEmail = function(boss){
    const bossSubject = [];
    const bossBody = [
        "Boss email",
    ];
    const email = {
        subject: this.helpers.RandomFromArray(bossSubject),
        text: this.helpers.RandomFromArray(bossBody),
        sender: boss,
        time: new Date().toLocaleString(),
        read: false
    }
    return email;
}

RandomEmail.prototype.newProjectEmail = function(project,company){
    
}

export default RandomEmail