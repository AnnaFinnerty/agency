function Player(){
    this.score = 0;
    this.happiness = 95;
    this.reputation = 75;
}

Player.prototype.augmentScore = function(points){
    this.score += points;
}

Player.prototype.augmentHappiness = function(){
    if(this.happiness + 1 <= 100){
        this.happiness += 1;
    }
}

Player.prototype.decrementHappiness = function(){
    if(this.happiness - 1 >= 0){
        this.happiness -= 1;
    }
}

Player.prototype.augmentReputation = function(){
    if(this.reputation + 1 <= 100){
        this.reputation += 1;
    }
    this.augmentScore(5);
}

Player.prototype.decrementReputation = function(){
    if(this.reputation - 1 >= 0){
        this.reputation -= 1;
    }
}

export default Player;