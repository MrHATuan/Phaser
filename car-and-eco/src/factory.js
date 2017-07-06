var Factory = function(game, parent){
    var myFactory, recycleFactory, emissionFactory, waterFactory, 
    mainFactory, factoryNew, solarFactory, recycleFactoryNew, emissionFactoryNew, waterFactoryNew;

    this.initFactory(game, parent);
};

Factory.prototype = {
    initFactory: function(game, parent){
        this.game = game;

        this.building = {
            mainFactory: {name: "mainFactory", price: 80, eco: 6, ecoChip: 2},
            solarFactory: {name: "solarFactory", price: 40, eco: 4, ecoChip: 1},
            recycleFactory: {name: "emissionFactory", price: 100, eco: 8, ecoChip: 3},
            emissionFactory: {name: "emissionFactory", price: 120, eco: 10, ecoChip: 3},
            waterFactory: {name: "waterFactory", price: 120, eco: 10, ecoChip: 3},
        };

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
        //  And apply it to the Group itself
        factoryGroup.mask = maskFactory;
    },

    buildFactory: function(factoryName) {
        switch(factoryName) {
            case this.building.mainFactory.name:
                // Check solarFactory has been built
                if(solarFactory.y > 0) {
                    solarFactory.y = -158;

                    var factoryTween = this.game.add.tween(myFactory).to({ y: -137 }, 1000, "Sine.easeInOut", true);

                    factoryTween.onComplete.add(function() {
                        var mainFactoryTween = this.game.add.tween(mainFactory).to({ y: 30 }, 1000, "Sine.easeInOut", true);

                        mainFactoryTween.onComplete.add(function() {
                            this.game.add.tween(factoryNew).to({ y: 3 }, 1000, "Sine.easeInOut", true);
                            this.game.add.tween(solarFactory).to({ y: 2 }, 1000, "Sine.easeInOut", true);
                        }, this);
                    }, this);
                } else {
                    var factoryTween = this.game.add.tween(myFactory).to({ y: -137 }, 1000, "Sine.easeInOut", true);

                    factoryTween.onComplete.add(function() {
                        var mainFactoryTween = this.game.add.tween(mainFactory).to({ y: 30 }, 1000, "Sine.easeInOut", true);

                        mainFactoryTween.onComplete.add(function() {
                            this.game.add.tween(factoryNew).to({ y: 3 }, 1000, "Sine.easeInOut", true);
                        }, this);
                    }, this);
                }

                break;
            case this.building.solarFactory.name:
                // Check mainFactory has been built
                if(mainFactory.y > 0) {
                    this.game.add.tween(solarFactory).to({ y: 2 }, 1000, "Sine.easeInOut", true);
                } else {
                    this.game.add.tween(solarFactory).to({ y: 22 }, 1000, "Sine.easeInOut", true);
                }

                break;
            case this.building.recycleFactory.name:
                var factoryTween = this.game.add.tween(recycleFactory).to({ y: -80 }, 1000, "Sine.easeInOut", true);

                factoryTween.onComplete.add(function() {
                    this.game.add.tween(recycleFactoryNew).to({ y: 110 }, 1000, "Sine.easeInOut", true);
                }, this);

                break;
            case this.building.emissionFactory.name:
                var factoryTween = this.game.add.tween(emissionFactory).to({ y: -76 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    this.game.add.tween(emissionFactoryNew).to({ y: 109 }, 1000, "Sine.easeInOut", true);
                }, this);

                break;
            case this.building.waterFactory.name:
                var factoryTween = this.game.add.tween(waterFactory).to({ y: -76 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    this.game.add.tween(waterFactoryNew).to({ y: 165 }, 1000, "Sine.easeInOut", true);
                }, this);

                break;
            default:
                break;
        }

        // Call score
        // score.changeMoney(this.building["factoryName"].price);
        // score.changeEco(this.building.["factoryName"].eco);
        // score.changeEcoChip(this.building.["factoryName"].ecoChip);
    }
}