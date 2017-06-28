Arena = function(game) {
    this.game = game;
    this.platforms;
    this.player;

    this.stars;

    this.tmp = 0;

    this.scoreText;

    var cursors;
};

Arena.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.sprite(0, 0, 'sky');

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = this.platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(200, 100, 'ground');
        ledge.body.immovable = true;

        newPlayer = new Player(this.game, this, 32, this.game.world.height - 150, this.platforms);
        this.player = newPlayer;

        newStars = new Star(this.game, this);
        this.stars = newStars;

        //  The score
        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        //  Collide the player and the stars with the platforms
        this.player.update(this.platforms, this.stars.stars);
        this.stars.update(this.platforms, this.player.player);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        // game.physics.arcade.overlap(player, stars, collectStar, null, this);

        if (cursors.left.isDown) {
            this.player.move('left');
        } else if (cursors.right.isDown) {
            this.player.move('right');
        } else {
            this.player.move();
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.player.player.body.touching.down) {
            this.player.move('jump');
        }
    },

    render: function() {
        this.scoreText.text = 'Score: ' + this.player.score;
    },
};