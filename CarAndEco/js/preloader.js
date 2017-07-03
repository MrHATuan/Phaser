Preloader = function () {
    
};

Preloader.prototype = {
    preload: function () {
        this.load.image('background', 'assets/images/background.png');

        this.load.image('gameplayBg', 'assets/images/bg_game.png');
        this.load.spritesheet('diceBg', 'assets/images/bg_dice.png', 222, 222, 52);
        this.load.spritesheet('diceAll', 'assets/images/ss_all.png', 83, 82, 12);
        this.load.spritesheet('dice', 'assets/images/dice.png', 73, 81, 6);
        this.load.spritesheet('diceRandom', 'assets/images/ss_random.png', 83, 83, 50);

        this.load.image('factoryBg', 'assets/images/factory/bg_factory.png');
        this.load.image('factoryGround', 'assets/images/factory/ground.png');
        this.load.image('factory1', 'assets/images/factory/factory1.png');
        this.load.image('factory3', 'assets/images/factory/factory3.png');
        this.load.image('factory4', 'assets/images/factory/factory4.png');
        this.load.image('factory5', 'assets/images/factory/factory5.png');
        this.load.image('factory1_1', 'assets/images/factory/factory1_1.png');
        this.load.image('factory3_1', 'assets/images/factory/factory3_1.png');
        this.load.image('factory4_1', 'assets/images/factory/factory4_1.png');
        this.load.image('factory5_1', 'assets/images/factory/factory5_1.png');

        this.load.image('road1', 'assets/images/road/road1.png');
        this.load.image('road2', 'assets/images/road/road2.png');
        this.load.image('road3', 'assets/images/road/road3.png');
        this.load.image('road4', 'assets/images/road/road4.png');


        this.load.spritesheet('carA', 'assets/images/cars/car_A.png', 66, 55, 4);


        // // add
        // var loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,"loading");
        // loadingBar.anchor.setTo(0.5,0.5);
        // this.game.load.setPreloadSprite(loadingBar);
        // this.load.json('map', 'assets/map/map.json');
        // this.load.spritesheet('mapsheet', 'assets/map/sheet.png', 110, 64, 2);

        // this.load.image('bg', 'assets/img/bg.png');
        // this.load.image('border', 'assets/img/border.png');
        // this.load.image('right_frame', 'assets/img/right_frame.png');
        // this.load.spritesheet('car', 'assets/img/car.png', 66, 52, 4);

    },

    create: function () {
        this.game.state.start('arena');
    }
};