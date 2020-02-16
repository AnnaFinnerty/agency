import RandomMessage from './RandomMessage';

function MessageManager(){
    this.messages = [];
    this.randomMessage = new RandomMessage();
}

MessageManager.prototype.emit = function(action,data){
    const paths = {
        random: this.addRandomMessage(data),
        add: this.addMessage(data),
    }
    if(paths[action]){
        const cb =paths[action];
        cb(data);
        return this.messages
    } else {
        console.log('message manager could not find path for ' + action)
    }
}

MessageManager.prototype.addRandomMessage = function(employee,time){
    const message = this.randomMessage.generateMessage('junk',time,employee);
    this.messages.push(message);
}

MessageManager.prototype.addMessage = function(text){
    const message = this.randomMessage.message('me',text,'time',false);
    this.messages.push(message);
}

export default MessageManager