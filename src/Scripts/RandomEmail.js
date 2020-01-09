function RandomEmail(){
    console.log('random email running');
}

RandomEmail.prototype.generateEmail = function(type,employee1,employee2){
    let text;
    switch(type){

        case 'applicant':
            text = this.applicantEmail(employee1);
            break

        case 'welcome':
            text = this.welcomeEmail(employee1);
        break

        default: 
            text = this.junkEmail(employee1); 
    }
    const email = {
        text: text
    }
    return email
}

RandomEmail.prototype.junkEmail = function(employee){
    const junk = ["Hey, it's " + employee.name.display + " 's birthday"];
    return junk[Math.floor(Math.random()*junk.length)];
}

RandomEmail.prototype.applicantEmail = function(employee){
    const junk = [
        "Hello, my name is " + employee.name.display + " and I would like to apply for a position at your company. Attached, pleased find my resume and cover letter",
    ];
    return junk[Math.floor(Math.random()*junk.length)];
}

RandomEmail.prototype.welcomeEmail = function(employee){
    const junk = [
        "Welcome " + employee.name.display + " who just joined the company!",
    ];
    return junk[Math.floor(Math.random()*junk.length)];
}