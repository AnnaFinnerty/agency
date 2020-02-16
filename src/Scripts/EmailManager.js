
import RandomEmail from './RandomEmail';

function EmailManager(){
    console.log('email manager running');
    this.emails = [];
    this.randomEmail = new RandomEmail();
    this.emit = this.emit.bind(this);
}

EmailManager.prototype.emit = function(action,data){
    console.log('email emit '+action)
    const paths = {
        send: this.sendEmail.bind(this),
        read: this.readEmail.bind(this),
        delete: this.deleteEmail.bind(this),
        archive: this.archiveEmail.bind(this)
    }
    if(paths[action]){
        const cb =paths[action];
        cb(data);
        return this.emails 
    } else {
        console.log('employee manager could not find path for ' + action)
    }
}

EmailManager.prototype.generateRandomEmail = function(boss,employee1,employee2,time){
    //emails from the boss get priority
    const r = Math.random();
    let email;
    if(r < .1){
        if(boss.stats.happiness > 60 || boss.stats.happiness < 30){
            email = this.randomEmail.bossEmail(boss)
            console.log('boss email,',email)
        } else {
            email = this.randomEmail.generateEmail(null,employee1,employee1,time)
            console.log('junk1 email,',email)
        }
    } else if (r<.5 && r > .1 ) {
        if(employee1.stats.happiness > 80){
            //MTC needs to be replaced!
            email = this.randomEmail.happyEmail(employee1,time);
            console.log('hap email,',email)
        } else if (employee1.stats.happiness < 40) {
            email = this.randomEmail.complaintEmail(employee1,employee2,time);
            console.log('comp email,',email)
        } else {
            email = this.randomEmail.requestEmail(employee1,time);
            console.log('req email,',email)
        }
    } else {
        email = this.randomEmail.generateEmail(null,employee1,employee2,time);
        console.log('junk2,',email)
    }
    console.log('random email,',email)
    this.emails.unshift(email);
}

EmailManager.prototype.startEmails = function(){

}

EmailManager.prototype.sendEmail = function(email){
    console.log('sending email');
    this.emails.unshift(email);
}

EmailManager.prototype.readEmail = function(emailIndex){
    console.log('reading email');
    this.emails[emailIndex].read = true;
}

EmailManager.prototype.archiveEmail = function(emailIndex){
    console.log('archiving email');
    this.emails[emailIndex].archived = true;
}

EmailManager.prototype.deleteEmail = function(emailIndex){
    console.log('deleting email');
    this.emails.splice(emailIndex,1)
}

EmailManager.prototype.generateEmail = function(type,employee1,employee2,time){
    const email = this.randomEmail.generateEmail(type,employee1,employee2,time);
    this.emails.unshift(email);
}

export default EmailManager;