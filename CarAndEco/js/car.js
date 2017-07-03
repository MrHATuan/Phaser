Car = function(game, parent, x, y) {
    this.initCar(game, parent, x, y);

    this.car.bringToTop();
};

Car.prototype.initCar = function(game, parent, x, y) {
    this.game = game;

    this.direction = 0;
    this.level = 0;
    this.position = [];

    this.car = parent.addChild(this.game.add.sprite(x, y, 'carA'));
    this.game.physics.arcade.enable(this.car);
};

Car.prototype.carFrame = function(frame) {
    switch(frame) {
        case 0:
            this.car.frame = 0;
            break;
        case 1:
            this.car.frame = 1;
            break;
        case 2:
            this.car.frame = 2;
            break;
        case 3:
            this.car.frame = 3;
            break;
        default:
            break;
    }
}

Car.prototype.carDirection = function(derection) {
    switch(derection) {
        case 0:
            this.direction = 0;
            break;
        case 1:
            this.direction = 1;
            break;
        case 2:
            this.direction = 2;
            break;
        case 3:
            this.direction = 3;
            break;
        default:
            break;
    }
};

Car.prototype.carUp = function(move) {
    this.game.time.events.repeat(1000, move, function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.game.add.tween(this.car).to( { x: carX + 74 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to( { y: carY - 80 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to( { y: carY - 43 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    }, this).autoDestroy = true;
};

Car.prototype.carDown = function(move) {
    this.game.time.events.repeat(1000, move, function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.game.add.tween(this.car).to( { x: carX - 74 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to( { y: carY - 40 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to( { y: carY + 43 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    }, this).autoDestroy = true;
};

Car.prototype.carLeft = function(move) {
    this.game.time.events.repeat(1000, move, function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.game.add.tween(this.car).to( { x: carX + 74 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to( { y: carY - 40 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to( { y: carY + 43 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    }, this).autoDestroy = true;
};

Car.prototype.carRight = function(move) {
    this.game.time.events.repeat(1000, move, function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.game.add.tween(this.car).to( { x: carX - 74 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to( { y: carY - 80 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to( { y: carY - 43 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    }, this).autoDestroy = true;
};