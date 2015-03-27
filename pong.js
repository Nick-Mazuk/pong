/*      Congradulations!
        You look like someone who understands code. This code is hidden with
        little "Easter Eggs" for you to find to make the game more interesting…
        Look through the code. Can you find them?
        Good luck, and have fun!
        
        Nick Mazuk
*/

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var height = 600;
var width = 400;
canvas.height = height;
canvas.width = width;
var context = canvas.getContext("2d");
var Score = 0;
var highScore = 0;
var paddleSpeed = 4;
var ballSpeed = 3;
var level = 1;
var levelStart = 1;
var beginning = true;

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
}

var step = function() {
    update();
    render();
    boardUpdate();
    animate(step);
};

var boardUpdate = function() {
    context.beginPath();
    context.strokeStyle = "#FFFFFF";
    context.setLineDash([7]);
    context.moveTo(0,height/2);
    context.lineTo(width,height/2);
    context.stroke();
}

var update = function() {
    difficulty();
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};

var render = function() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
}

function Paddle(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

var setLevel = function(start) {//Thought level 1 was too easy?
        levelStart = start;     //Call this function and as the parameter
}                               //Put the level you wish to start at!

Paddle.prototype.render = function() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x, this.y, this.width, this.height);
}

Paddle.prototype.move = function (x,y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    
    if (this.x < 0) { //all the way to the left
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > 400) { //all the way to the right
        this.x = 400 - this.width;
        this.x_speed = 0;
    }
}

/*
function widePaddle(width) { //Sorry, Code does not work yet
    function Player() {
        this.paddle = new Paddle(0, 580, width, 10);
    }
    player = new Player();
}
*/

function Player() {
    this.paddle = new Paddle(0, 580, 50, 10);
}

function Computer() {
    this.paddle = new Paddle(0, 10, 50, 10);
}

Player.prototype.render = function() {
    this.paddle.render();
}

Player.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 37) { //left arrow
            this.paddle.move(-paddleSpeed, 0);
        } else if (value == 39) { //right arrow
            this.paddle.move(paddleSpeed,0);
        } else {
            this.paddle.move(0,0);
        }
    }
}

Computer.prototype.render = function() {
    this.paddle.render();
}

Computer.prototype.update = function(ball) {
    if (level <= 5){ //easy computer for levels 1-5
        if (ball.y < (200 + 80*level)) {
            var x_pos = ball.x;
            var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
            
            if (diff < -paddleSpeed) {
                diff = -paddleSpeed;
            } else if (diff > paddleSpeed) {
                diff = paddleSpeed;
            }
    
            this.paddle.move(diff, 0);
        }
    } else { //hard computer for levels above 5
        if (ball.y_speed > 0 || ball.y > (300 + level*2)) { //do easy computer when ball moving away
            var x_pos = ball.x;
            var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
            
            if (diff < -paddleSpeed - Math.floor(level/4) + 5) {
                diff = -paddleSpeed - Math.floor(level/4) + 5;
            } else if (diff > paddleSpeed + Math.floor(level/4) - 5) {
                diff = paddleSpeed + Math.floor(level/4) - 5;
            } 
            
            this.paddle.move(diff, 0);
            
        } else { //hard computer when ball is moving toward the paddle
            var yintercept = this.paddle.y + this.paddle.height;
            var infinite = (ball.y - yintercept)*(ball.x_speed/(0 - ball.y_speed)) + ball.x;
            if (infinite > 0) {
                var counter = 0;
                
                while (infinite > 400) {
                    infinite -= 400;
                    counter ++;
                }
                
                var diff = -((this.paddle.x + (this.paddle.width / 2)) - infinite);
                
                if (counter % 2 == 1) {
                    diff = -((this.paddle.x + (this.paddle.width / 2)) - (400 - infinite));
                }
                
                if (diff < -paddleSpeed - Math.floor(level/4) + 5) {
                    diff = -paddleSpeed - Math.floor(level/4) + 5;
                } else if (diff > paddleSpeed + Math.floor(level/4) - 5) {
                    diff = paddleSpeed + Math.floor(level/4) - 5;
                } 
            
                this.paddle.move(diff, 0);
            
            } else if (infinite < 0) {
                var counter = 0;
                
                while (infinite < -400) {
                    infinite += 400;
                    counter ++;
                }
                
                var diff = -((this.paddle.x + (this.paddle.width / 2)) - infinite);
                
                if (counter % 2 == 1) {
                    diff = -((this.paddle.x + (this.paddle.width / 2)) - (400 - infinite));
                }
                
                if (diff < -paddleSpeed - Math.floor(level/4) + 5) {
                    diff = -paddleSpeed - Math.floor(level/4) + 5;
                } else if (diff > paddleSpeed + Math.floor(level/4) - 5) {
                    diff = paddleSpeed + Math.floor(level/4) - 5;
                } 
            
                this.paddle.move(diff, 0);
            }
        }
    }
};

var neverLose = function(){ //Wow, great job looking at the code
        lose = function(){      }; //Call this function in the console
}                               //And you will never lose a point! :)

function Ball(x,y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = ballSpeed;
    this.radius = 5;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2*Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
}

var lose = function(){
        Score -= 1000;
}

Ball.prototype.update = function(paddle1, paddle2) {
    
    //Trying to get ball to change direction half way through
    /*if (((this.y + this.y_speed) > 300 && this.y < 300) || (this.y + this.y_speed) > 300 && this.y < 300){
        
        var random = Math.random();
        
        if (random > 0.66666666666) {
            this.x_speed = this.x_speed*3;
        } else if (random > 0.333333333333){
            this.x_speed = -this.x_speed*3;
        } else {
            this.x_speed = this.x_speed*3;
        }
    }*/
    
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - this.radius;
    var top_y = this.y - this.radius;
    var bottom_x = this.x + this.radius;
    var bottom_y = this.y + this.radius;
    
    if (top_x < 0) { //hit left wall
        this.x = this.radius;
        this.x_speed = -this.x_speed;
    } else if (top_x > 400) { //hit right wall (change value if board resize)
        this.x = 400 - this.radius;
        this.x_speed = -this.x_speed;
    }
    
    if (this.y < 0 || this.y > 600) { //point was scored (change value if board resize)
        if (this.y < 0) {
            Score += 1000;
        } else if (this.y > 600) {
            if (!beginning) { //if player has not hit the ball yet, score does not count
                lose();
            }
        }
        
        this.x = 200;
        this.y = 300 - 5*level;
        if (level >= 50) {
                this.y = 50;
        }
        this.x_speed = 0;
        this.y_speed = ballSpeed;
        beginning = true;
    }
    
    if (top_y > 300) {
        if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
            //ball hit player's paddle
            this.y_speed = -this.y_speed;
            this.x_speed += (this.x - (paddle1.x + paddle1.width/2))/10; //changes ball horizontal speed based on where it hits the padddle
            this.y += this.y_speed;
            Score += 100;
            beginning = false;
        }
    } else {
        if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            //ball hit computer's paddle
            this.y_speed = -this.y_speed;
            this.x_speed += (this.x - (paddle2.x + paddle2.width/2))/10; //changes ball horizontal speed based on where it hits the padddle
            this.y += this.y_speed;
        }
    }
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200,300);

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});

var difficulty = function() {
    if (Score < 0) {
        Score = 0;
    }
    level = Math.floor(Score/3000) + levelStart;
    document.getElementById('level').innerHTML = "Level " + level;
    document.getElementById('Score').innerHTML = Score;
    if (Score > highScore) {
        document.getElementById('highScore').innerHTML = Score;
        highScore = Score;
    }
    if (level <= 4) {
    paddleSpeed = 3 + level;
    } else {
        paddleSpeed = 7 + Math.floor(level/4);
    }
    if (level <= 10) {
        ballSpeed = 3 + Math.round(level/3);
    } else if (level <= 50) {
        ballSpeed = 5 + Math.round(level/5);
    } else {
        ballSpeed = 15;
    }
};
