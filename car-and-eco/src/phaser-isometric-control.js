/**
  * Phaser Isometric Plugin
  * It load a isometric map

	kiennt
  */

(function(window, Phaser) {
	'use strict';
	/**
	  * IsometricControl Plugin for Phaser
	  */
	Phaser.Plugin.IsometricControl = function (game, parent) {
		/* Extend the plugin */
		Phaser.Plugin.call(this, game, parent);
	};

	//Extends the Phaser.Plugin template, setting up values we need
	Phaser.Plugin.IsometricControl.prototype = Object.create(Phaser.Plugin.prototype);
	Phaser.Plugin.IsometricControl.prototype.constructor = Phaser.Plugin.IsometricControl;

    /**
      * Load map
      */
	Phaser.Plugin.IsometricControl.prototype.loadMap = function(map_data, tile_data) {
		this.map = this.game.cache.getJSON(map_data);
        this.tilesets = tile_data;
        this.height = this.map.height;
        this.width = this.map.width;
        this.tileWidth = this.map.tilewidth;
        this.tileHeight = this.map.tileheight;
        this.tilesObj = {};
    };

    /**
      * Create layer map
      */
    Phaser.Plugin.IsometricControl.prototype.createLayer = function(layer_name) {
        var layer = 0;
        var found_layer = false;
        for (var i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name == layer_name) {
                layer = i;
                found_layer = true;
                break;
            }
        }
        if (!found_layer) {
            console.log('create layer fail!');
            return;
        }
        var output = [];
        var row;
        var tile_position = 0;
        for (var x = 0; x < this.width; x++)
        {
            row = [];
            for (var y = 0; y < this.height; y++)
            {
                var tile = new Phaser.Tile(this.map.layers[layer], this.map.layers[layer].data[tile_position], (this.width-1)*(this.tileWidth/2) - (x*(this.tileWidth/2)) + y*(this.tileWidth/2), (x+y)*this.tileHeight/2, this.tileWidth, this.tileHeight)
                tile.tile_index = tile_position;
                row.push(tile);
                tile_position++;
            }
            output.push(row);
        }

        this.map.layers[layer].data = output;

        var sprite_group = this.game.add.group();
        for (var x = 0, w = this.map.layers[layer].width; x < w; x++)
        {
            for (var y = 0, h = this.map.layers[layer].height; y < h; y++)
            {
                var tile = this.map.layers[layer].data[x][y];
                if (tile.index) {
                    var sprite = new Phaser.Sprite(this.game, parseFloat(tile.x, 10), parseFloat(tile.y, 10), this.tilesets, tile.index-1);
                    sprite.tile_index = tile.tile_index;
                    sprite.name = tile.name;
                    if (tile.width)
                    {
                        sprite.width = tile.width;
                    }

                    if (tile.height)
                    {
                        sprite.height = tile.height;
                    }

                    if (tile.rotation)
                    {
                        sprite.angle = tile.rotation;
                    }
                    this.game.add.existing(sprite);
                    sprite_group.add(sprite);
                }
            }
        }
        this.tilesObj[layer_name] = sprite_group;
    }
}(window, Phaser));
