Preloader = function () {
    
};

Preloader.prototype = {
    preload: function () {
        this.load.image('sky', 'assets/img/sky.png');
        this.load.image('ground', 'assets/img/platform.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    },

    create: function () {
        this.game.state.start('arena');
    }
};