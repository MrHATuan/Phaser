var Preload = function(game){}

Preload.prototype = {
    preload: function(){ 
        var loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.game.load.setPreloadSprite(loadingBar);
        // background
        this.load.image('bg', 'assets/img/bg.png');
        this.load.image('border', 'assets/img/border.png');
        this.load.image('right_frame', 'assets/img/right_frame.png');
        // map
        this.load.json('map', 'assets/map/map.json');
        this.load.spritesheet('mapsheet', 'assets/map/sheet.png', 110, 64, 2);
        // Car
        this.load.spritesheet('car', 'assets/img/car.png', 66, 52, 4);
        // dice
        this.load.spritesheet('diceBg', 'assets/img/dice/diceBg.png', 222, 222, 52);
        this.load.spritesheet('diceAll', 'assets/img/dice/dice_aimation.png', 83, 82, 12);
        this.load.spritesheet('dice', 'assets/img/dice/dice.png', 73, 81, 6);
        this.load.spritesheet('diceRandom', 'assets/img/dice/dice_random.png', 83, 83, 50);
        // factory
        this.load.image('factoryGround', 'assets/img/factory/ground.png');
        this.load.image('factory', 'assets/img/factory/factory.png');
        this.load.image('mainFactory', 'assets/img/factory/mainFactory.png');
        this.load.image('factoryNew', 'assets/img/factory/factoryNew.png');
        this.load.image('solarFactory', 'assets/img/factory/solarFactory.png');
        this.load.image('recycleFactory', 'assets/img/factory/recycleFactory.png');
        this.load.image('recycleFactoryNew', 'assets/img/factory/recycleFactoryNew.png');
        this.load.image('emissionFactory', 'assets/img/factory/emissionFactory.png');
        this.load.image('emissionFactoryNew', 'assets/img/factory/emissionFactoryNew.png');
        this.load.image('waterFactory', 'assets/img/factory/waterFactory.png');
        this.load.image('waterFactoryNew', 'assets/img/factory/waterFactoryNew.png');
    },
    create: function(){
        this.game.state.start("Main");
    }
}