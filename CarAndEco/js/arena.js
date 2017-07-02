Arena = function(game) {
    this.game = game;

    this.car;
    this.factory;
    this.map;
    this.score;

    this.moving = 0;

    var diceBg, diceAll, diceRandom, dice;
    var cursors;
};

Arena.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        var background = this.game.add.sprite(0, 0, 'background');
        var gameplayBg = background.addChild(this.game.add.sprite(8, 100, 'gameplayBg'));
        var factoryBg  = background.addChild(this.game.add.sprite(578, 118, 'factoryBg'));

        // Create duce
        diceBg = gameplayBg.addChild(this.game.add.button(345, 148, 'diceBg'));
        diceBg.inputEnabled = true;
        diceBg.animations.add('open', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27], 50, false);
        diceBg.animations.add('close', [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51], 50, false);
        diceBg.animations.play('open');
        diceAll = diceBg.addChild(this.game.add.sprite(69 , 70, 'diceAll'));
        diceAll.animations.add('turn');
        diceAll.animations.play('turn', 90, true);

        // Create roads
        newMap = new Map(this.game, gameplayBg);
        this.map = newMap;

        // Create Car
        newCar = new Car(this.game, gameplayBg, 15, 170);
        this.car = newCar;

        // Create factory
        newFactory =  new Factory(this.game, factoryBg, 12, 83);
        this.factory = newFactory;

        // Create Score
        newScore = new Score(this.game, 100, 300, 400, this.game.world.height - 35);
        this.score = newScore;

        // Create dice random
        diceRandom = gameplayBg.addChild(this.game.add.sprite(414 , 218, 'diceAll'));
        diceRandom.animations.add('random');
        diceRandom.visible = false;
        // Create dice open
        dice = gameplayBg.addChild(this.game.add.sprite(50 , 50, 'dice'));
        dice.visible = false;
        
        // Input
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {

        this.score.update();

        if(this.moving < 13) {
            diceBg.onInputUp.add(gamePlay, this);
        }

    },
};

function gamePlay() {
    diceBg.animations.play('close').onComplete.add(function() {
        diceBg.visible = false;
    }, this);
    diceAll.visible = false;
    diceRandom.visible = true;
    var move = Math.floor(Math.random() * 4) + 1;

    randomDice(this, move);

    this.game.time.events.add(1500, function() {
        if(this.moving < 4 && (this.moving + move) < 4) {
            this.car.carUp(move);
        } else if((this.moving + move) == 4) {
            this.car.carUp(move);
            this.car.carDirection(1);
        } else if (this.moving < 4 && (this.moving + move) > 4 && (this.moving + move) < 6) {
            var moveBuff = 4 - this.moving;
            var moveDerection = move - moveBuff;

            this.car.carUp(moveBuff);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.carLeft(moveDerection);
                this.car.carFrame(1);
            }, this).autoDestroy = true;

            this.car.carDirection(1);
        } else if (this.moving < 4 && (this.moving + move) > 4 && (this.moving + move) == 6) {
            var moveBuff = 4 - this.moving;
            var moveDerection = move - moveBuff;

            this.car.carUp(moveBuff);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.carLeft(moveDerection);
                this.car.carFrame(1);
            }, this).autoDestroy = true;

            this.car.carDirection(2);
        } else if(this.moving < 4 && (this.moving + move) > 6) {
            var moveBuff1 = 4 - this.moving;
            var moveBuff2 = 6 - 4;
            var moveBuff3 = move - moveBuff1 - moveBuff2;

            this.car.carUp(moveBuff1);
            this.game.time.events.add(moveBuff1 * 1000, function() {
                this.car.carLeft(moveBuff2);
                this.car.carFrame(1);
            }, this).autoDestroy = true;
            this.game.time.events.add((moveBuff1 + moveBuff2) * 1000, function() {
                this.car.carDown(moveBuff3);
                this.car.carFrame(2);
            }, this).autoDestroy = true;

            this.car.carDirection(2);
        } else if(this.moving >= 4 && (this.moving + move) < 6) {
            this.car.carLeft(move);
        } else if(this.moving >= 4 && (this.moving + move) == 6) {
            this.car.carLeft(move);
            this.car.carDirection(2);
        } else if(this.moving >= 4 && this.moving <= 6 && (this.moving + move) > 6 && (this.moving + move) < 11) {
            var moveBuff = 6 - this.moving;
            var moveDerection = move - moveBuff;

            this.car.carLeft(moveBuff);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.carDown(moveDerection);
                this.car.carFrame(2);
            }, this).autoDestroy = true;

            this.car.carDirection(2);
        } else if(this.moving >= 6 && (this.moving + move) < 11) {
            this.car.carDown(move);
        } else if(this.moving >= 6 && (this.moving + move) == 11) {
            this.car.carDown(move);
            this.car.carDirection(3);
        } else if(this.moving >= 6 && (this.moving + move) > 11 && (this.moving + move) < 12) {
            var moveBuff = 11 - this.moving;
            var moveDerection = move - moveBuff;

            this.car.carDown(moveBuff);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.carRight(moveDerection);
                this.car.carFrame(3);
            }, this).autoDestroy = true;

            this.car.carDirection(3);
        } else if(this.moving >= 6 && (this.moving + move) >= 12) {
            var moveBuff = 11 - this.moving;
            var moveDerection = 2;
            move = moveBuff + moveDerection;
            
            this.car.carDown(moveBuff);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.carRight(moveDerection);
                this.car.carFrame(3);
            }, this).autoDestroy = true;

            this.car.carDirection(3);
        } else {
            this.car.carRight(move);
        }

        this.moving += move;
        console.log("random: ", move);
        console.log("moving: ", this.moving);
    }, this).autoDestroy = true;

    this.game.time.events.add((move + 1) * 1100 + 1500, function() {
        if(this.car.direction == 0) {
            this.car.carFrame(0);
        } else if(this.car.direction == 1) {
            this.car.carFrame(1);
        } else if(this.car.direction == 2) {
            this.car.carFrame(2);
        } else {
            this.car.carFrame(3);
        }

        diceAll.visible = true;
        diceBg.visible = true;
        dice.visible = false;
        diceBg.animations.play('open');

        this.game.physics.arcade.overlap(this.car.car, this.map.roads, this.map.checkRoad, null, this);
    }, this).autoDestroy = true;
};

function randomDice(me, random) {
    diceRandom.animations.play('random', 50, true);

    me.game.add.tween(diceRandom).to( { x: 250 }, 800, "Sine.easeInOut", true);
    me.game.add.tween(diceRandom).to( { y: 10 }, 350, "Sine.easeInOut", true);

    me.game.time.events.add(400, function() {
        me.game.add.tween(diceRandom).to( { y: 150 }, 350, "Sine.easeInOut", true);
    }, me).autoDestroy = true;

    me.game.time.events.add(800, function() {
        me.game.add.tween(diceRandom).to( { x: 50 }, 600, "Sine.easeInOut", true);
        me.game.add.tween(diceRandom).to( { y: 70 }, 250, "Sine.easeInOut", true);

        me.game.time.events.add(300, function() {
            me.game.add.tween(diceRandom).to( { y: 50 }, 250, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me);

    me.game.time.events.add(1500, function() {
        diceRandom.visible = false;
        diceRandom.x = 414;
        diceRandom.y = 218;
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
    }, me);
}