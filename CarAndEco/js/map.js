Map = function(game, arena, parent, x, y) {
    this.initMap(game, parent, x, y);
};

Map.prototype.initMap = function(game, parent, x, y) {
    this.game = game;
    this.arena = arena;

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
};

Map.prototype.checkRoad = function(car, road) {
    switch(road.key) {
        case "road1":

            break;
        case "road2":

            break;
        case "road3":

            break;
        case "road4":

            break;
        default:
            break;
    }
};