import Helpers from './Helpers';

function RandomMessage(){
    console.log('random message running');
    this.helpers = new Helpers();
}


RandomMessage.prototype.generateMessage = function(type,time,employee1,employee2){
    switch(type){

        default: 
            return this.junkMessage(time,employee1); 
    }
}

RandomMessage.prototype.junkMessage = function(time,employee){
    const junkMessages = ["Hey guys there's cake in the break room", "Anyone have a spare phone charger?",
                          "I found someone's phone charger", "Anyone up for a hike this weekend?", "Who's got spare bandwidth?"
                         ];
    const text = this.helpers.RandomFromArray(junkMessages);
    const message = this.message(employee.name.display,text,time,false);
    return message
}

RandomMessage.prototype.message = function(sender,text,time,starred){
    return {
        sender: sender,
        text: text,
        time: time,
        starred: starred
    }
}





export default RandomMessage