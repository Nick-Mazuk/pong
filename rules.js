window.onload = function() {
    gameplay();
    deflect();
    win();
    lose();
    miss();
}

var gameplay = function() {
    var canvas = document.getElementById('gameplay');
    var height = 600;
    var width = 400;
    canvas.height = height;
    canvas.width = width;
    var context = canvas.getContext('2d');
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };
    var paddleSpeed = 9;
    var ballSpeed = 10;
    var maxSpeed = 13; //max x_speed for the ball
    
    var step = function() {
        update();
        render();
        boardUpdate();
        animate(step);
    }
    
    animate(step);
    
    var update = function() {
        player.update(ball);
        computer.update(ball);
        ball.update(player.paddle, computer.paddle);
    }
    
    var boardUpdate = function() {
        context.beginPath();
        context.strokeStyle = "#FFFFFF";
        context.setLineDash([7]);
        context.moveTo(0,height/2);
        context.lineTo(width,height/2);
        context.stroke();
    }
    
    var render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        player.render();
        computer.render();
        ball.render();
    }
    
    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    Paddle.prototype.render = function() {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    Paddle.prototype.move = function(x,y) {
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
    
    function Player() {
        this.paddle = new Paddle(0, 580, 50, 10);
    }
    
    function Computer() {
        this.paddle = new Paddle(0, 10, 50, 10);
    }
    
    Player.prototype.render = function() {
        this.paddle.render();
    }
    
    Player.prototype.update = function(ball) {
        
        if (ball.y_speed < 0 || ball.y < 200) { //do easy computer when ball moving away
            var x_pos = ball.x;
            var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
            
            if (diff < -paddleSpeed) {
                diff = -paddleSpeed;
            } else if (diff > paddleSpeed) {
                diff = paddleSpeed;
            }
            
            this.paddle.move(diff, 0);
            
        } else {
            
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
                
                if (diff < -paddleSpeed) {
                    diff = -paddleSpeed;
                } else if (diff > paddleSpeed) {
                    diff = paddleSpeed;
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
                
                if (diff < -paddleSpeed) {
                    diff = -paddleSpeed;
                } else if (diff > paddleSpeed) {
                    diff = paddleSpeed;
                }
                this.paddle.move(diff, 0);
            }
        }
    }
    
    Computer.prototype.render = function() {
        this.paddle.render();
    }
    
    Computer.prototype.update = function(ball) {
        if (ball.y_speed > 0 || ball.y > 400) { //do easy computer when ball moving away
            var x_pos = ball.x;
            var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
            
            if (diff < -paddleSpeed) {
                diff = -paddleSpeed;
            } else if (diff > paddleSpeed) {
                diff = paddleSpeed;
            }
            
            this.paddle.move(diff, 0);
            
        } else {
            
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
                
                if (diff < -paddleSpeed) {
                    diff = -paddleSpeed;
                } else if (diff > paddleSpeed) {
                    diff = paddleSpeed;
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
                
                if (diff < -paddleSpeed) {
                    diff = -paddleSpeed;
                } else if (diff > paddleSpeed) {
                    diff = paddleSpeed;
                }
                this.paddle.move(diff, 0);
            }
        }
    }
    
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
    
    Ball.prototype.update = function(paddle1, paddle2) {
        
        if (((this.y + this.y_speed) > 300 && this.y < 300) || (this.y + this.y_speed) > 300 && this.y < 300){
        
            var random = Math.random();
            
            if (random > 0.66666666666) {
                this.x_speed = this.x_speed*3;
            } else if (random > 0.333333333333){
                this.x_speed = -this.x_speed*3;
            } else {
                this.x_speed = this.x_speed*2;
            }
        }
    
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
            this.x = 200;
            this.y = 300;
            this.x_speed = 0;
            this.y_speed = ballSpeed;
        }
        
        if (top_y > 300) {
            if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
                //ball hit player's paddle
                this.y_speed = -this.y_speed;
                var change = Math.random()*10;
                
                if(paddle1.speed >= 0) {
                    this.x_speed += change;
                    this.y += this.y_speed;
                } else {
                    this.x_speed -= change;
                    this.y += this.y_speed;
                }
                
            }
        } else {
            if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
                //ball hit computer's paddle
                this.y_speed = -this.y_speed;
                var change = Math.random()*10;
                
                if(paddle2.speed >= 0) {
                    this.x_speed += change;
                    this.y += this.y_speed;
                } else {
                    this.x_speed -= change;
                    this.y += this.y_speed;
                }
            }
        }
        
        if(this.x_speed > maxSpeed) {
            this.x_speed = maxSpeed;
        } else if(this.x_speed < -maxSpeed) {
            this.x_speed = -maxSpeed;
        }
    }
    
    var player = new Player();
    var computer = new Computer();
    var ball = new Ball(200, 300);
}














var deflect = function() {
    var canvas = document.getElementById('deflect');
    var height = 275;
    var width = 400;
    canvas.height = height;
    canvas.width = width;
    var context = canvas.getContext('2d');
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };
    var paddleSpeed = 8;
    var ballSpeed = 7;
    
    var step = function() {
        update();
        render();
        animate(step);
    }
    
    animate(step);
    
    var update = function() {
        ball.update(computer.paddle);
    }
    
    var render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        computer.render();
        ball.render();
        text();
    }
    
    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    Paddle.prototype.render = function() {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    function Computer() {
        this.paddle = new Paddle(175, 255, 50, 10);
    }
    
    Computer.prototype.render = function() {
        this.paddle.render();
    }
    
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
    
    Ball.prototype.update = function(paddle2) {

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
        
        if (this.y < 0 || this.y > 275) { //point was scored (change value if board resize)
            this.x = 200;
            this.y = this.radius;
            this.x_speed = 0;
            this.y_speed = ballSpeed;
        }

        if (top_y < (paddle2.y) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            //ball hit computer's paddle
            this.y_speed = -this.y_speed;
            var change = Math.random()*10 - 5;
            
            this.x_speed += change;
            this.y += this.y_speed;
        }
    }
    
    var text = function() {
        context.font = "18px 'Source Code Pro'";
        context.fillStyle = "#FFFFFF";
        context.fillText("100 points", 10, 20);
    }
    
    var computer = new Computer();
    var ball = new Ball(200, 10);
}











var win = function() {
    var canvas = document.getElementById('win');
    var height = 275;
    var width = 400;
    canvas.height = height;
    canvas.width = width;
    var context = canvas.getContext('2d');
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };
    var paddleSpeed = 7;
    var ballSpeed = 7;
    var direction = -1;
    
    var step = function() {
        update();
        render();
        animate(step);
    }
    
    animate(step);
    
    var update = function() {
        computer.update(ball);
        ball.update(computer.paddle);
    }
    
    var render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        computer.render();
        ball.render();
        text();
    }
    
    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    Paddle.prototype.render = function() {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    Paddle.prototype.move = function(x,y) {
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
    
    function Computer() {
        this.paddle = new Paddle(50, 10, 50, 10);
    }
    
    Computer.prototype.render = function() {
        this.paddle.render();
    }
    
    Computer.prototype.update = function(ball) {
        var x_pos = ball.x;
        var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
        
        if (diff < -paddleSpeed) {
            diff = -paddleSpeed;
        } else if (diff > paddleSpeed) {
            diff = paddleSpeed;
        }
        
        this.paddle.move(diff, 0);
    }
    
    function Ball(x,y) {
        this.x = x;
        this.y = y;
        this.x_speed = 6;
        this.y_speed = -ballSpeed;
        this.radius = 5;
    }
    
    Ball.prototype.render = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2*Math.PI, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
    }
    
    Ball.prototype.update = function(paddle2) {

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
        
        if (this.y < 0 || this.y > 275) { //point was scored (change value if board resize)
            this.x = 200;
            this.y = 250;
            direction = -direction;
            this.x_speed = 6*direction;
            this.y_speed = -ballSpeed;
        }
    }
    
    var text = function() {
        context.font = "18px 'Source Code Pro'";
        context.fillStyle = "#FFFFFF";
        context.fillText("1000 points", 10, 265);
    }
    
    var computer = new Computer();
    var ball = new Ball(200, 300);
}











var lose = function() {
    var canvas = document.getElementById('lose');
    var height = 275;
    var width = 400;
    canvas.height = height;
    canvas.width = width;
    var context = canvas.getContext('2d');
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };
    var paddleSpeed = 7;
    var ballSpeed = 7;
    var direction = 1;
    
    var step = function() {
        update();
        render();
        animate(step);
    }
    
    animate(step);
    
    var update = function() {
        computer.update(ball);
        ball.update(computer.paddle);
    }
    
    var render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        computer.render();
        ball.render();
        text();
    }
    
    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    Paddle.prototype.render = function() {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    Paddle.prototype.move = function(x,y) {
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
    
    function Computer() {
        this.paddle = new Paddle(50, 255, 50, 10);
    }
    
    Computer.prototype.render = function() {
        this.paddle.render();
    }
    
    Computer.prototype.update = function(ball) {
        var x_pos = ball.x;
        var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
        
        if (diff < -paddleSpeed) {
            diff = -paddleSpeed;
        } else if (diff > paddleSpeed) {
            diff = paddleSpeed;
        }
        
        this.paddle.move(diff, 0);
    }
    
    function Ball(x,y) {
        this.x = x;
        this.y = y;
        this.x_speed = 6;
        this.y_speed = ballSpeed;
        this.radius = 5;
    }
    
    Ball.prototype.render = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2*Math.PI, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
    }
    
    Ball.prototype.update = function(paddle2) {

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
        
        if (this.y < 0 || this.y > 275) { //point was scored (change value if board resize)
            this.x = 200;
            this.y = 10;
            direction = -direction;
            this.x_speed = 6*direction;
            this.y_speed = ballSpeed;
        }
    }
    
    var text = function() {
        context.font = "18px 'Source Code Pro'";
        context.fillStyle = "#FFFFFF";
        context.fillText("-1000 points", 10, 20);
    }
    
    var computer = new Computer();
    var ball = new Ball(200, 10);
}











var miss = function() {
    var canvas = document.getElementById('miss');
    var height = 275;
    var width = 400;
    canvas.height = height;
    canvas.width = width;
    var context = canvas.getContext('2d');
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };
    var ballSpeed = 7;
    
    var step = function() {
        update();
        render();
        animate(step);
    }
    
    animate(step);
    
    var update = function() {
        ball.update(computer.paddle);
    }
    
    var render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        computer.render();
        ball.render();
        text();
    }
    
    function Paddle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    
    Paddle.prototype.render = function() {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    function Computer() {
        this.paddle = new Paddle(0, 255, 50, 10);
    }
    
    Computer.prototype.render = function() {
        this.paddle.render();
    }
    
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
    
    Ball.prototype.update = function(paddle2) {

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
        
        if (this.y < 0 || this.y > 275) { //point was scored (change value if board resize)
            this.x = 200;
            this.y = this.radius;
            this.x_speed = 0;
            this.y_speed = ballSpeed;
        }
    }
    
    var text = function() {
        context.font = "18px 'Source Code Pro'";
        context.fillStyle = "#FFFFFF";
        context.fillText("-0 points", 10, 20);
    }
    
    var computer = new Computer();
    var ball = new Ball(200, 10);
}
