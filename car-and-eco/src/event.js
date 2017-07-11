var Event = function(game, parent, main){
    this.game = game;
    this.main = main;

    var whiteBg, allEventBg, investBg;

    this.initEvent(parent);
};

Event.prototype = {
    initEvent: function(parent) {
        whiteBg = parent.addChild(this.game.add.sprite(parent.width/2 - 4, parent.height/2 - 4, 'whiteBg'));
        whiteBg.anchor.set(0.5, 0.5);
        whiteBg.scale.setTo(0.1);
        whiteBg.alpha = 0;

        allEventBg = parent.addChild(this.game.add.sprite(8, 8, 'allEventBg'));
        allEventBg.alpha = 0;
    },

    startEvent: function(map, car, factory) {
        this.game.add.tween(whiteBg).to({ alpha: 1 }, 400, "Linear", true);
        var whiteBgTween = this.game.add.tween(whiteBg.scale).to({x: 1, y:1}, 500, Phaser.Easing.Linear.None, true);
        whiteBgTween.onComplete.add(function() {
            whiteBg.alpha = 0;
            allEventBg.alpha = 1;
        }, this);

        // Check type event in map
        // call function check in map
        // event = map.getEvent(carPosition);
        // switch(event) {
        //     case 
        // }

        this.investCarAndFactory(car, factory);
        // this.event();
        // this.trouble();
        // this.special();
        // this.buyCar(car);
    },

    investCarAndFactory: function(car, factory) {
        investBg = allEventBg.addChild(this.game.add.sprite(0, 0, 'investBg'));

        var btnCarDevelop = investBg.addChild(this.game.add.button(50, 255, 'btnCarDevelop'));
        btnCarDevelop.inputEnabled = true;
        btnCarDevelop.events.onInputOver.add(this.buttonOver, this);
        btnCarDevelop.events.onInputOut.add(this.buttonOut, this);
        btnCarDevelop.events.onInputDown.add(this.buttonDown, this);
        btnCarDevelop.events.onInputUp.add(function(button) {
            button.frame = 0;
            car.upgradeLevel();
        }, this);

        var btnFactoryBuild = investBg.addChild(this.game.add.button(285, 255, 'btnFactoryBuild'));
        btnFactoryBuild.inputEnabled = true;
        btnFactoryBuild.events.onInputOver.add(this.buttonOver, this);
        btnFactoryBuild.events.onInputOut.add(this.buttonOut, this);
        btnFactoryBuild.events.onInputDown.add(this.buttonDown, this);
        btnFactoryBuild.events.onInputUp.add(function(button) {
            button.frame = 0;
            factory.startBuiding();
        }, this);
    },

    event: function() {
        investBg = allEventBg.addChild(this.game.add.sprite(0, 0, 'allEventBg'));

        var eventHeader = investBg.addChild(this.game.add.sprite(0, -63, 'eventHeader'));
        var eventText   = investBg.addChild(this.game.add.sprite(investBg.centerX, 70, 'eventText'));
        eventText.anchor.set(0.5, 0);
        eventText.alpha = 0;

        this.game.time.events.add(500, function() {
            var headerTween = this.game.add.tween(eventHeader).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            headerTween.onComplete.add(function() {
                var textTween = this.game.add.tween(eventText).to({ alpha: 1 }, 200, "Linear", true);

                textTween.onComplete.add(function() {
                    var eventCardGroup = investBg.addChild(this.game.add.group());
                    eventCardGroup.create(90, 154, 'eventCard');
                    eventCardGroup.create(180, 154, 'eventCard');
                    eventCardGroup.create(270, 154, 'eventCard');
                    eventCardGroup.create(360, 154, 'eventCard');
                    eventCardGroup.create(450, 154, 'eventCard');
                    eventCardGroup.create(90, 260, 'eventCard');
                    eventCardGroup.create(180, 260, 'eventCard');
                    eventCardGroup.create(270, 260, 'eventCard');
                    eventCardGroup.create(360, 260, 'eventCard');
                    eventCardGroup.create(450, 260, 'eventCard');
                    
                    eventCardGroup.children.forEach(function(cardItem) {
                        cardItem.anchor.setTo(0.5);
                        this.game.add.tween(cardItem).to({ y: cardItem.y + 15 }, 200, Phaser.Easing.Linear.None, true);
                        cardItem.inputEnabled = true;
                        cardItem.events.onInputOver.add(this.buttonOver, this);
                        cardItem.events.onInputOut.add(this.buttonOut, this);
                        cardItem.events.onInputUp.add(this.randomEvent, this);
                    }, this);
                }, this);
            }, this);
        }, this).autoDestroy = true;
    },

    trouble: function() {
        investBg = allEventBg.addChild(this.game.add.sprite(0, 0, 'allEventBg'));

        var troubleHeader = investBg.addChild(this.game.add.sprite(0, -62, 'troubleHeader'));
        var troubleText   = investBg.addChild(this.game.add.sprite(investBg.centerX, 65, 'troubleText'));
        troubleText.anchor.set(0.5, 0);
        troubleText.alpha = 0;

        this.game.time.events.add(500, function() {
            var headerTween = this.game.add.tween(troubleHeader).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            headerTween.onComplete.add(function() {
                var textTween = this.game.add.tween(troubleText).to({ alpha: 1 }, 200, "Linear", true);

                textTween.onComplete.add(function() {
                    var troubleCardGroup = investBg.addChild(this.game.add.group());
                    troubleCardGroup.create(111, investBg.centerY + 24, 'troubleCard');
                    troubleCardGroup.create(270, investBg.centerY + 24, 'troubleCard');
                    troubleCardGroup.create(429, investBg.centerY + 24, 'troubleCard');

                    troubleCardGroup.children.forEach(function(cardItem) {
                        cardItem.anchor.setTo(0.5);
                        cardItem.scale.setTo(0.3);
                        this.game.add.tween(cardItem).to( { angle: 360 }, 700, Phaser.Easing.Linear.None, true);
                        this.game.add.tween(cardItem.scale).to( { x: 1, y: 1 }, 700, Phaser.Easing.Linear.None, true);
                        cardItem.inputEnabled = true;
                        cardItem.events.onInputOver.add(this.buttonOver, this);
                        cardItem.events.onInputOut.add(this.buttonOut, this);
                        cardItem.events.onInputUp.add(this.randomTrouble, this);
                    }, this);
                }, this);
            }, this);
        }, this).autoDestroy = true;
    },

    special: function() {
        investBg = allEventBg.addChild(this.game.add.sprite(0, 0, 'allEventBg'));

        var specialHeader = investBg.addChild(this.game.add.sprite(0, -62, 'specialHeader'));

        var specialCircle = investBg.addChild(this.game.add.sprite(investBg.centerX, investBg.centerY, 'specialCircle'));
        specialCircle.anchor.set(0.5);
        specialCircle.scale.set(0.1);
        specialCircle.alpha = 0.7;

        var specialStar   = investBg.addChild(this.game.add.sprite(investBg.centerX, investBg.centerY, 'specialStar'));
        specialStar.anchor.set(0.5);
        specialStar.scale.set(0.1);
        specialStar.alpha = 0.8;

        this.game.time.events.add(500, function() {
            var headerTween = this.game.add.tween(specialHeader).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            headerTween.onComplete.add(function() {
                this.game.add.tween(specialCircle.scale).to( { x: 2.7, y: 2.7 }, 400, Phaser.Easing.Linear.None, true);
                this.game.add.tween(specialStar.scale).to( { x: 2, y: 2 }, 800, Phaser.Easing.Linear.None, true);
                var circleTween = this.game.add.tween(specialCircle).to( { angle: 360 }, 600, Phaser.Easing.Linear.None, true);
                var starTween = this.game.add.tween(specialStar).to( { angle: 360 }, 800, Phaser.Easing.Linear.None, true);

                circleTween.onComplete.add(function() {
                    this.game.add.tween(specialCircle).to({ alpha: 0 }, 300, "Linear", true);
                }, this);
                starTween.onComplete.add(function() {
                    this.game.add.tween(specialStar.scale).to( { x: 3.5, y: 3.5 }, 300, Phaser.Easing.Linear.None, true);
                    var starTweenAngle = this.game.add.tween(specialStar).to( { angle: 360 }, 300, Phaser.Easing.Linear.None, true);

                    starTweenAngle.onComplete.add(function() { specialStar.alpha = 0; }, this);
                }, this);

                // Check special event 
                console.log("Call special card here");
            }, this);
        }, this).autoDestroy = true;
    },

    buyCar: function(car) {
        car.buyCar();
    },

    randomEvent: function(buttonCard) {
        this.game.add.tween(buttonCard).to({ y: -86 }, 500, Phaser.Easing.Linear.None, true);

        console.log("Function random event");
    },

    randomTrouble: function(buttonCard) {
        this.game.add.tween(buttonCard).to( { angle: 360 }, 800, Phaser.Easing.Linear.None, true);
        var scaleTween = this.game.add.tween(buttonCard.scale).to( { x: 0.1, y: 0.1 }, 800, Phaser.Easing.Linear.None, true);
        scaleTween.onComplete.add(function() { buttonCard.alpha = 0 }, this);

        console.log("Function random trouble");
    },

    resetAllEvent: function() {
        whiteBg.scale.setTo(0.1);
        whiteBg.alpha = 0;
        allEventBg.alpha = 0;

        if (typeof investBg !== 'undefined') {
            investBg.destroy();
        }
    },

    buttonOver: function(button) {
        if (button.key == 'eventCard' || button.key == 'troubleCard') {
            button.scale.setTo(1.1);
        } else {
            button.frame = 1;
        }
    },

    buttonOut: function(button) {
        if (button.key == 'eventCard' || button.key == 'troubleCard') {
            button.scale.setTo(1);
        } else {
            button.frame = 0;
        }
    },

    buttonDown: function(button) {
        button.frame = 2;
    },

};