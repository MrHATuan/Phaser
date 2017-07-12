var Car = function(game, x, y, parent, main){
    this.main = main;

    var btnInvestCar, btnUpgradeClose, btnUpgradeBack;

    var upgradeBg, notificationStepBg, notificationUpgradeBg;

    this.initCar(game, x, y, parent);
    this.initUpgradeLevel(parent);
};

Car.prototype = {
    initCar: function(game, x, y, parent){
        this.game = game;
        this.position = 371;
        this.direction = 0;
        this.level = 0;

        this.car = this.game.add.sprite(x, y, 'car');
        this.game.camera.follow(this.car);
    },

    initUpgradeLevel: function(parent) {
        upgradeBg = parent.addChild(this.game.add.sprite(-541, 8, 'upgradeBg'));

        var carPriceBg = upgradeBg.addChild(this.game.add.sprite(38, 85, 'carPriceBg'));

        btnInvestCar = upgradeBg.addChild(this.game.add.button(45, upgradeBg.height - 60, 'btnInvestCar'));
        btnInvestCar.inputEnabled = true;
        btnInvestCar.events.onInputOver.add(this.buttonOver, this);
        btnInvestCar.events.onInputOut.add(this.buttonOut, this);
        btnInvestCar.events.onInputDown.add(this.buttonDown, this);
        btnInvestCar.events.onInputUp.add(this.buttonUp, this);
        // Button close and back
        btnUpgradeClose = upgradeBg.addChild(this.game.add.button(290, upgradeBg.height - 60, 'btnClose2'));
        btnUpgradeClose.inputEnabled = true;
        btnUpgradeClose.events.onInputOver.add(this.buttonOver, this);
        btnUpgradeClose.events.onInputOut.add(this.buttonOut, this);
        btnUpgradeClose.events.onInputDown.add(this.buttonDown, this);
        btnUpgradeClose.events.onInputUp.add(this.buttonClose, this);

        btnUpgradeBack = upgradeBg.addChild(this.game.add.button(470, upgradeBg.height - 60, 'btnBack'));
        btnUpgradeBack.inputEnabled = true;
        btnUpgradeBack.events.onInputOver.add(this.buttonOver, this);
        btnUpgradeBack.events.onInputOut.add(this.buttonOut, this);
        btnUpgradeBack.events.onInputDown.add(this.buttonDown, this);
        btnUpgradeBack.events.onInputUp.add(this.buttonBack, this);

        notificationStepBg = upgradeBg.addChild(this.game.add.sprite(100, 40, 'notificationStepBg'));
        notificationStepBg.alpha = 0;
        var textStepUpgrade = notificationStepBg.addChild(this.game.add.text(50, 12, "100万円に投資(とうし)しました", { font: "17px Arial", fill: "#000", align: 'left'}));
        var btnGameContinue = notificationStepBg.addChild(this.game.add.button(93, 65, 'btnGameContinue'));
        btnGameContinue.inputEnabled = true;
        btnGameContinue.events.onInputOver.add(this.buttonOver, this);
        btnGameContinue.events.onInputOut.add(this.buttonOut, this);
        btnGameContinue.events.onInputDown.add(this.buttonDown, this);
        btnGameContinue.events.onInputUp.add(this.buttonClose, this);

        // notificationUpgradeBg = upgradeBg.addChild(this.game.add.sprite(8, 8, 'notificationUpgradeBg'));
    },

    notificationUpgrade: function() {
        notificationUpgradeBg = upgradeBg.addChild(this.game.add.sprite(8, 8, 'notificationUpgradeBg'));
        var btnGameContinue = notificationUpgradeBg.addChild(this.game.add.button(186, 225, 'btnGameContinue'));

        btnGameContinue.inputEnabled = true;
        btnGameContinue.events.onInputOver.add(this.buttonOver, this);
        btnGameContinue.events.onInputOut.add(this.buttonOut, this);
        btnGameContinue.events.onInputDown.add(this.buttonDown, this);
        btnGameContinue.events.onInputUp.add(this.buttonClose, this);
    },

    startUpgrade: function() {
        if (this.level < 10) {
            var upgradeCarTween = this.game.add.tween(upgradeBg).to({ x: 8 }, 600, "Sine.easeInOut", true);
        }

    },

    getPosition: function() {

    },

    getLevel: function() {

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

    jumpTo: function(move, map, factory, eventGame) {
        // Check stop
        // if (stop) {
        //     this.buyCar();
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
            eventGame.startEvent(map, this, factory);
            this.buyCar();

        }, this).autoDestroy = true;
    },

    buyCar: function() {
        // console.log("buy car here.!");
    },

    resetAllInvestCar: function() {
        upgradeBg.x = -541;

        btnInvestCar.inputEnabled    = true;
        btnUpgradeClose.inputEnabled = true;
        btnUpgradeBack.inputEnabled  = true;

        notificationStepBg.y = 40;
        notificationStepBg.alpha = 0;

        if (typeof notificationUpgradeBg !== 'undefined') {
            notificationUpgradeBg.destroy();
        }
    },

    buttonUp: function(button) {
        button.frame = 0;

        btnInvestCar.inputEnabled    = false;
        btnUpgradeClose.inputEnabled = false;
        btnUpgradeBack.inputEnabled  = false;

        // Call score
        // score.changeMoney(-100);

        this.level += 1;
        // check level
        if (this.level < 3) {
            this.game.add.tween(notificationStepBg).to({ y: 60 }, 300, "Sine.easeInOut", true);
            this.game.add.tween(notificationStepBg).to({ alpha: 1 }, 200, "Linear", true);
        } else if (this.level == 3) {
            this.notificationUpgrade();
            notificationUpgradeBg.frame = 0;
        } else if (this.level > 3 && this.level < 6) {
            this.game.add.tween(notificationStepBg).to({ y: 60 }, 300, "Sine.easeInOut", true);
            this.game.add.tween(notificationStepBg).to({ alpha: 1 }, 200, "Linear", true);
        } else if (this.level == 6) {
            this.notificationUpgrade();
            notificationUpgradeBg.frame = 1;
        } else if (this.level > 6 && this.level < 10) {
            this.game.add.tween(notificationStepBg).to({ y: 60 }, 300, "Sine.easeInOut", true);
            this.game.add.tween(notificationStepBg).to({ alpha: 1 }, 200, "Linear", true);
        } else {
            this.notificationUpgrade();
            notificationUpgradeBg.frame = 2;
        }
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