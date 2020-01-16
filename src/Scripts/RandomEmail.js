function RandomEmail(){
    console.log('random email running');
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
            text = this.applicantEmail(employee1);
            subject = 'Application'
            break

        case 'welcome':
            text = this.welcomeEmail(employee1);
        break

        case 'quit':
            text = this.quitEmail(employee1);
            subject = 'I quit'
        break

        default: 
            text = this.junkEmail(employee1); 
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
        subject: 'junk',
        text: junkBody[Math.floor(Math.random()*junkBody.length)],
        sender: employee.name.display,
        time: new Date().toLocaleString(),
        read: false
    }
    return junkBody[Math.floor(Math.random()*junkBody.length)];
}

RandomEmail.prototype.suggestionEmail = function(employee){
    const suggestionSubject = ["Happy Birthday to " + employee.name.first,'Hike this weekend'];
    const suggestionBody = ["Hey, it's " + employee.name.display + " 's birthday","Hey, anybody up for a hike this weekend?"];
    const email = {
        subject: 'junk',
        text: suggestionBody[Math.floor(Math.random()*suggestionBody.length)],
        sender: employee.name.display,
        time: new Date().toLocaleString(),
        read: false
    }
    return suggestionBody[Math.floor(Math.random()*suggestionBody.length)];
}

RandomEmail.prototype.applicantEmail = function(employee){
    const applicantSubject = ["Application", 'Open Position','Your job posting','I need a job'];
    const junk = [
        "Hello, my name is " + employee.name.display + " and I would like to apply for a position at your company. Attached, pleased find my resume and cover letter",
        "Hi there, I saw your post advertising and open position. Thanks for considering me!",
        "Regards, attached please find my resume for your positing of an open positin. Thank you for your consideration"
    ];
    return junk[Math.floor(Math.random()*junk.length)];
}

RandomEmail.prototype.welcomeEmail = function(employee){
    const junk = [
        "Welcome to " + employee.name.display + ", who just joined the company!",
    ];
    return junk[Math.floor(Math.random()*junk.length)];
}

RandomEmail.prototype.quitEmail = function(employee){
    const junk = [
        "I quit. Sincerely, " + employee.name.display,
        "Sorry, I just hate it here. I quit. ",
    ];
    return junk[Math.floor(Math.random()*junk.length)];
}

RandomEmail.prototype.happyEmail = function(employee){
    const happyNews = [
        "Great news!, " + employee.name.display,
    ];
    return happyNews[Math.floor(Math.random()*happyNews.length)];
}

RandomEmail.prototype.bossEmail = function(){
    const bossEmails = [
        "Boxx email",
    ];
    return bossEmails[Math.floor(Math.random()*bossEmails.length)];
}

RandomEmail.prototype.newProjectEmail = function(project,company){
    
}

export default RandomEmail