Player = function(game, arena, x, y) {
    this.game = game;
    this.arena = arena;
    this.score = 0;

    this.initPlayer(game, arena, x, y);
};

Player.prototype.initPlayer = function(game, arena, x, y) {
    this.player = game.add.sprite(x, y, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);
    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
    this.player.body.velocity.x = 0;
    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

};

Player.prototype.update = function(platforms, stars) {
    this.game.physics.arcade.collide(this.player, platforms);

    this.game.physics.arcade.overlap(this.player, stars, function() {this.score += 10;}, null, this);
};

Player.prototype.move = function(direction) {
    switch(direction) {
        case 'left':
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
            break;
        case 'right':
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
            break;
        case 'jump':
            this.player.body.velocity.y = -350;
            break;
        default:
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 4;
            break;
    }
};