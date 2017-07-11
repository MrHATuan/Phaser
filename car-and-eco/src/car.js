var Car = function(game, x, y, parent, main){
    this.main = main;
    var parentCar;

    var upgradeBg;

    var btnInvestCar, btnClose, btnBack;

    this.initCar(game, x, y, parent);
};

Car.prototype = {
    initCar: function(game, x, y, parent){
        this.game = game;
        this.position = 371;
        this.direction = 0;
        this.level = 0;

        this.car = this.game.add.sprite(x, y, 'car');
        this.game.camera.follow(this.car);

        parentCar = parent;
    },

    getPosition: function() {

    },

    getLevel: function() {

    },

    upgradeLevel: function() {
        upgradeBg = parentCar.addChild(this.game.add.sprite(-541, 8, 'upgradeBg'));

        var upgradeCarTween = this.game.add.tween(upgradeBg).to({ x: 8 }, 600, "Sine.easeInOut", true);

        upgradeCarTween.onComplete.add(function() {
            btnInvestCar = upgradeBg.addChild(this.game.add.button(45, upgradeBg.height - 60, 'btnInvestCar'));
            btnInvestCar.inputEnabled = true;
            btnInvestCar.events.onInputOver.add(this.buttonOver, this);
            btnInvestCar.events.onInputOut.add(this.buttonOut, this);
            btnInvestCar.events.onInputDown.add(this.buttonDown, this);
            btnInvestCar.events.onInputUp.add(this.buttonUp, this);
            // Button close and back
            btnClose = upgradeBg.addChild(this.game.add.button(290, upgradeBg.height - 60, 'btnClose2'));
            btnClose.inputEnabled = true;
            btnClose.events.onInputOver.add(this.buttonOver, this);
            btnClose.events.onInputOut.add(this.buttonOut, this);
            btnClose.events.onInputDown.add(this.buttonDown, this);
            btnClose.events.onInputUp.add(this.buttonClose, this);

            btnBack = upgradeBg.addChild(this.game.add.button(470, upgradeBg.height - 60, 'btnBack'));
            btnBack.inputEnabled = true;
            btnBack.events.onInputOver.add(this.buttonOver, this);
            btnBack.events.onInputOut.add(this.buttonOut, this);
            btnBack.events.onInputDown.add(this.buttonDown, this);
            btnBack.events.onInputUp.add(this.buttonBack, this);
        }, this);

    },

    goUp: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 0;

        this.game.add.tween(this.car).to({ x: carX + 55 }, 650, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 70 }, 300, "Sine.easeInOut", true);

        this.game.time.events.add(350, function() {
            this.game.add.tween(this.car).to({ y: carY - 32 }, 300, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    },

    turnLeft: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 1;

        this.game.add.tween(this.car).to({ x: carX - 55 }, 650, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 70 }, 300, "Sine.easeInOut", true);

        this.game.time.events.add(350, function() {
            this.game.add.tween(this.car).to({ y: carY - 32 }, 300, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    },

    turnRight: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 2;

        this.game.add.tween(this.car).to({ x: carX + 55 }, 650, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 30 }, 300, "Sine.easeInOut", true);

        this.game.time.events.add(350, function() {
            this.game.add.tween(this.car).to({ y: carY + 32 }, 300, "Sine.easeInOut", true);
        }, this).autoDestroy = true;
    },

    jumpTo: function(move, map, factory, event) {
        // Check stop
        // if () {

        // }

        this.game.time.events.repeat(650, move, function() {
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
        this.game.time.events.add(650 * (move + 1), function() {
            if (map.getNextDirection(this.position) === 'up') {
                this.car.frame = 0;
            } else if (map.getNextDirection(this.position) === 'left') {
                this.car.frame = 1;
            } else {
                this.car.frame = 2;
            }
            // Call event (Demo factory)
            // factory.startBuiding();
            event.startEvent(map, this, factory);

        }, this).autoDestroy = true;
    },

    buyCar: function() {

    },

    resetAllInvestCar: function() {
        if (typeof upgradeBg !== 'undefined') {
            upgradeBg.destroy();
        }
    },

    buttonUp: function(button) {
        button.frame = 0;

    },

    buttonOver: function(button) {
        button.frame = 1;
    },

    buttonOut: function(button) {
        button.frame = 0;
    },

    buttonDown: function(button) {
        button.frame = 2;
    },

    buttonBack: function(button) {
        button.frame = 0;
        this.resetAllInvestCar();
    },

    buttonClose: function(button) {
        button.frame = 0;
        this.resetAllInvestCar();
        this.main.resetGamePlay();
    },
}