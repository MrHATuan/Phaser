var game = new Phaser.Game(920, 620, Phaser.AUTO);
game.state.add('Boot',Boot);
game.state.add('Preload',Preload);
game.state.add('Main',Main);

game.state.start('Boot');