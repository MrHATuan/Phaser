window.onload = function () {
    var game, preloader, arena;

    var gameWidth  = 920;
    var gameHeight = 620;

    game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser-example');

    preloader = new Preloader(game);
    arena = new Arena(game);

    game.state.add('preloader', preloader);
    game.state.add('arena', arena);

    game.state.start('preloader');
};