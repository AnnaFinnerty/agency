import Helpers from './Helpers';

function RandomEmail(){
    this.helpers = new Helpers();
}

RandomEmail.prototype.generateRandomEmail = function(boss,employee1,employee2,time){
    //emails from the boss get priority
    const r = Math.random();
    if(r < .1){
        if(boss.stats.happiness > 60 || boss.stats.happiness < 30){
            return this.bossEmail(boss)
        } else {
            return this.generateEmail(null,employee1,employee1,time)
        }
    } else if (r<.5 && r > .1 ) {
        if(employee1.stats.happiness > 80){
            //MTC needs to be replaced!
            return this.happyEmail(employee1,time);
        } else if (employee1.stats.happiness < 40) {
            return this.complaintEmail(employee1,employee2,time);
        } else {
            return this.requestEmail(employee1,time);
        }
    } else {
        return this.generateEmail(null,employee1,employee2,time);
    }
}

RandomEmail.prototype.generateEmail = function(type,employee1,employee2,time){
    console.log('gen email');
    console.log(time);
    let text;
    let subject = 'Hello';
    let sender = employee1;
    //bring in time
    // const time =  new Date().toLocaleString();
    switch(type){

        case 'start':
            text = 'Hey, thanks for taking over the personnel decisions. Sure it shouldn\'t be too hard!';
            break 

        case 'applicant':
            return this.applicantEmail(employee1,time)

        case 'project':
            return this.projectEmail(employee1,time)

        case 'complete':
            return this.completeEmail(employee1,employee2,time)

        case 'welcome':
            return this.welcomeEmail(employee1,time);

        case 'quit':
            return this.quitEmail(employee1,time);

        default: 
            return this.junkEmail(employee1,time); 
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

RandomEmail.prototype.junkEmail = function(employee,time){
    const junkSubject = ["Happy Birthday to " + employee.name.first,'Hike this weekend'];
    const junkBody = ["Hey, it's " + employee.name.display + " 's birthday","Hey, anybody up for a hike this weekend?"];
    const r = this.helpers.RandomBetweenInts(0,junkBody.length);
    const email = {
        subject: junkSubject[r],
        text: junkBody[r],
        sender: employee,
        time: time,
        type: "request",
        subtype: "junk",
        read: false,
        importance: 0,
    }
    return email;
}

RandomEmail.prototype.requestEmail = function(employee,time){
    const requestSubject = ['Request','Please help',"Just a thought"];
    const requestBody = ["Could we get a new coffee machine?","I need some time off"];
    const requestType = ['money','time'];
    const r = this.helpers.RandomBetweenInts(0,requestBody.length)
    const email = {
        subject: this.helpers.RandomFromArray(requestSubject),
        text: requestBody[1],
        sender: employee,
        time: time,
        read: false,
        accept: true,
        type:"request",
        subtype: requestType[r],
        importance: employee.level,
        target: employee
    }
    return email;
}

RandomEmail.prototype.complaintEmail = function(employee1, employee2,time){
    const complaintSubject = ["A complaint", "I'm not happy", "We need to talk","This sucks"];
    const complaintBody = ["I don't like sitting next to " + employee2.name.full + ". Can I move desks?"];
    const email = {
        subject: this.helpers.RandomFromArray(complaintSubject),
        text: this.helpers.RandomFromArray(complaintBody),
        sender: employee1,
        time: time,
        read: false,
        accept: true,
        type:"task",
        importance: employee1.level,
        target: [employee1,employee2]
    }
    return email;
}

RandomEmail.prototype.applicantEmail = function(employee,time){
    console.log('app email');
    console.log(time);
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
        time: time,
        read: false,
        consider: true,
        accept: false,
        target: employee,
        type:"application",
        importance: 3,
    }
    return email;
}

RandomEmail.prototype.projectEmail = function(project,time){
    const email = {
        subject: "New project for " + project.company.name,
        text: "Does your company have the bandwidth to complete a new " + project.type + " for " +project.company.name + "?",
        sender: project.company.rep,
        time: time,
        read: false,
        consider: true,
        target: project,
        type:"project",
        importance: 4,
    }
    return email;
}

RandomEmail.prototype.completeEmail = function(project,time){
    const email = {
        subject: "Project complete for " + project.company.name,
        text: "Congratulations on finishing the " + project.type + " for " +project.company.name + "?",
        sender: project.company.rep,
        time: time,
        read: false,
        consider: true,
        target: project,
    }
    return email;
}

RandomEmail.prototype.welcomeEmail = function(employee,time){
    const email = {
        subject: 'Thanks again',
        text: "Hey, thanks for taking over the personnel decisions. Sure it shouldn't be too hard!",
        sender: employee,
        time: time,
        read: false
    }
    return email;
}

RandomEmail.prototype.quitEmail = function(employee,time){
    const quitSubject = ['I quit',"I'm out",'Notice of resignation',"Can't take it"]
    const quitBody = [
        "I quit. Sincerely, " + employee.name.display,
        "Sorry, I just hate it here. I quit. ",
    ];
    const email = {
        subject: this.helpers.RandomFromArray(quitSubject),
        text: this.helpers.RandomFromArray(quitBody),
        sender: employee,
        time: time,
        read: false,
        importance: employee.level,
    }
    return email;
}

RandomEmail.prototype.happyEmail = function(employee,time){
    const happySubject = ["Great news",'Announcement',"Let's celebrate"];
    const happyBody = [
        "Great news!, " + employee.name.display + ' is having a baby!',  "Hey guys, " + employee.name.display + ' bachelor party is this weekend!',
    ];
    const email = {
        subject: this.helpers.RandomFromArray(happySubject),
        text: this.helpers.RandomFromArray(happyBody),
        sender: employee,
        time: time,
        read: false
    }
    return email;
}

RandomEmail.prototype.bossEmail = function(boss,time){
    const bossSubject = ["I'm not happy","Things are going great"];
    const bossBody = [
        "Boss email",
    ];
    const email = {
        subject: this.helpers.RandomFromArray(bossSubject),
        text: this.helpers.RandomFromArray(bossBody),
        sender: boss,
        time: time,
        read: false,
        type:"boss",
        importance: 5,
    }
    return email;
}

RandomEmail.prototype.fireEmail = function(boss,time){
    const bossSubject = ["This isn't working out"];
    const bossBody = [
        "Sorry things didn't work out, but I think you'll be happier at another company.",
    ];
    const email = {
        subject: this.helpers.RandomFromArray(bossSubject),
        text: this.helpers.RandomFromArray(bossBody),
        sender: boss,
        time: time,
        read: false
    }
    return email;
}

export default RandomEmail