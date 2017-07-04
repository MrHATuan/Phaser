var Car = function(game, x, y){
    this.initCar(game, x, y);

    // this.car.bringToTop();
};

Car.prototype = {
    initCar: function(game, x, y){
        this.game = game;
        this.position = [];
        this.direction = 0;
        this.level = 0;

        this.car = this.game.add.sprite(x, y, 'car');
        // this.game.camera.follow(this.car);
    },

    getPosition: function() {

    },

    getLevel: function() {

    },

    upgradeLevel: function() {

    },

    goUp: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 0;
        this.game.add.tween(this.car).to({ x: carX + 55 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 70 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to({ y: carY - 32 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    },

    turnLeft: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 1;
        this.game.add.tween(this.car).to({ x: carX - 55 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 70 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to({ y: carY - 32 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    },

    turnRight: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 2;
        this.game.add.tween(this.car).to({ x: carX + 55 }, 900, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 30 }, 400, "Sine.easeInOut", true);

        this.game.time.events.add(500, function() {
            this.game.add.tween(this.car).to({ y: carY + 32 }, 400, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    },

    jumpTo: function(move) {
        this.game.time.events.repeat(1000, move, function() {
            // check goUp or turnLeft or turnRight
            this.goUp();
            // this.game.camera.x += 55;
            // this.game.camera.y -= 32;
        }, this).autoDestroy = true;
    },

    buyCar: function() {

    }
}