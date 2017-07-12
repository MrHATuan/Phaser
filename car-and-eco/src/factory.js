var Factory = function(game, parentFactory, parentBuyFactory, main){
    this.game = game;
    this.main = main;


    var myFactory, recycleFactory, emissionFactory, waterFactory, 
    mainFactory, factoryNew, solarFactory, recycleFactoryNew, emissionFactoryNew, waterFactoryNew;

    var iconMainCover, iconSolarCover, iconRecycleCover, iconEmissionsCover, iconWaterCover;

    var buyFactoryBg, buyFactoryBorder, buyFactoryGroup, buyFactoryNoti;

    var btnClose, btnBack;

    this.building = {
        buyMain: {name: "buyMain", jpName: "最新省エネ機械", price: 80, eco: 6, ecoChip: 2, built: 0},
        buySolar: {name: "buySolar", jpName: "太陽光パネル", price: 40, eco: 4, ecoChip: 1, built: 0},
        buyRecycle: {name: "buyRecycle", jpName: "リサイクル工場", price: 100, eco: 8, ecoChip: 3, built: 0},
        buyEmssion: {name: "buyEmssion", jpName: "空気浄化(じょうか)そうち", price: 120, eco: 10, ecoChip: 3, built: 0},
        buyWater: {name: "buyWater", jpName: "水質浄化(すいしつじょうか)そうち", price: 120, eco: 10, ecoChip: 3, built: 0},
    };

    this.invest = 0;

    this.initFactory(parentFactory);
    this.initBuyFactory(parentBuyFactory);
};

Factory.prototype = {
    initFactory: function(parent){
        // Add Factory
        var factoryGround = parent.addChild(this.game.add.sprite(12, 83, 'factoryGround'));

        var factoryGroup  = factoryGround.addChild(this.game.add.group());
        myFactory          = factoryGroup.create(75, 22, 'factory');
        mainFactory        = factoryGroup.create(110, -112, 'mainFactory');
        factoryNew         = factoryGroup.create(72, -157, 'factoryNew');
        solarFactory       = factoryGroup.create(95, -158, 'solarFactory');
        recycleFactory     = factoryGroup.create(191, 119, 'recycleFactory');
        recycleFactoryNew  = factoryGroup.create(184, -91, 'recycleFactoryNew');
        emissionFactory    = factoryGroup.create(40, 107, 'emissionFactory');
        emissionFactoryNew = factoryGroup.create(32, -75, 'emissionFactoryNew');
        waterFactory       = factoryGroup.create(6, 155, 'waterFactory');
        waterFactoryNew    = factoryGroup.create(3, -86, 'waterFactoryNew');
        // A mask is a Graphics object
        var maskFactory = factoryGround.addChild(this.game.add.graphics(0, 0));
        maskFactory.beginFill(0xffffff);
        maskFactory.drawRect(0, 0, 316, 253);
        factoryGroup.mask = maskFactory;

        // Add Icon Factory
        var iconMain      = parent.addChild(this.game.add.sprite(64, 8, 'iconMain'));
        var iconSolar     = parent.addChild(this.game.add.sprite(118, 8, 'iconSolar'));
        var iconRecycle   = parent.addChild(this.game.add.sprite(172, 8, 'iconRecycle'));
        var iconEmissions = parent.addChild(this.game.add.sprite(226, 8, 'iconEmissions'));
        var iconWater     = parent.addChild(this.game.add.sprite(280, 8, 'iconWater'));

        var iconFactoryGroup = parent.addChild(this.game.add.group());
        iconMainCover      = iconFactoryGroup.create(65, 9, 'iconMainCover');
        iconSolarCover     = iconFactoryGroup.create(119, 9, 'iconSolarCover');
        iconRecycleCover   = iconFactoryGroup.create(173, 9, 'iconRecycleCover');
        iconEmissionsCover = iconFactoryGroup.create(227, 9, 'iconEmissionsCover');
        iconWaterCover     = iconFactoryGroup.create(281, 9, 'iconWaterCover');

        var maskIconFactory = parent.addChild(this.game.add.graphics(0, 0));
        maskIconFactory.beginFill(0xffffff);
        maskIconFactory.drawRect(65, 9, 265, 73);
        iconFactoryGroup.mask = maskIconFactory;
    },

    initBuyFactory: function(parent) {
        buyFactoryBg     = parent.addChild(this.game.add.sprite(561, 8, 'buyFactoryBg'));
        buyFactoryBorder = buyFactoryBg.addChild(this.game.add.sprite(8, 80, 'buyFactoryBorder'));
        buyFactoryBorder.alpha = 0;

        buyFactoryGroup = buyFactoryBorder.addChild(this.game.add.group());
        var buyMain    = buyFactoryGroup.create(15, 9, 'buyMain');
        var buySolar   = buyFactoryGroup.create(185, 9, 'buySolar');
        var buyRecycle = buyFactoryGroup.create(355, 9, 'buyRecycle');
        var buyWater   = buyFactoryGroup.create(15, 129, 'buyWater');
        var buyEmssion = buyFactoryGroup.create(185, 129, 'buyEmssion');

        buyFactoryGroup.children.forEach(function(buyItem) {
            var investOk = buyItem.addChild(this.game.add.sprite(42, 36, 'investOk'));
            investOk.visible = false;
            var btnBuyItem = buyItem.addChild(this.game.add.button(0, 84, 'btnBuyFactory'));
            btnBuyItem.inputEnabled = true;
            btnBuyItem.events.onInputOver.add(this.buttonOver, this);
            btnBuyItem.events.onInputOut.add(this.buttonOut, this);
            btnBuyItem.events.onInputDown.add(this.buttonDown, this);
            btnBuyItem.events.onInputUp.add(this.buttonUp, this);
        }, this);

        var moneyBg = buyFactoryBorder.addChild(this.game.add.sprite(35, 95, 'moneyBg'));

        // Button close and back
        btnClose = buyFactoryBorder.addChild(this.game.add.button(355, 213, 'btnClose1'));
        btnClose.inputEnabled = true;
        btnClose.events.onInputOver.add(this.buttonOver, this);
        btnClose.events.onInputOut.add(this.buttonOut, this);
        btnClose.events.onInputDown.add(this.buttonDown, this);
        btnClose.events.onInputUp.add(this.buttonClose, this);

        btnBack = buyFactoryBorder.addChild(this.game.add.button(459, 207, 'btnBack'));
        btnBack.inputEnabled = true;
        btnBack.events.onInputOver.add(this.buttonOver, this);
        btnBack.events.onInputOut.add(this.buttonOut, this);
        btnBack.events.onInputDown.add(this.buttonDown, this);
        btnBack.events.onInputUp.add(this.buttonBack, this);
    },

    startBuiding: function() {
        if (this.invest < 5) {
            var buyFactoryTween = this.game.add.tween(buyFactoryBg).to({ x: 8 }, 600, "Sine.easeInOut", true);

            buyFactoryTween.onComplete.add(function() {
                this.game.add.tween(buyFactoryBorder).to({ alpha: 1 }, 200, "Linear", true);
            }, this);
        } else {
            console.log("You built all Building");
        }
    },

    buildFactory: function(factoryName) {
        switch(factoryName) {
            case this.building.buyMain.name:
                // Check solarFactory has been built
                if(solarFactory.y > 0) {
                    solarFactory.y = -158;

                    var factoryTween = this.game.add.tween(myFactory).to({ y: -137 }, 800, "Sine.easeInOut", true);

                    factoryTween.onComplete.add(function() {
                        var mainFactoryTween = this.game.add.tween(mainFactory).to({ y: 30 }, 800, "Sine.easeInOut", true);

                        mainFactoryTween.onComplete.add(function() {
                            this.game.add.tween(factoryNew).to({ y: 3 }, 800, "Sine.easeInOut", true);
                            this.game.add.tween(solarFactory).to({ y: 2 }, 800, "Sine.easeInOut", true);
                        }, this);
                    }, this);
                } else {
                    var factoryTween = this.game.add.tween(myFactory).to({ y: -137 }, 800, "Sine.easeInOut", true);

                    factoryTween.onComplete.add(function() {
                        var mainFactoryTween = this.game.add.tween(mainFactory).to({ y: 30 }, 800, "Sine.easeInOut", true);

                        mainFactoryTween.onComplete.add(function() {
                            this.game.add.tween(factoryNew).to({ y: 3 }, 800, "Sine.easeInOut", true);
                        }, this);
                    }, this);
                }

                var iconFactoryTween = this.game.add.tween(iconMainCover).to({ y: -73 }, 1500, "Sine.easeInOut", true);
                break;

            case this.building.buySolar.name:
                // Check mainFactory has been built
                if(mainFactory.y > 0) {
                    this.game.add.tween(solarFactory).to({ y: 2 }, 1600, "Sine.easeInOut", true);
                } else {
                    this.game.add.tween(solarFactory).to({ y: 22 }, 1600, "Sine.easeInOut", true);
                }

                var iconFactoryTween = this.game.add.tween(iconSolarCover).to({ y: -73 }, 1500, "Sine.easeInOut", true);
                break;

            case this.building.buyRecycle.name:
                var factoryTween = this.game.add.tween(recycleFactory).to({ y: -80 }, 1000, "Sine.easeInOut", true);

                factoryTween.onComplete.add(function() {
                    this.game.add.tween(recycleFactoryNew).to({ y: 110 }, 1000, "Sine.easeInOut", true);
                }, this);

                var iconFactoryTween = this.game.add.tween(iconRecycleCover).to({ y: -73 }, 1500, "Sine.easeInOut", true);
                break;

            case this.building.buyEmssion.name:
                var factoryTween = this.game.add.tween(emissionFactory).to({ y: -76 }, 1000, "Sine.easeInOut", true);

                factoryTween.onComplete.add(function() {
                    this.game.add.tween(emissionFactoryNew).to({ y: 109 }, 1000, "Sine.easeInOut", true);
                }, this);

                var iconFactoryTween = this.game.add.tween(iconEmissionsCover).to({ y: -73 }, 1500, "Sine.easeInOut", true);
                break;

            case this.building.buyWater.name:
                var factoryTween = this.game.add.tween(waterFactory).to({ y: -76 }, 1000, "Sine.easeInOut", true);

                factoryTween.onComplete.add(function() {
                    this.game.add.tween(waterFactoryNew).to({ y: 165 }, 1000, "Sine.easeInOut", true);
                }, this);

                var iconFactoryTween = this.game.add.tween(iconWaterCover).to({ y: -73 }, 1500, "Sine.easeInOut", true);
                break;

            default:
                break;
        }

        // Call score
        // score.changeMoney(this.building[factoryName].price);

        this.game.time.events.add(2200, function() {
            this.notification(this.building[factoryName].jpName, this.building[factoryName].eco, this.building[factoryName].ecoChip);
            // Call score
            // score.changeEco(this.building[factoryName].eco);
            // score.changeEcoChip(this.building[factoryName].ecoChip);
        }, this).autoDestroy = true;
    },

    notification: function(jpName, eco, ecoChip) {
        buyFactoryNoti = buyFactoryBg.addChild(this.game.add.sprite(105, 75, 'buyFactoryNoti'));

        var style1 = { font: '15px Arial', fill: '#000', align: 'center', wordWrap: true, wordWrapWidth: 300 };
        var style2 = { font: "14px Arial", fill: "#000", align: 'left'};

        var textName    = buyFactoryNoti.addChild(this.game.add.text(170, 12, jpName + "に 投資(とうし)しました", style1));
        textName.anchor.set(0.5, 0);
        var textEco     = buyFactoryNoti.addChild(this.game.add.text(50, 70, "【" + eco + "】かんきょうが良くなりました", style2));
        var textEcoChip = buyFactoryNoti.addChild(this.game.add.text(50, 105, "エコチップ" + ecoChip + "まいゲット!!", style2));

        var btnGameContinue = buyFactoryNoti.addChild(this.game.add.button(170, 135, 'btnGameContinue'));
        btnGameContinue.anchor.set(0.5, 0);
        btnGameContinue.inputEnabled = true;
        btnGameContinue.events.onInputOver.add(this.buttonOver, this);
        btnGameContinue.events.onInputOut.add(this.buttonOut, this);
        btnGameContinue.events.onInputDown.add(this.buttonDown, this);
        btnGameContinue.events.onInputUp.add(this.buttonClose, this);
    },

    resetBuyFactoryPosition: function() {
        if (typeof buyFactoryNoti !== 'undefined') {
            buyFactoryNoti.destroy();
        }

        buyFactoryBg.x = 561;
        buyFactoryBorder.alpha = 0;

        buyFactoryGroup.children.forEach(function(buyItem) {
            if (this.building[buyItem.key].built === 0) {
                buyItem.children[1].inputEnabled = true;
            } else {
                buyItem.alpha = 0.6;
            }

            buyItem.children[1].alpha = 1;
        }, this);

        btnClose.inputEnabled = true;
        btnClose.alpha = 1;
        btnBack.inputEnabled = true;
        btnBack.alpha = 1;
    },

    buttonUp: function(button) {
        button.frame = 0;

        buyFactoryGroup.children.forEach(function(buyItem) {
            buyItem.children[1].inputEnabled = false;
            buyItem.children[1].alpha = 0.6;
        }, this);
        btnClose.inputEnabled = false;
        btnClose.alpha = 0.6;
        btnBack.inputEnabled = false;
        btnBack.alpha = 0.6;

        // button.alpha = 1;
        // button.parent.alpha = 0.6;
        button.parent.children[0].visible = true;
        // button.parent.children[0].alpha = 1;

        // Save built
        this.invest += 1;
        this.building[button.parent.key].built = 1;
        // Built
        this.buildFactory(button.parent.key);
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
        this.resetBuyFactoryPosition();
    },

    buttonClose: function(button) {
        button.frame = 0;
        this.resetBuyFactoryPosition();
        this.main.resetGamePlay();
    }
}