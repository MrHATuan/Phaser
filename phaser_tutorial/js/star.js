Star = function(game, arena, x, y) {
    this.game = game;
    this.arena = arena;

    this.stars = game.add.group();
    this.stars.enableBody =  true;

    this.initStars(this.stars);
};

Star.prototype.initStars = function(stars) {
    for(var i = 0; i < 12; i++) {
        this.initStar(stars, i * 70, 0);
    }
};

Star.prototype.initStar = function(stars, x, y) {
    var star = stars.create(x, y, 'star');
    //  Let gravity do its thing
    star.body.gravity.y = 6;
    //  This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
};

Star.prototype.update = function(platforms, player) {
    this.game.physics.arcade.collide(this.stars, platforms);

    this.game.physics.arcade.overlap(player, this.stars, function(player, star) {
        star.kill();

        this.game.time.events.add(Phaser.Timer.SECOND * 10, function() {
        // Create new star on top after 5 second
            this.initStar(this.stars, star.x, 0);
        }, this).autoDestroy = true;
    }, null, this);
};