var Main = function(game){
    var map,
    car,
    factory,
    eventGame;

    var diceBg, diceAll, diceRandom, dice;

};

Main.prototype = {
    create: function(){
        var bg = this.game.add.sprite(0, 0, 'bg');
        bg.fixedToCamera = true;

        border = this.game.add.sprite(10, 100, 'border');
        border.fixedToCamera = true;
        var maskBorder = border.addChild(this.game.add.graphics(0, 0));
        maskBorder.beginFill(0xffffff);
        maskBorder.drawRect(0, 0, 561, 362);
        border.mask = maskBorder;

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
        map.createEvent(map.start_position);
        
        // Add Event
        eventGame = new Event(this.game, border, this);

        // New Car
        var car_position = map.getTile(map.start_position);
        var car_x = car_position.x+24;
        var car_y = car_position.y+8;
        car = new Car(this.game, car_x, car_y, border, this);

        // Add Factory
        factory = new Factory(this.game, right_frame, border, this, this);

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
        map.createFullMap(border);

        // sound btn
        this.sound_btn_show =  this.game.add.button(game.camera.width - this.game.cache.getImage('btn_sound').width/4 -10, 100, 'btn_sound', this.soundOnClick, this, 1, 0);
        this.sound_btn_show.fixedToCamera = true;

        this.main_sound = this.game.add.audio('main');
        this.push_sound = this.game.add.audio('push');

        this.main_sound.loop = true;
        this.main_sound.play();


        // Input
        var cursors = this.game.input.keyboard.createCursorKeys();
    },
    soundOnClick: function() {
        if (this.game.sound.mute === false) {
            this.sound_btn_show.setFrames(3, 2);
            this.game.sound.mute = true;
        } else {
            this.sound_btn_show.setFrames(1, 0);
            this.game.sound.mute = false;
        }
    },
    update: function() {
        diceBg.onInputUp.add(this.gamePlay, this);
    },

    render: function() {
        // debug
        // this.game.debug.inputInfo(32, 32);
    },

    gamePlay: function() {
        this.push_sound.play();
        this.game.time.events.repeat(400, 2, function() {
            this.push_sound.play();
        }, this).autoDestroy = true;

        diceBg.animations.play('close').onComplete.add(function() {
            diceBg.visible = false;
        }, this);
        diceAll.visible = false;
        diceRandom.visible = true;
        // Get Random
        var random = Math.floor(Math.random() * 6) + 1;
        // Dice animation
        this.randomDice(random);

        random = map.getMovingNumber(car.position, random);

        // Wait time animation end
        this.game.time.events.add(1500, function() {
            car.jumpTo(random, map, factory, eventGame);
        }, this).autoDestroy = true;

        // Wait game play end
        this.game.time.events.add((random + 1) * 650 + 1500, function() {
            dice.visible = false;
        }, this).autoDestroy = true;
    },
    // Wait game play end
    resetGamePlay: function() {
        // Hide Event Main
        eventGame.resetAllEvent();
        // Reset Dice
        diceAll.visible = true;
        diceBg.visible = true;
        dice.visible = false;
        diceBg.animations.play('open');
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