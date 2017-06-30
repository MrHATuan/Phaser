Arena = function(game) {
    this.game = game;

    var background, gameplayBg, factoryBg, diceBg, diceAll, diceRandom, dice;
    var factoryGround, factory1, factory1_1, factory3, factory3_1, factory4, factory4_1, factory5, factory5_1;
    var factoryTween1, factoryTween1_1, factoryTween3, factoryTween3_1, factoryTween4, factoryTween4_1, factoryTween5, factoryTween5_1;

    this.roads;
    this.car;
    this.money = 0;
    this.moneyBuffer = 0;
    this.point = 0;
    this.building = 0;
    var moneyLabel, pointLabel;

    this.moving = 0;
    this.carDirection = 0;

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
        var factoryGroup = factoryGround.addChild(this.game.add.group());
        factory1 = factoryGroup.create(75, 24, 'factory1');
        factory1_1 = factoryGroup.create(72, -155, 'factory1_1');
        factory1_1.visible = false;
        factory3 = factoryGroup.create(191, 118, 'factory3');
        factory3_1 = factoryGroup.create(183, -90, 'factory3_1');
        factory3_1.visible = false;
        factory4 = factoryGroup.create(6, 155, 'factory4');
        factory4_1 = factoryGroup.create(3, -102, 'factory4_1');
        factory4_1.visible = false;
        factory5 = factoryGroup.create(39, 107, 'factory5');
        factory5_1 = factoryGroup.create(32, -95, 'factory5_1');
        factory5_1.visible = false;

        //  A mask is a Graphics object
        // var maskFactory = factoryGround.addChild(this.game.add.graphics(0, 0));
        // maskFactory.beginFill(0xffffff);
        // maskFactory.drawRect(74, -148, 200, 309);
        // maskFactory.drawRect(188, -78, 124, 276);
        // maskFactory.drawRect(3, -102, 126, 332);
        // maskFactory.drawRect(32, -95, 113, 278);
        // //  And apply it to the Group itself
        // factoryGroup.mask = maskFactory;

        // this.game.add.tween(factory1).to({ y: -148 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory3).to({ y: -78 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory4).to({ y: -102 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory5).to({ y: -95 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory1_1).to({ y:3 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory3_1).to({ y: 111 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory4_1).to({ y: 165 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        // this.game.add.tween(factory5_1).to({ y: 109 }, 1000, "Sine.easeInOut", true, 0, -1, true);

        var factoryBg1  = background.addChild(this.game.add.sprite(578, 118, 'factoryBg'));

        // Create roads
        this.roads = gameplayBg.addChild(this.game.add.group());
        this.roads.enableBody =  true;
        for (var i = 1; i <= 4; i++) {
            switch(Math.floor(Math.random() * 4) + 1) {
                case 1:
                    var road = this.roads.create(10 + i * 74, 180 - i * 43, 'road1');
                    road.body.immovable = true;
                    break;
                case 2:
                    var road = this.roads.create(10 + i * 74, 180 - i * 43, 'road2');
                    road.body.immovable = true;
                    break;
                case 3:
                    var road = this.roads.create(10 + i * 74, 180 - i * 43, 'road3');
                    road.body.immovable = true;
                    break;
                case 4:
                    var road = this.roads.create(10 + i * 74, 180 - i * 43, 'road4');
                    road.body.immovable = true;
                    break;
                default:
                    break;
            }
        }
        for (var i = 1; i <= 2; i++) {
            switch(Math.floor(Math.random() * 4) + 1) {
                case 1:
                    var road = this.roads.create(306 + i * 74, 8 + i * 43, 'road1');
                    road.body.immovable = true;
                    break;
                case 2:
                    var road = this.roads.create(306 + i * 74, 8 + i * 43, 'road2');
                    road.body.immovable = true;
                    break;
                case 3:
                    var road = this.roads.create(306 + i * 74, 8 + i * 43, 'road3');
                    road.body.immovable = true;
                    break;
                case 4:
                    var road = this.roads.create(306 + i * 74, 8 + i * 43, 'road4');
                    road.body.immovable = true;
                    break;
                default:
                    break;
            }
        }
        for (var i = 1; i <= 5; i++) {
            switch(Math.floor(Math.random() * 4) + 1) {
                case 1:
                    var road = this.roads.create(454 - i * 74, 94 + i * 43, 'road1');
                    road.body.immovable = true;
                    break;
                case 2:
                    var road = this.roads.create(454 - i * 74, 94 + i * 43, 'road2');
                    road.body.immovable = true;
                    break;
                case 3:
                    var road = this.roads.create(454 - i * 74, 94 + i * 43, 'road3');
                    road.body.immovable = true;
                    break;
                case 4:
                    var road = this.roads.create(454 - i * 74, 94 + i * 43, 'road4');
                    road.body.immovable = true;
                    break;
                default:
                    break;
            }
        }
            switch(Math.floor(Math.random() * 4) + 1) {
                case 1:
                    var road = this.roads.create(84 - 74, 309 - 43, 'road1');
                    road.body.immovable = true;
                    break;
                case 2:
                    var road = this.roads.create(84 - 74, 309 - 43, 'road2');
                    road.body.immovable = true;
                    break;
                case 3:
                    var road = this.roads.create(84 - 74, 309 - 43, 'road3');
                    road.body.immovable = true;
                    break;
                case 4:
                    var road = this.roads.create(84 - 74, 309 - 43, 'road4');
                    road.body.immovable = true;
                    break;
                default:
                    break;
            }


        // Create Car
        // this.car = gameplayBg.addChild(this.game.add.sprite(15, gameplayBg.height - 80, 'carA'));
        this.car = gameplayBg.addChild(this.game.add.sprite(15, 170, 'carA'));
        this.game.physics.arcade.enable(this.car);

        // Create Money
        moneyLabel = this.game.add.text(100, this.game.world.height - 35, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'right', wordWrap: true, wordWrapWidth: 100});
        moneyLabel.anchor.setTo(0.5);

        // Create Point
        var textPoint = this.game.add.text(300, this.game.world.height - 35, "My Point: ", {font: "20px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
        textPoint.anchor.setTo(0.5);
        pointLabel = this.game.add.text(400, this.game.world.height - 35, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
        pointLabel.anchor.setTo(0.5);

        // Create dice random
        diceRandom = gameplayBg.addChild(this.game.add.sprite(414 , 218, 'diceAll'));
        diceRandom.animations.add('random');
        diceRandom.visible = false;

        dice = gameplayBg.addChild(this.game.add.sprite(50 , 50, 'dice'));
        dice.visible = false;

        // Input
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        // this.game.physics.arcade.overlap(this.car, this.roads, test, null, this);

        // if (cursors.left.isDown) {
        //     this.car.body.velocity.x = -150;
        // } else if (cursors.right.isDown) {
        //     this.car.body.velocity.x = 150;
        // } else if (cursors.up.isDown) {
        //     this.car.body.velocity.y = -150;
        // } else if (cursors.down.isDown) {
        //     this.car.body.velocity.y = 150;
        // } else {
        //     this.car.body.velocity.x = 0;
        //     this.car.body.velocity.y = 0;
        // }
        if(this.moving < 13) {
            diceBg.onInputUp.add(gamePlay, this);
        }

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
    diceRandom.visible = true;
    var move = Math.floor(Math.random() * 4) + 1;

    randomDice(this, move);

    this.game.time.events.add(1500, function() {
        if(this.moving < 4 && (this.moving + move) < 4) {
            carUp(move, this);
        } else if((this.moving + move) == 4) {
            carUp(move, this);
            this.carDirection = 1;
        } else if (this.moving < 4 && (this.moving + move) > 4 && (this.moving + move) < 6) {
            var moveBuff = 4 - this.moving;
            var moveDerection = move - moveBuff;

            carUp(moveBuff, this);
            this.game.time.events.add(moveBuff * 1000, function() {
                carLeft(moveDerection, this);
                this.car.frame = 1;
            }, this).autoDestroy = true;

            this.carDirection = 1;
        } else if (this.moving < 4 && (this.moving + move) > 4 && (this.moving + move) == 6) {
            var moveBuff = 4 - this.moving;
            var moveDerection = move - moveBuff;

            carUp(moveBuff, this);
            this.game.time.events.add(moveBuff * 1000, function() {
                carLeft(moveDerection, this);
                this.car.frame = 1;
            }, this).autoDestroy = true;

            this.carDirection = 2;
        } else if(this.moving < 4 && (this.moving + move) > 6) {
            var moveBuff1 = 4 - this.moving;
            var moveBuff2 = 6 - 4;
            var moveBuff3 = move - moveBuff1 - moveBuff2;

            carUp(moveBuff1, this);
            this.game.time.events.add(moveBuff1 * 1000, function() {
                this.car.frame = 1;
                carLeft(moveBuff2, this);
            }, this).autoDestroy = true;
            this.game.time.events.add((moveBuff1 + moveBuff2) * 1000, function() {
                this.car.frame = 2;
                carDown(moveBuff3, this);
            }, this).autoDestroy = true;

            this.carDirection = 2;
        } else if(this.moving >= 4 && (this.moving + move) < 6) {
            carLeft(move, this);
        } else if(this.moving >= 4 && (this.moving + move) == 6) {
            carLeft(move, this);
            this.carDirection = 2;
        } else if(this.moving >= 4 && this.moving <= 6 && (this.moving + move) > 6 && (this.moving + move) < 11) {
            var moveBuff = 6 - this.moving;
            var moveDerection = move - moveBuff;

            carLeft(moveBuff, this);
            this.game.time.events.add(moveBuff * 1000, function() {
                carDown(moveDerection, this);
                this.car.frame = 2;
            }, this).autoDestroy = true;

            this.carDirection = 2;
        } else if(this.moving >= 6 && (this.moving + move) < 11) {
            carDown(move, this);
        } else if(this.moving >= 6 && (this.moving + move) == 11) {
            carDown(move, this);
            this.carDirection = 3;
        } else if(this.moving >= 6 && (this.moving + move) > 11 && (this.moving + move) < 12) {
            var moveBuff = 11 - this.moving;
            var moveDerection = move - moveBuff;

            carDown(moveBuff, this);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.frame = 3;
                carRight(moveDerection, this);
            }, this).autoDestroy = true;

            this.carDirection = 3;
        } else if(this.moving >= 6 && (this.moving + move) >= 12) {
            var moveBuff = 11 - this.moving;
            var moveDerection = 2;
            move = moveBuff + moveDerection;
            
            carDown(moveBuff, this);
            this.game.time.events.add(moveBuff * 1000, function() {
                this.car.frame = 3;
                carRight(moveDerection, this);
            }, this).autoDestroy = true;

            this.carDirection = 3;
        } else {
            carRight(move, this);
        }

        this.moving += move;
    }, this).autoDestroy = true;
    console.log("random: ", move);
    console.log("moving: ", this.moving);

    this.game.time.events.add((move + 1) * 1100 + 1500, function() {
        if(this.carDirection == 0) {
            this.car.frame = 0;
        } else if(this.carDirection == 1) {
            this.car.frame = 1;
        } else if(this.carDirection == 2) {
            this.car.frame = 2;
        } else {
            this.car.frame = 3;
        }

        diceAll.visible = true;
        diceBg.visible = true;
        dice.visible = false;
        diceBg.animations.play('open');
        this.game.physics.arcade.overlap(this.car, this.roads, checkRoad, null, this);
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
        me.game.add.tween(me.car).to( { y: carY - 40 }, 400, "Sine.easeInOut", true);

        me.game.time.events.add(500, function() {
            me.game.add.tween(me.car).to( { y: carY + 43 }, 400, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me).autoDestroy = true;
};

function carRight(move, me) {
    me.game.time.events.repeat(1000, move, function() {
        var carY = me.car.y;
        var carX = me.car.x;

        me.game.add.tween(me.car).to( { x: carX - 74 }, 900, "Sine.easeInOut", true);
        me.game.add.tween(me.car).to( { y: carY - 80 }, 400, "Sine.easeInOut", true);

        me.game.time.events.add(500, function() {
            me.game.add.tween(me.car).to( { y: carY - 43 }, 400, "Sine.easeInOut", true);
        }, me).autoDestroy = true;
    }, me).autoDestroy = true;
}

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

function checkRoad(car, road) {
    switch(road.key) {
        case "road1":
            if(this.building == 0) {
                var factoryTween = this.game.add.tween(factory1).to({ y: -148 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    factory1.visible = false;
                    factory1_1.visible = true;
                    this.game.add.tween(factory1_1).to({ y:3 }, 1000, "Sine.easeInOut", true);
                }, this);

                this.building = 1;
            } else if(this.building == 1) {
                var factoryTween = this.game.add.tween(factory3).to({ y: -78 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    factory3.visible = false;
                    factory3_1.visible = true;
                    this.game.add.tween(factory3_1).to({ y: 111 }, 1000, "Sine.easeInOut", true);
                }, this);

                this.building = 2;
            } else if(this.building == 2) {
                var factoryTween = this.game.add.tween(factory4).to({ y: -102 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    factory4.visible = false;
                    factory4_1.visible = true;
                    this.game.add.tween(factory4_1).to({ y: 165 }, 1000, "Sine.easeInOut", true);
                }, this);

                this.building = 3;
            } else if(this.building == 3) {
                var factoryTween = this.game.add.tween(factory5).to({ y: -95 }, 1000, "Sine.easeInOut", true);
                factoryTween.onComplete.add(function() {
                    factory5.visible = false;
                    factory5_1.visible = true;
                    this.game.add.tween(factory5_1).to({ y: 109 }, 1000, "Sine.easeInOut", true);
                }, this);

                this.building = 4;
            } else {
                console.log("build all factory");
            }

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