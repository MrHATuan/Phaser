Arena = function(game) {
    this.game = game;

    var background, gameplayBg, factoryBg, diceBg, diceAll, factoryGround, factory1, factory3, factory4, factory5;

    this.roads;

    this.car;

    this.stars;

    this.tmp = 0;

    this.scoreText;

    var cursors;

    var moving = 0;
};



Arena.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.game.add.sprite(0, 0, 'background');
        gameplayBg = background.addChild(this.game.add.sprite(8, 100, 'gameplayBg'));
        factoryBg  = background.addChild(this.game.add.sprite(578, 118, 'factoryBg'));

        diceBg     = gameplayBg.addChild(this.game.add.sprite(345, 148, 'diceBg'));
        diceBg.animations.add('open', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27], 50, false);
        diceBg.animations.play('open');
        diceAll = diceBg.addChild(this.game.add.sprite(69 , 70, 'diceAll'));
        diceAll.animations.add('turn');
        diceAll.animations.play('turn', 90, true);

        factoryGround = factoryBg.addChild(this.game.add.sprite(12, 83, 'factoryGround'));
        factory1 = factoryGround.addChild(this.game.add.sprite(75, 24, 'factory1'));
        factory3 = factoryGround.addChild(this.game.add.sprite(191, 118, 'factory3'));
        factory4 = factoryGround.addChild(this.game.add.sprite(6, 154, 'factory4'));
        factory5 = factoryGround.addChild(this.game.add.sprite(39, 107, 'factory5'));

        this.roads = this.game.add.group();
        this.roads.enableBody =  true;
        for (var i = 1; i < 11; i++) {
            switch(Math.floor(Math.random() * 3)) {
                case 0:
                    var road = gameplayBg.addChild(this.roads.create(10 + i * 45, gameplayBg.height - 70 - i * 25, 'road1'));
                    break;
                case 1:
                    var road = gameplayBg.addChild(this.roads.create(10 + i * 45, gameplayBg.height - 70 - i * 25, 'road2'));
                    break;
                case 2:
                    var road = gameplayBg.addChild(this.roads.create(10 + i * 45, gameplayBg.height - 70 - i * 25, 'road3'));
                    break;
                case 3:
                    var road = gameplayBg.addChild(this.roads.create(10 + i * 45, gameplayBg.height - 70 - i * 25, 'road4'));
                    break;
                default:
                    break;
            }
            
        }

        this.car = gameplayBg.addChild(this.game.add.sprite(15, gameplayBg.height - 80, 'carA'));
        this.game.physics.arcade.enable(this.car);

        cursors = this.game.input.keyboard.createCursorKeys();

    },

    update: function() {
        // this.game.physics.arcade.collide(this.car, this.roads);

        if(this.game.input.activePointer.leftButton.isDown) {
            var carY = this.car.y

            this.game.add.tween(this.car).to( { x: this.car.x + 45 }, 2000, "Sine.easeInOut", true);
            this.game.add.tween(this.car).to( { y: carY - 80 }, 900, "Sine.easeInOut", true);

            this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                this.game.add.tween(this.car).to( { y: carY - 25 }, 900, "Sine.easeInOut", true);
            }, this).autoDestroy = true;
        }

        this.game.physics.arcade.overlap(this.car, this.roads, function(car, road) {
            console.log(road);
        }, null, this);
    },

    render: function() {

    },
};

function randomString(number) {
    return Math.floor(Math.random()*number);
}