Arena = function(game) {
    this.game = game;

    var background, gameplayBg, factoryBg, diceBg, diceAll, factoryGround, factory1, factory3, factory4, factory5;

    this.roads;
    this.car;
    this.money = 0;
    this.moneyBuffer = 0;
    this.point = 0;
    var moneyLabel, pointLabel;

    this.moving = 0;
    this.carDirection = 1;

    var cursors;
};



Arena.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.game.add.sprite(0, 0, 'background');
        gameplayBg = background.addChild(this.game.add.sprite(8, 100, 'gameplayBg'));
        factoryBg  = background.addChild(this.game.add.sprite(578, 118, 'factoryBg'));

        // Create duce
        diceBg = gameplayBg.addChild(this.game.add.button(345, 148, 'diceBg'));
        diceBg.inputEnabled = true;
        diceBg.animations.add('open', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27], 50, false);
        diceBg.animations.add('close', [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51], 50, false);
        diceBg.animations.play('open');
        diceAll = diceBg.addChild(this.game.add.sprite(69 , 70, 'diceAll'));
        diceAll.animations.add('turn');
        diceAll.animations.play('turn', 90, true);

        // Create factory
        factoryGround = factoryBg.addChild(this.game.add.sprite(12, 83, 'factoryGround'));
        factory1 = factoryGround.addChild(this.game.add.sprite(75, 24, 'factory1'));
        factory3 = factoryGround.addChild(this.game.add.sprite(191, 118, 'factory3'));
        factory4 = factoryGround.addChild(this.game.add.sprite(6, 154, 'factory4'));
        factory5 = factoryGround.addChild(this.game.add.sprite(39, 107, 'factory5'));

        // Create roads
        this.roads = gameplayBg.addChild(this.game.add.group());
        this.roads.enableBody =  true;
        for (var i = 1; i < 11; i++) {
            switch(Math.floor(Math.random() * 4) + 1) {
                case 1:
                    var road = this.roads.create(10 + i * 74, gameplayBg.height - 70 - i * 43, 'road1');
                    road.body.immovable = true;
                    break;
                case 2:
                    var road = this.roads.create(10 + i * 74, gameplayBg.height - 70 - i * 43, 'road2');
                    road.body.immovable = true;
                    break;
                case 3:
                    var road = this.roads.create(10 + i * 74, gameplayBg.height - 70 - i * 43, 'road3');
                    road.body.immovable = true;
                    break;
                case 4:
                    var road = this.roads.create(10 + i * 74, gameplayBg.height - 70 - i * 43, 'road4');
                    road.body.immovable = true;
                    break;
                default:
                    break;
            }
        }

        // Create Car
        this.car = gameplayBg.addChild(this.game.add.sprite(15, gameplayBg.height - 80, 'carA'));
        this.game.physics.arcade.enable(this.car);

        // Create Money
        moneyLabel = this.game.add.text(100, this.game.world.height - 35, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'right', wordWrap: true, wordWrapWidth: 100});
        moneyLabel.anchor.setTo(0.5);

        // Create Point
        var textPoint = this.game.add.text(300, this.game.world.height - 35, "My Point: ", {font: "20px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
        textPoint.anchor.setTo(0.5);
        pointLabel = this.game.add.text(400, this.game.world.height - 35, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
        pointLabel.anchor.setTo(0.5);

        // Input
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        // this.game.physics.arcade.overlap(this.car, this.roads, test, null, this);

        if (cursors.left.isDown) {
            this.car.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            this.car.body.velocity.x = 150;
        } else if (cursors.up.isDown) {
            this.car.body.velocity.y = -150;
        } else if (cursors.down.isDown) {
            this.car.body.velocity.y = 150;
        } else {
            this.car.body.velocity.x = 0;
            this.car.body.velocity.y = 0;
        }

        diceBg.onInputUp.add(gamePlay, this);

        // increment Money
        if(this.moneyBuffer > 0){
            this.moneyBuffer -= 2;
            this.money += 2;
            moneyLabel.setText(this.money);
        }
    },

    render: function() {

    },
};

function gamePlay() {
    diceBg.animations.play('close').onComplete.add(function() {
        diceBg.visible = false;
    }, this);
    diceAll.visible = false;

    var move = Math.floor(Math.random() * 4) + 1;
    if(this.carDirection == 1) {
        if ((this.moving + move) >= 10){
            move = 10 - this.moving;
            this.moving = 10;
            this.carDirection = 0;
        } else {
            this.moving += move;
        }
        carUp(move, this);
    } else {
        if ((this.moving - move) <= 0){
            move = this.moving;
            this.moving = 0;
            this.carDirection = 1;
        } else {
            this.moving -= move;
        }
        carDown(move, this);
    }
    console.log('UpDown: ', this.carDirection);
    console.log("moving: ", this.moving);
    console.log("randomUp: ", move);

    this.game.time.events.add((move + 1) * 1100, function() {
        if(this.carDirection == 1) {
            this.car.frame = 0;
        } else {
            this.car.frame = 2;
        }

        diceAll.visible = true;
        diceBg.visible = true;
        diceBg.animations.play('open');
        this.game.physics.arcade.overlap(this.car, this.roads, test, null, this);
    }, this).autoDestroy = true;
};

function carUp(move, me) {
    me.game.time.events.repeat(1000, move, function() {
        var carY = me.car.y;
        var carX = me.car.x;

        me.game.add.tween(me.car).to( { x: carX + 74 }, 900, "Sine.easeInOut", true);
        me.game.add.tween(me.car).to( { y: carY - 80 }, 400, "Sine.easeInOut", true);

        me.game.time.events.add(500, function() {
            me.game.add.tween(me.car).to( { y: carY - 43 }, 400, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me).autoDestroy = true;
};

function carDown(move, me) {
    me.game.time.events.repeat(1000, move, function() {
        var carY = me.car.y;
        var carX = me.car.x;

        me.game.add.tween(me.car).to( { x: carX - 74 }, 900, "Sine.easeInOut", true);
        me.game.add.tween(me.car).to( { y: carY - 40 }, 400, "Sine.easeInOut", true);

        me.game.time.events.add(500, function() {
            me.game.add.tween(me.car).to( { y: carY + 43 }, 400, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me).autoDestroy = true;
};

function carLeft(move, me) {
    me.game.time.events.repeat(1000, move, function() {
        var carY = me.car.y;
        var carX = me.car.x;

        me.game.add.tween(me.car).to( { x: carX + 74 }, 900, "Sine.easeInOut", true);
        me.game.add.tween(me.car).to( { y: carY - 80 }, 400, "Sine.easeInOut", true);

        me.game.time.events.add(500, function() {
            me.game.add.tween(me.car).to( { y: carY - 43 }, 400, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me).autoDestroy = true;
};

function carRight(move, me) {
    me.game.time.events.repeat(1000, move, function() {
        var carY = me.car.y;
        var carX = me.car.x;

        me.game.add.tween(me.car).to( { x: carX + 74 }, 900, "Sine.easeInOut", true);
        me.game.add.tween(me.car).to( { y: carY - 80 }, 400, "Sine.easeInOut", true);

        me.game.time.events.add(500, function() {
            me.game.add.tween(me.car).to( { y: carY - 43 }, 400, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me).autoDestroy = true;
}

function test(car, road) {
    switch(road.key) {
        case "road1":
        console.log("update factory");
            // var road = this.roads.create(10 + i * 74, gameplayBg.height - 70 - i * 43, 'road1');
            // road.body.immovable = true;
            break;
        case "road2":
            this.moneyBuffer += 100;
            break;
        case "road3":
            this.point += 1;
            pointLabel.setText(this.point);
            break;
        case "road4":
            this.point -= 1;
            pointLabel.setText(this.point);
            break;
        default:
            break;
    }
};