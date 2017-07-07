var Car = function(game, x, y){
    this.initCar(game, x, y);
};

Car.prototype = {
    initCar: function(game, x, y){
        this.game = game;
        this.position = 371;
        this.direction = 0;
        this.level = 0;

        this.car = this.game.add.sprite(x, y, 'car');
        this.game.camera.follow(this.car);
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

    jumpTo: function(move, map) {
        // Check stop
        // if () {

        // }

        this.game.time.events.repeat(1000, move, function() {
            // check goUp or turnLeft or turnRight
            if (map.getNextDirection(this.position) === 'up') {
                this.goUp();
            } else if (map.getNextDirection(this.position) === 'left') {
                this.turnLeft();
            } else {
                this.turnRight();
            }

            this.position = map.getTilePosition(this.position, 1);
        }, this).autoDestroy = true;

        // Check direction after jump
        this.game.time.events.add(1000 * (move + 1), function() {
            if (map.getNextDirection(this.position) === 'up') {
                this.car.frame = 0;
            } else if (map.getNextDirection(this.position) === 'left') {
                this.car.frame = 1;
            } else {
                this.car.frame = 2;
            }
            // Call event (Demo factory)
            factory.startBuiding();

        }, this).autoDestroy = true;
    },

    buyCar: function() {

    }
}