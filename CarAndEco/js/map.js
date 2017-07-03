Map = function(game, parent) {
    this.initMap(game, parent);
};

Map.prototype.initMap = function(game, parent) {
    this.game = game;

    // Create roads
    this.roads = parent.addChild(this.game.add.group());
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
            this.factory.buildingFactory();
            break;
        case "road2":
            this.score.upMoney(100);
            break;
        case "road3":
            this.score.upPoint(1);
            break;
        case "road4":
            this.score.upPoint(-1);
            break;
        default:
            break;
    }
};

// var Map = function(game){
//     this.game = game;
//     this.isometricControl = null;
// }
// Map.prototype = {
//     loadMap: function(map_key, sheet_key){
//         this.isometricControl = this.game.plugins.add(Phaser.Plugin.IsometricControl);
//         this.isometricControl.loadMap(map_key, sheet_key);
//         var width = this.isometricControl.width;
//         var height = this.isometricControl.height;
//         var tileWidth = this.isometricControl.tileWidth;
//         var tileHeight = this.isometricControl.tileHeight;

//         this.game.world.setBounds(0, 0, (width + height) * tileWidth/2, (width + height) * tileHeight/2);
//     },
//     createLayer: function(layer_name) {
//         this.isometricControl.createLayer(layer_name);
//     }
// }