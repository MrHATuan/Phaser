var Map = function(game){
	this.game = game;
	this.isometricControl = null;
	this.road = [371, 351, 331, 311, 291, 290, 270, 250, 249, 248, 228, 208, 168, 148, 128, 127, 126, 106, 86, 85, 105, 125, 124, 104, 84, 64, 44, 24];
	this.start_position = 371;
	this.end_position = 24;
	this.stops = [208];
	this.tiles = [];
}
Map.prototype = {
  	loadMap: function(map_key, sheet_key){
  		this.isometricControl = this.game.plugins.add(Phaser.Plugin.IsometricControl);
  		this.isometricControl.loadMap(map_key, sheet_key);
        var width = this.isometricControl.width;
        var height = this.isometricControl.height;
        var tileWidth = this.isometricControl.tileWidth;
        var tileHeight = this.isometricControl.tileHeight;

        this.game.world.setBounds(0, 0, (width + height) * tileWidth/2, (width + height) * tileHeight/2);
	},
	createLayer: function(layer_name) {
		this.isometricControl.createLayer(layer_name);
        this.tiles = this.isometricControl.tilesObj.map;
	},
	getTilePosition: function(current_tile, jump) {
		var road_length = this.road.length;
		for (var i = 0; i < road_length; i++) {
			if (this.road[i] == current_tile) {
				return this.road[i+jump];
			}
		}
	},
	getNextDirection: function (current_tile) {
		var tile1 = this.getTile(current_tile);
		var tile2 = this.getTileAfter(current_tile);

		if (tile2.x > tile1.x && tile2.y < tile1.y) { // go up
			return "up";
		}
		if (tile2.x < tile1.x && tile2.y < tile1.y) { // go left
			return "left";
		}
		if (tile2.x > tile1.x && tile2.y > tile1.y) { // go right
			return "right";
		}
		if (tile2.x < tile1.x && tile2.y > tile1.y) { // go back
			return "back";
		}
	},
	getTile: function(tile_number) {
		var tile = {};
		this.tiles.forEach(function(item) {
			if (item.tile_index == tile_number) {
				tile = item;
				return;
			}
		}, this);
		return tile;
	},
	getTileAfter: function(tile_number) {
		var next_tile;
		var road_length = this.road.length;
		for (var i = 0; i < road_length; i++) {
			if (this.road[i] == tile_number) {
				next_tile = this.road[i+1];
				break;
			}
		}
		return this.getTile(next_tile);
	}
}