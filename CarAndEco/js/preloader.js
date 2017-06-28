Preloader = function () {
    
};

Preloader.prototype = {
    preload: function () {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('gameplayBg', 'assets/images/bg_game.png');
        this.load.spritesheet('diceBg', 'assets/images/bg_dice.png', 222, 222, 52);
        this.load.spritesheet('diceAll', 'assets/images/ss_all.png', 83, 82, 12);

        this.load.image('factoryBg', 'assets/images/factory/bg_factory.png');
        this.load.image('factoryGround', 'assets/images/factory/ground.png');
        this.load.image('factory1', 'assets/images/factory/factory1.png');
        this.load.image('factory3', 'assets/images/factory/factory3.png');
        this.load.image('factory4', 'assets/images/factory/factory4.png');
        this.load.image('factory5', 'assets/images/factory/factory5.png');

        this.load.image('road1', 'assets/images/road/road1.png');
        this.load.image('road2', 'assets/images/road/road2.png');
        this.load.image('road3', 'assets/images/road/road3.png');
        this.load.image('road4', 'assets/images/road/road4.png');


        this.load.spritesheet('carA', 'assets/images/cars/car_A.png', 66, 55, 4);
    },

    create: function () {
        this.game.state.start('arena');
    }
};