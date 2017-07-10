var Event = function(game, parent, main){
    this.game = game;
    this.main = main;

    var whiteBg, allEventBg;
    var investBg, eventHeader, eventText, troubleHeader, troubleText, specialHeader;

    var btnCarDevelop, btnFactoryBuild;

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

        var maskEvent = parent.addChild(this.game.add.graphics(0, 0));
        maskEvent.beginFill(0xffffff);
        maskEvent.drawRect(8, 8, 541, 342);
        allEventBg.mask = maskEvent;
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

        // this.investCarAndFactory(car, factory);
        this.event();
        // this.trouble();
        // this.special();
        // this.buyCar();
    },

    investCarAndFactory: function(car, factory) {
        investBg = allEventBg.addChild(this.game.add.sprite(0, 0, 'investBg'));

        btnCarDevelop = investBg.addChild(this.game.add.button(50, 255, 'btnCarDevelop'));
        btnCarDevelop.inputEnabled = true;
        btnCarDevelop.events.onInputOver.add(this.buttonOver, this);
        btnCarDevelop.events.onInputOut.add(this.buttonOut, this);
        btnCarDevelop.events.onInputDown.add(this.buttonDown, this);
        btnCarDevelop.events.onInputUp.add(function(button) {
            button.frame = 0;
            car.upgradeLevel();
        }, this);

        btnFactoryBuild = investBg.addChild(this.game.add.button(285, 255, 'btnFactoryBuild'));
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
        eventHeader = allEventBg.addChild(this.game.add.sprite(0, -63, 'eventHeader'));
        eventText   = allEventBg.addChild(this.game.add.sprite(allEventBg.centerX, 70, 'eventText'));
        eventText.anchor.set(0.5, 0);
        eventText.alpha = 0;

        this.game.time.events.add(500, function() {
            var headerTween = this.game.add.tween(eventHeader).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            headerTween.onComplete.add(function() {
                eventText.alpha = 1;

                var eventCardGroup = allEventBg.addChild(this.game.add.group());
                eventCardGroup.create(55, 120, 'eventCard');
            }, this);
        }, this).autoDestroy = true;

        // to do
    },

    trouble: function() {
        troubleHeader = allEventBg.addChild(this.game.add.sprite(0, -62, 'troubleHeader'));
        troubleText = allEventBg.addChild(this.game.add.sprite(allEventBg.centerX, 65, 'troubleText'));
        troubleText.anchor.set(0.5, 0);
        troubleText.alpha = 0;

        this.game.time.events.add(500, function() {
            var headerTween = this.game.add.tween(troubleHeader).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            headerTween.onComplete.add(function() {
                troubleText.alpha = 1;
            }, this);
        }, this).autoDestroy = true;

        //  to do
    },

    special: function() {
        specialHeader = allEventBg.addChild(this.game.add.sprite(0, -62, 'specialHeader'));

        this.game.time.events.add(500, function() {
            var headerTween = this.game.add.tween(specialHeader).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            // headerTween.onComplete.add(function() {
            //     troubleText.alpha = 1;
            // }, this);
        }, this).autoDestroy = true;
    },

    buyCar: function() {

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
        button.frame = 1;
    },

    buttonOut: function(button) {
        button.frame = 0;
    },

    buttonDown: function(button) {
        button.frame = 2;
    },

};