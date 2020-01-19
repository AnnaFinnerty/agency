import Helpers from './Helpers';

function RandomMessage(){
    console.log('random message running');
    this.helpers = new Helpers();
}

RandomMessage.prototype.generateRandomMessage = function(boss,employee1,employee2){
    //emails from the boss get priority
    if(boss.stats.happiness > 60 || boss.stats.happiness < 30){
        return this.bossEmail()
    } else {
        if(employee1.stats.happiness > 80){

        }
    }
}

RandomMessage.prototype.generateMessage = function(type,time,employee1,employee2){
    switch(type){

        default: 
            return this.junkMessage(time,employee1); 
    }
}

RandomMessage.prototype.junkMessage = function(time,employee){
    console.log('random message', employee)
    const junkMessages = ["Junk message 1", "Junk message 2"];
    const text = this.helpers.RandomFromArray(junkMessages);
    const message = this.message(employee.name.display,text,time);
    return message
}

RandomMessage.prototype.message = function(sender,text,time){
    return {
        sender: sender,
        text: text,
        time: time
    }
}





export default RandomMessage