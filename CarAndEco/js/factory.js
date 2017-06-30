Factory = function(game, arena, parent, x, y) {
    this.initFactory(game, parent, x, y);
};

Factory.prototype.initFactory = function(game, parent, x, y) {
    this.game = game;
    this.arena = arena;

    this.building = 0;

    var factoryGround = parent.addChild(this.game.add.sprite(x, y, 'factoryGround'));

    var factoryGroup = factoryGround.addChild(this.game.add.group());
    var factory1 = factoryGroup.create(75, 24, 'factory1');
    var factory1_1 = factoryGroup.create(72, -155, 'factory1_1');
    var factory3 = factoryGroup.create(191, 118, 'factory3');
    var factory3_1 = factoryGroup.create(183, -90, 'factory3_1');
    var factory4 = factoryGroup.create(6, 155, 'factory4');
    var factory4_1 = factoryGroup.create(3, -102, 'factory4_1');
    var factory5 = factoryGroup.create(39, 107, 'factory5');
    var factory5_1 = factoryGroup.create(32, -95, 'factory5_1');

    //  A mask is a Graphics object
    var maskFactory = factoryGround.addChild(this.game.add.graphics(0, 0));
    maskFactory.beginFill(0xffffff);
    maskFactory.drawRect(74, 0, 200, 161);
    maskFactory.drawRect(188, 0, 124, 198);
    maskFactory.drawRect(3, 0, 126, 230);
    maskFactory.drawRect(32, 0, 113, 183);
    // //  And apply it to the Group itself
    factoryGroup.mask = maskFactory;
};

Factory.prototype.buildingFactory = function(level) {
    switch(level) {
        case 0:
            this.building = 1;
            var factoryTween = this.game.add.tween(factory1).to({ y: -148 }, 1000, "Sine.easeInOut", true);
            factoryTween.onComplete.add(function() {
                this.game.add.tween(factory1_1).to({ y:3 }, 1000, "Sine.easeInOut", true);
            }, this);

            break;
        case 1:
            this.building = 3;
            var factoryTween = this.game.add.tween(factory3).to({ y: -78 }, 1000, "Sine.easeInOut", true);
            factoryTween.onComplete.add(function() {
                this.game.add.tween(factory3_1).to({ y: 111 }, 1000, "Sine.easeInOut", true);
            }, this);

            break;
        case 2:
            break;
        case 3:
            this.building = 4;
            this.building = 3;
            var factoryTween = this.game.add.tween(factory4).to({ y: -102 }, 1000, "Sine.easeInOut", true);
            factoryTween.onComplete.add(function() {
                this.game.add.tween(factory4_1).to({ y: 165 }, 1000, "Sine.easeInOut", true);
            }, this);

            break;
        case 4:
            this.building = -1;
            var factoryTween = this.game.add.tween(factory5).to({ y: -95 }, 1000, "Sine.easeInOut", true);
            factoryTween.onComplete.add(function() {
                this.game.add.tween(factory5_1).to({ y: 109 }, 1000, "Sine.easeInOut", true);
            }, this);

            break;
        default:
            break;
    }
};