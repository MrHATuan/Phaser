var Car = function(game, x, y, parent, main){
    this.main = main;

    var upgradeBg, upgradeStep, carPriceBg, notificationStepBg, notificationUpgradeBg, notificationCar;

    var arrowUp, arrowRight, inDevelop;

    var btnInvestCar, btnUpgradeClose, btnUpgradeBack;

    var car1, car2, car3, car4, car5;

    var step;

    this.initCar(game, x, y, parent);
    this.initUpgradeLevel(parent);
};

Car.prototype = {
    initCar: function(game, x, y, parent){
        this.game = game;
        this.position = 371;
        this.direction = 0;
        this.level = 0;

        this.car_move_sound = this.game.add.audio('car_move');
        car1 = this.game.add.sprite(x, y, 'car');
        car2 = this.game.add.sprite(x, y, 'car2');
        car2.alpha = 0;
        car3 = this.game.add.sprite(x, y, 'car3');
        car3.alpha = 0;
        car4 = this.game.add.sprite(x, y, 'car4');
        car4.alpha = 0;

        this.car = car1;
        this.game.camera.follow(this.car);
    },

    initUpgradeLevel: function(parent) {
        upgradeBg   = parent.addChild(this.game.add.sprite(-541, 8, 'upgradeBg'));

        carPriceBg  = upgradeBg.addChild(this.game.add.sprite(38, 85, 'carPriceBg'));
        arrowRight  = upgradeBg.addChild(this.game.add.sprite(130, 105, 'arrowRight'));
        arrowUp     = upgradeBg.addChild(this.game.add.sprite(197, 175, 'arrowUp'));
        inDevelop   = upgradeBg.addChild(this.game.add.sprite(185, 105, 'inDevelop'));
        upgradeStep = upgradeBg.addChild(this.game.add.sprite(65, 220, 'upgradeStep'));
        step = 0;
        upgradeStep.frame = step;

        btnInvestCar = upgradeBg.addChild(this.game.add.button(45, upgradeBg.height - 58, 'btnInvestCar'));
        btnInvestCar.inputEnabled = true;
        btnInvestCar.events.onInputOver.add(this.buttonOver, this);
        btnInvestCar.events.onInputOut.add(this.buttonOut, this);
        btnInvestCar.events.onInputDown.add(this.buttonDown, this);
        btnInvestCar.events.onInputUp.add(this.buttonUp, this);
        // Button close and back
        btnUpgradeClose = upgradeBg.addChild(this.game.add.button(290, upgradeBg.height - 58, 'btnClose2'));
        btnUpgradeClose.inputEnabled = true;
        btnUpgradeClose.events.onInputOver.add(this.buttonOver, this);
        btnUpgradeClose.events.onInputOut.add(this.buttonOut, this);
        btnUpgradeClose.events.onInputDown.add(this.buttonDown, this);
        btnUpgradeClose.events.onInputUp.add(this.buttonClose, this);

        btnUpgradeBack = upgradeBg.addChild(this.game.add.button(470, upgradeBg.height - 58, 'btnBack'));
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
    },

    notificationUpgrade: function() {
        notificationUpgradeBg = upgradeBg.addChild(this.game.add.sprite(8, 8, 'notificationUpgradeBg'));

        notificationCar = notificationUpgradeBg.addChild(this.game.add.button(-80, 50, 'notificationCar'));
        notificationCar.anchor.set(0.5);
        notificationCar.scale.set(2);
        this.game.add.tween(notificationCar).to({ x: 135, y: 133 }, 600, "Sine.easeInOut", true);

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
    goBack: function() {
        var carY = this.car.y;
        var carX = this.car.x;

        this.car.frame = 3;

        this.game.add.tween(this.car).to({ x: carX - 55 }, 650, "Sine.easeInOut", true);
        this.game.add.tween(this.car).to({ y: carY - 30 }, 300, "Sine.easeInOut", true);

        this.game.time.events.add(350, function() {
            this.game.add.tween(this.car).to({ y: carY + 32 }, 300, "Sine.easeInOut", true);
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
        this.game.camera.target=null;
        this.game.time.events.repeat(650, move, function() {
            this.car_move_sound.play();
            var direct = map.getNextDirection(this.position);
            // check goUp or turnLeft or turnRight
            if (direct === 'up') {
                this.goUp();
            } else if (direct === 'left') {
                this.turnLeft();
            } else if (direct === 'right') {
                this.turnRight();
            }else {
                this.goBack();
            }

            this.position = map.getTilePosition(this.position, 1);
        }, this).autoDestroy = true;

        // Check direction after jump
        this.game.time.events.add(650 * (move + 2), function() {
            var direct = map.getNextDirection(this.position);
            if (direct === 'up') {
                this.car.frame = 0;
            } else if (direct === 'left') {
                this.car.frame = 1;
            } else if (direct === 'right') {
                this.car.frame = 2;
            }else {
                this.car.frame = 3;
            }

            // set position back to full map
            map.setCarPosition(this.position);

            var next_stop = map.getNextStop(this.position);
            // set car position to next stop
            if (next_stop) {
                this.buyCar();

                var tile = map.getTile(next_stop);
                this.car.x=tile.x+24;
                this.car.y=tile.y+8;
                this.position = next_stop;
                // show next road event
                map.showNextEventBlock(this.position);
                // test change event
                map.changeEvent(this.position);
            }else {
                // get event
                map.getEvent(this.position);
                // Call event (Demo factory)
                eventGame.startEvent(map, this, factory);
            }
            
            this.game.camera.follow(this.car, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            this.game.camera.deadzone = new Phaser.Rectangle(100, 300, 10, 10);
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

        // this.game.camera.follow(this.car);
        // this.game.camera.deadzone = new Phaser.Rectangle(100, 300, 10, 10);

        if (map.getNextDirection(this.position) === 'up') {
            this.car.frame = 0;
        } else if (map.getNextDirection(this.position) === 'left') {
            this.car.frame = 1;
        } else if (map.getNextDirection(this.position) === 'right'){
            this.car.frame = 2;
        }
    },

    buttonUp: function(button) {
        button.frame = 0;

        btnInvestCar.inputEnabled    = false;
        btnUpgradeClose.inputEnabled = false;
        btnUpgradeBack.inputEnabled  = false;

        // Call score
        // score.changeMoney(-100);

        step += 1;
        upgradeStep.frame = step;

        this.level += 1;
        // check level
        if (this.level < 3) {
            this.game.add.tween(notificationStepBg).to({ y: 60 }, 300, "Sine.easeInOut", true);
            this.game.add.tween(notificationStepBg).to({ alpha: 1 }, 200, "Linear", true);
        } else if (this.level == 3) {
            this.notificationUpgrade();
            notificationUpgradeBg.frame = 0;
            notificationCar.frame = 0;

            var carX = this.car.x;
            var carY = this.car.y;
            car1.alpha = 0;
            car2.alpha = 1;
            this.car = car2;
            this.car.x = carX;
            this.car.y = carY
            carPriceBg.frame = 1;
            arrowRight.x = 245;
            arrowUp.x = 320;
            inDevelop.x = 305;
        } else if (this.level > 3 && this.level < 6) {
            this.game.add.tween(notificationStepBg).to({ y: 60 }, 300, "Sine.easeInOut", true);
            this.game.add.tween(notificationStepBg).to({ alpha: 1 }, 200, "Linear", true);
        } else if (this.level == 6) {
            this.notificationUpgrade();
            notificationUpgradeBg.frame = 1;
            notificationCar.frame = 1;

            var carX = this.car.x;
            var carY = this.car.y;
            car2.alpha = 0;
            car3.alpha = 1;
            this.car = car3;
            this.car.x = carX;
            this.car.y = carY
            carPriceBg.frame = 2;
            arrowRight.x = 365;
            arrowUp.x = 440;
            inDevelop.x = 425;
        } else if (this.level > 6 && this.level < 10) {
            this.game.add.tween(notificationStepBg).to({ y: 60 }, 300, "Sine.easeInOut", true);
            this.game.add.tween(notificationStepBg).to({ alpha: 1 }, 200, "Linear", true);
        } else if (this.level == 10) {
            this.notificationUpgrade();
            notificationUpgradeBg.frame = 2;
            notificationCar.frame = 2;

            var carX = this.car.x;
            var carY = this.car.y;
            car3.alpha = 0;
            car4.alpha = 1;
            this.car = car4;
            this.car.x = carX;
            this.car.y = carY
            carPriceBg.frame = 3;
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
        if (button.key == 'btnGameContinue') {
            step += 1;
            upgradeStep.frame = step;
        }
        this.resetAllInvestCar();
        this.main.resetGamePlay();
    },
}