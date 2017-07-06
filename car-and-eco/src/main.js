var Main = function(game){
    this.game = game;

    var map,
    car,
    factory;

    var diceBg, diceAll, diceRandom, dice;
};

Main.prototype = {
    create: function(){
        var bg = this.game.add.sprite(0, 0, 'bg');
        bg.fixedToCamera = true;

        var border = this.game.add.sprite(10, 100, 'border');
        border.fixedToCamera = true;

        var right_frame = this.game.add.sprite(border.width + 10, 118, 'right_frame');
        right_frame.fixedToCamera = true;


        map = new Map(this.game);
        map.loadMap('map', 'mapsheet');
        map.createLayer('map');

        var mask = this.game.add.graphics(0, 0);
        //  Shapes drawn to the Graphics object must be filled.
        mask.beginFill(0xffffff);
        mask.drawRect(10, 100, border.width - 10, border.height - 10);
        //  And apply it to the Group itself
        map.tiles.mask = mask;
        mask.fixedToCamera = true;

        // New Car
        var car_position = map.getTile(map.start_position);
        var car_x = car_position.x+24;
        var car_y = car_position.y+8;
        car = new Car(this.game, car_x, car_y);

        // Add Factory
        factory = new Factory(this.game, right_frame);

        // Create duce
        diceBg = border.addChild(this.game.add.button(340, 140, 'diceBg'));
        diceBg.inputEnabled = true;
        diceBg.animations.add('open', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27], 50, false);
        diceBg.animations.add('close', [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51], 50, false);
        diceBg.animations.play('open');
        diceAll = diceBg.addChild(this.game.add.sprite(70, 70, 'diceAll'));
        diceAll.animations.add('turn');
        diceAll.animations.play('turn', 30, true);
        // Create dice random
        diceRandom = border.addChild(this.game.add.sprite(410 , 210, 'diceAll'));
        diceRandom.animations.add('random');
        diceRandom.bringToTop();
        diceRandom.visible = false;
        // Create dice open
        dice = border.addChild(this.game.add.sprite(50 , 50, 'dice'));
        dice.visible = false;

        this.game.camera.deadzone = new Phaser.Rectangle(100, 300, 10, 10);

        // Input
        var cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        diceBg.onInputUp.add(this.gamePlay, this);
    },

    render: function() {
        // debug
    },

    gamePlay: function() {
        diceBg.animations.play('close').onComplete.add(function() {
            diceBg.visible = false;
        }, this);
        diceAll.visible = false;
        diceRandom.visible = true;
        // Get Random
        var random = Math.floor(Math.random() * 4) + 1;
        // Dice animation
        this.randomDice(random);

        // Wait time animation end
        this.game.time.events.add(1500, function() {
            car.jumpTo(random, map);
            factory.buildFactory("mainFactory");
        }, this).autoDestroy = true;

        // Wait game play end
        this.game.time.events.add((random + 1) * 1000 + 1500, function() {
            diceAll.visible = true;
            diceBg.visible = true;
            dice.visible = false;
            diceBg.animations.play('open');
        }, this).autoDestroy = true;
    },

    randomDice: function(random) {
        diceRandom.animations.play('random', 50, true);

        this.game.add.tween(diceRandom).to( { x: 250 }, 800, "Sine.easeInOut", true);
        this.game.add.tween(diceRandom).to( { y: 10 }, 350, "Sine.easeInOut", true);

        this.game.time.events.add(400, function() {
            this.game.add.tween(diceRandom).to( { y: 150 }, 350, "Sine.easeInOut", true);
        }, this).autoDestroy = true;

        this.game.time.events.add(800, function() {
            this.game.add.tween(diceRandom).to( { x: 50 }, 600, "Sine.easeInOut", true);
            this.game.add.tween(diceRandom).to( { y: 70 }, 250, "Sine.easeInOut", true);

            this.game.time.events.add(300, function() {
                this.game.add.tween(diceRandom).to( { y: 50 }, 250, "Sine.easeInOut", true);
            }, this).autoDestroy = true;
        }, this);

        this.game.time.events.add(1500, function() {
            diceRandom.visible = false;
            diceRandom.x = 410;
            diceRandom.y = 210;
            dice.visible = true;
            switch(random) {
                case 1:
                    dice.frame = 0;
                    break;
                case 2:
                    dice.frame = 1;
                    break;
                case 3:
                    dice.frame = 2;
                    break;
                case 4:
                    dice.frame = 3;
                    break;
                case 5:
                    dice.frame = 4;
                    break;
                case 6:
                    dice.frame = 5;
                    break;
                default:
                    break;
            }
        }, this);
    }
}