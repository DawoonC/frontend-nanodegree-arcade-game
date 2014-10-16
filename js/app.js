var enemyPosY = [60, 143, 226];
var enemySpeed = [80, 100, 130, 160, 200, 250, 300];

/**
 * Enemies our player must avoid.
 */
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random()*3)];
    this.speed = enemySpeed[Math.floor(Math.random()*7)];
}
/** 
 * Updates the enemy's position.
 * And resets player when collide.
 * @param dt A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+(this.speed*dt);
    if (this.x > 550) {
        this.x = -100;
        this.y = this.y + 83;
        this.speed = enemySpeed[Math.floor(Math.random()*7)];
        if (this.y > 226) {
            this.y = 60;
        }
    }
    
    if (this.x > -50 && this.x < 50) {
        this.tileX = 0;
    } else if (this.x > 50 && this.x < 150) {
        this.tileX = 101;
    } else if (this.x > 150 && this.x < 250) {
        this.tileX = 202;
    } else if (this.x > 250 && this.x < 350) {
        this.tileX = 303;
    } else if (this.x > 350 && this.x < 450) {
        this.tileX = 404;
    }

    if (player.x === this.tileX && player.y === this.y) {
        player.reset();
    }
}
/**
 * Renders the enemy on the screen.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/**
 * Player class
 */
var Player = function() {
  this.pImg = 'images/char-boy.png';
  this.x = 202;
  this.y = 392;
}
/** 
 * Updates the player's position.
 * The player's position is updated by the direction of ctlKey value.
 * The player's position resets when reach the water.
 */
Player.prototype.update = function() {
  if (this.ctlKey === 'left' && this.x != 0) {
    this.x = this.x - 101;
  } else if (this.ctlKey === 'right' && this.x != 404) {
    this.x = this.x + 101;
  } else if (this.ctlKey === 'up') {
    this.y = this.y - 83;
  } else if (this.ctlKey === 'down' && this.y != 392) {
    this.y = this.y + 83;
  }
  this.ctlKey = null;

  if (this.y < 60) {
    this.reset();
  }
}
/**
 * Move the player to initial position.
 */
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 392;
}
/**
 * Renders the player on the screen.
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.pImg), this.x, this.y);
}
/**
 * Sets control key for updating player's postion.
 * @param key Direction passed in from user's key input.
 */
Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var allEnemies = [enemyA, enemyB, enemyC];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
