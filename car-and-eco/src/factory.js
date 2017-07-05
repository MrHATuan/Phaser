var Factory = function(game, parent, x, y){
    var factory1, factory2, factory3, factory4, factory5, 
    factory1_1, factory1_2, factory3_1, factory4_1, factory5_1;

    this.initFactory(game, parent, x, y);
};

Factory.prototype = {
    initFactory: function(game, parent, x, y){
        this.game = game;
        this.building = 1;

        var factoryGround = parent.addChild(this.game.add.sprite(x, y, 'factoryGround'));

        var factoryGroup = factoryGround.addChild(this.game.add.group());
        factory1   = factoryGroup.create(75, 22, 'factory1');
        factory1_1 = factoryGroup.create(110, -112, 'factory1_1');
        factory1_2 = factoryGroup.create(72, -157, 'factory1_2');
        factory2   = factoryGroup.create(95, -158, 'factory2');
        factory3   = factoryGroup.create(191, 119, 'factory3');
        factory3_1 = factoryGroup.create(184, -91, 'factory3_1');
        factory4   = factoryGroup.create(40, 107, 'factory4');
        factory4_1 = factoryGroup.create(32, -75, 'factory4_1');
        factory5   = factoryGroup.create(6, 155, 'factory5');
        factory5_1 = factoryGroup.create(3, -86, 'factory5_1');

        // A mask is a Graphics object
        var maskFactory = factoryGround.addChild(this.game.add.graphics(0, 0));
        maskFactory.beginFill(0xffffff);
        maskFactory.drawRect(0, 0, 316, 253);
        //  And apply it to the Group itself
        factoryGroup.mask = maskFactory;
    },

    buildingFactory: function(factory) {
        switch(factory) {
            case 1:
                if(factory2.y > 0) {
                    factory2.y = -158;

                    var factoryTween1 = this.game.add.tween(factory1).to({ y: -137 }, 1000, "Sine.easeInOut", true);

                    factoryTween1.onComplete.add(function() {
                        var factoryTween1_1 = this.game.add.tween(factory1_1).to({ y: 30 }, 1000, "Sine.easeInOut", true);

                        factoryTween1_1.onComplete.add(function() {
                            this.game.add.tween(factory1_2).to({ y: 3 }, 1000, "Sine.easeInOut", true);
                            this.game.add.tween(factory2).to({ y: 2 }, 1000, "Sine.easeInOut", true);
                        }, this);
                    }, this);
                } else {
                    var factoryTween1 = this.game.add.tween(factory1).to({ y: -137 }, 1000, "Sine.easeInOut", true);

                    factoryTween1.onComplete.add(function() {
                        var factoryTween1_1 = this.game.add.tween(factory1_1).to({ y: 30 }, 1000, "Sine.easeInOut", true);

                        factoryTween1_1.onComplete.add(function() {
                            this.game.add.tween(factory1_2).to({ y: 3 }, 1000, "Sine.easeInOut", true);
                        }, this);
                    }, this);
                }

                break;
            case 2:
                if(factory1.y > 0) {
                    this.game.add.tween(factory2).to({ y: 22 }, 1000, "Sine.easeInOut", true);
                } else {
                    this.game.add.tween(factory2).to({ y: 2 }, 1000, "Sine.easeInOut", true);
                }
                break;
            case 3:
                var factoryTween = this.game.add.tween(factory3).to({ y: -80 }, 1000, "Sine.easeInOut", true);

                factoryTween.onComplete.add(function() {
                    this.game.add.tween(factory3_1).to({ y: 110 }, 1000, "Sine.easeInOut", true);
                }, this);

                break;
            case 4:
                var factoryTween = this.game.add.tween(factory4).to({ y: -76 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    this.game.add.tween(factory4_1).to({ y: 109 }, 1000, "Sine.easeInOut", true);
                }, this);

                break;
            case 5:
                var factoryTween = this.game.add.tween(factory5).to({ y: -76 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    this.game.add.tween(factory5_1).to({ y: 165 }, 1000, "Sine.easeInOut", true);
                }, this);

                break;
            default:
                break;
        }
    }
}