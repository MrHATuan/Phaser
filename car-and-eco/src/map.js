var Map = function(game){
	this.game = game;
	this.isometricControl = null;
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
	}
}