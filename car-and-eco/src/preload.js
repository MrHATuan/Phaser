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
        this.load.image('factory1', 'assets/img/factory/factory1.png');
        this.load.image('factory3', 'assets/img/factory/factory3.png');
        this.load.image('factory4', 'assets/img/factory/factory4.png');
        this.load.image('factory5', 'assets/img/factory/factory5.png');
        this.load.image('factory1_1', 'assets/img/factory/factory1_1.png');
        this.load.image('factory3_1', 'assets/img/factory/factory3_1.png');
        this.load.image('factory4_1', 'assets/img/factory/factory4_1.png');
        this.load.image('factory5_1', 'assets/img/factory/factory5_1.png');
	},
  	create: function(){
		this.game.state.start("Main");
	}
}