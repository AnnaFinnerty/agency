function RandomEmail(){
    console.log('random email running');
}

RandomEmail.prototype.generateEmail = function(type,employee1,employee2){
    let email;
    switch(type){
        default: 
            email = this.junkEmail(employee1); 
    }
    return email
}

RandomEmail.prototype.junkEmail = function(employee){
    const junk = ["Hey, it's " + employee.name.display + " 's birthday"];
    return junk[Math.floor(Math.random()*junk.length)];
}