var Map = function(game){
	this.game = game;
	this.isometricControl = null;
	this.road = [371, 351, 331, 311, 291, 290, 270, 250, 249, 248, 228, 208, 168, 148, 128, 127, 126, 106, 86, 85, 105, 125, 124, 104, 84, 64, 44, 24];
	this.start_position = 371;
	this.end_position = 24;
	this.stops = [208];
	this.next_stops = [168];
	this.tiles = [];

	// turn_position using for draw full map
	this.turn_position = [148, 127, 104, 44];
	this.car_position = this.start_position;
	this.car_sticky;

	// list random event
	this.event_lists=[];
	// list sprite event in map
	this.event_map_arr = [];
	// list sprite event in atlas
	this.event_full_map_arr = [];

	this.block_stop = [];

	var btn_show;
	var btn_hide;
	var mask_fullmap;
	// brick empty in full map
	var brick_group;
	this.tween_sticky;
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
	getMovingNumber: function(current_tile, random_number) {
		var i = this.road.indexOf(current_tile);
		var road_length = Math.min(this.road.length, i+random_number);
		var j = 0;
		for (i; i < road_length; i++) {
			if (this.stops.indexOf(this.road[i])>=0) {
				return j;
			}
			j++;
		}
		return random_number;
	},
	getNextStop: function(current_tile) {
		var index = this.stops.indexOf(current_tile);
		if (index >= 0) {
			return this.next_stops[index];
		}
		return false;
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
	},
	isTurn: function(tile_number) {
		var turn_length = this.turn_position.length;
		for (var i = 0; i < turn_length; i++) {
			if (this.turn_position[i] == tile_number) {
				return true;
			}
		}
		return false;
	},
	checkDirection: function(current_direct, time) {
		if (current_direct == "left" || current_direct == "right") {
			return "up";
		}
		if (current_direct == "up") {
			if (time%2) {
				return "right";
			}else {
				return "left";
			}
		}
		return "right";
	},
	getEvent: function(tile_number) {
		// console.log(this.event_lists[tile_number]);
	},
	changeEvent: function(current_tile_number) {
		// random event
		var event_arr = [0, 1, 2, 3];
		var event_length = event_arr.length;
		var road_length = this.road.length;
		var i = this.road.indexOf(current_tile_number)+1;
		for (i; i < road_length; i++) {
			// if tile is not stop, next stop or end position
			if (this.next_stops.indexOf(this.road[i])<0 && this.stops.indexOf(this.road[i])<0 && this.road[i] != this.end_position) {
				if (this.event_map_arr[this.road[i]]){
					var rand = event_arr[Math.floor(Math.random() * event_length)];
					this.event_lists[this.road[i]] = rand;
					this.event_map_arr[this.road[i]].frame=rand;
					this.event_full_map_arr[this.road[i]].frame=rand;
				}
			}
		}
	},
	setCarPosition: function(tile_number) {
		this.car_position = tile_number;
		brick_group.forEach(function(item) {
			if (item.tile_number == this.car_position) {
				if (this.stops.indexOf(item.tile_number)>=0) {
					this.car_sticky.cameraOffset.x = item.cameraOffset.x+5;
					this.car_sticky.cameraOffset.y = item.cameraOffset.y - item.height/2;
				}else {
					this.car_sticky.cameraOffset.x = item.cameraOffset.x-5;
					this.car_sticky.cameraOffset.y = item.cameraOffset.y - item.height/2-this.car_sticky.height/2;
				}
				return;
			}
		}, this);
		this.tweenSticky();
	},
	createEvent: function(current_position) {
		
		var stop_length = this.stops.length;
		var block_group = this.game.add.group();
		for (var i=0; i < stop_length; i++) {
			var tile = this.getTile(this.stops[i]);
			var alias = this.game.add.sprite(tile.x - 24, tile.y - 76, 'block_stop');
			this.block_stop[this.stops[i]] = alias;
			block_group.add(alias);
		}

		// random event
		var event_arr = [0, 1, 2, 3];
		var event_length = event_arr.length;
		var road_length = this.road.length;
		for (var j = 1; j < road_length; j++) {
			if (this.next_stops.indexOf(this.road[j])<0 && this.stops.indexOf(this.road[j])<0) {
				var rand = event_arr[Math.floor(Math.random() * event_length)];
				this.event_lists[this.road[j]] = rand;
			}
		}

		// create event for map
		var event_map_group = this.game.add.group();
		var show_event = true;

		for (var i=1; i < road_length; i++) {
			if (this.next_stops.indexOf(this.road[i])<0 && this.stops.indexOf(this.road[i])<0 && this.road[i] != this.end_position) {
				var tile = this.getTile(this.road[i]);
				var event = this.game.add.sprite(tile.x+20, tile.y+10, 'event_icon');
				event.frame = this.event_lists[this.road[i]];
				event.tile_number = this.road[i];
				event_map_group.add(event);
				this.event_map_arr[this.road[i]] = event;
				if (!show_event) {
					event.visible=false;
				}
			}
			if (this.stops.indexOf(this.road[i]) >= 0) {
				show_event = false;
			}
		}
		event_map_group.mask = this.tiles.mask;
		block_group.mask = this.tiles.mask;
	},
	showNextEventBlock: function(next_stop_position) {
		var i = this.road.indexOf(next_stop_position) +1;
		var road_length = this.road.length;
		for (i; i < road_length; i++) {
			if (this.stops.indexOf(this.road[i])>=0 || this.road[i] == this.end_position) {
				break;
			}
			if (this.event_map_arr[this.road[i]]){
				this.event_map_arr[this.road[i]].visible=true;
			}
		}

		var j = this.next_stops.indexOf(next_stop_position);
		var stop_number = this.stops[j];
		var alias = this.block_stop[stop_number];
		alias.x = alias.x - 50;
		alias.y = alias.y + 20;
	},
	tweenSticky: function() {
		this.game.tweens.remove(this.tween_sticky);
		this.tween_sticky = this.game.add.tween(this.car_sticky.cameraOffset).to( { y: this.car_sticky.cameraOffset.y-5 }, 600,Phaser.Easing.Back.InOut, true, 0, 2000, true );
	},
	createFullMap: function(border) {
		// show button
		btn_show =  this.game.add.button(border.width/2 - this.game.cache.getImage("btn_show").width/4, border.height+100-10, 'btn_show', this.showFullMap, this, 1, 0, 2);
        btn_show.fixedToCamera = true;

		var fullmap_group = this.game.add.group();

        var fullmap = this.game.add.sprite(0, 90, 'fullmap');
        fullmap.fixedToCamera = true;
        fullmap_group.add(fullmap);

        mask_fullmap = this.game.add.graphics(fullmap.width/2, fullmap.height/2);
        //  Shapes drawn to the Graphics object must be filled.
        mask_fullmap.beginFill(0xffffff);
        mask_fullmap.drawRect(0, 0, 0, 0);
        mask_fullmap.endFill();

        //  And apply it to the Group itself
        fullmap_group.mask = mask_fullmap;
        mask_fullmap.fixedToCamera = true;

        // hide button
        btn_hide =  this.game.add.button(fullmap.width/2, fullmap.height+40, 'btn_hide', this.hideFullMap, this, 1, 0, 2);
        btn_hide.anchor.set(0.5);
        btn_hide.fixedToCamera = true;
        btn_hide.visible = false;


        var road_length = this.road.length;
		var start_x = 110;
		var start_y = 424;
		brick_group = this.game.add.group();
		var brick_event_group = this.game.add.group();

        this.car_sticky = this.game.add.sprite(start_x+40, start_y-40, 'stick');
        this.car_sticky.fixedToCamera = true;
        this.tweenSticky();

        fullmap_group.add(this.car_sticky);

		var direction = "right";
		var sprite = "brick";
		var event = "event_icon_small";
		var up_time = 1;
		for (var i = 0; i < road_length-1; i++) {
			// ignore next stop
			if (this.next_stops.indexOf(this.road[i])>=0) {
				i++;
			}
			// check go left right up
	        if (this.isTurn(this.road[i])) {
	        	if(this.checkDirection(direction, up_time) == "up") {
	        		up_time++;
	        		direction = "up";
	        	}else if(this.checkDirection(direction, up_time) == "right") {
	        		direction = "right";
	        		
	        	}else if(this.checkDirection(direction, up_time) == "left") {
	        		direction = "left";
	        	}
	        }

	        // check has stop block
	        if (this.stops.indexOf(this.road[i]) >= 0) {
	        	sprite = "stop_position";
	        }else {
	        	sprite = "brick";
	        }
	        if (this.road[i] == this.start_position) {
	        	sprite = "start_position";
	        }
	        var right = this.game.cache.getImage(sprite).width*0.74;

	        if (direction == "left") {
	        	if (this.stops.indexOf(this.road[i]) >= 0) {
		        	var stop_y = -12;
		        	var stop_x = 0;
		        }else {
		        	var stop_y = 0;
		        	var stop_x = 0;
		        }

	        	var brick = this.game.add.sprite(start_x-right+stop_x, start_y+stop_y, sprite);
	        	brick.tile_number = this.road[i];
				brick_group.add(brick);
				brick.sendToBack();
		        brick.fixedToCamera = true;


		        //event 
		        if (this.stops.indexOf(this.road[i]) < 0) {
			        var event_brick = this.game.add.sprite(start_x-right+6, start_y+stop_y+2, event);
			        event_brick.frame = this.event_lists[this.road[i]];
					this.event_full_map_arr[this.road[i]] = event_brick;
					brick_event_group.add(event_brick);
			        event_brick.fixedToCamera = true;

			        event_brick.inputEnabled = true;
			        event_brick.input.pixelPerfectOver = true;
	    			event_brick.input.useHandCursor = true;
					event_brick.events.onInputOver.add(this.over, this);
				    event_brick.events.onInputOut.add(this.out, this);
				}

		        // check 
		        if (this.stops.indexOf(this.road[i]) >= 0){
		        	start_x = start_x +4;
		        }

		        start_x = start_x - right;
	        }
	        if (direction == "up") {

	        	if (this.stops.indexOf(this.road[i-1]) >= 0 || this.next_stops.indexOf(this.road[i-1]) >= 0 ) {
	        		var stop_y = -12;
		        	var stop_x = 0;
		        }else {
		        	var stop_y = 0;
		        	var stop_x = 0;
		        }

	        	var brick = this.game.add.sprite(start_x+12+stop_x, start_y-(this.game.cache.getImage(sprite).height-10)+stop_y, sprite);
	        	brick.tile_number = this.road[i];
				brick_group.add(brick);
				brick.sendToBack();
		        brick.fixedToCamera = true;


		        //event 
		        if (this.stops.indexOf(this.road[i]) < 0) {
			        var event_brick = this.game.add.sprite(start_x+12+stop_x+6, start_y-(this.game.cache.getImage(sprite).height-10)+stop_y+2, event);
			        event_brick.frame = this.event_lists[this.road[i]];
			        this.event_full_map_arr[this.road[i]] = event_brick;
					brick_event_group.add(event_brick);
			        event_brick.fixedToCamera = true;

			        event_brick.inputEnabled = true;
			        event_brick.input.pixelPerfectOver = true;
	    			event_brick.input.useHandCursor = true;
					event_brick.events.onInputOver.add(this.over, this);
				    event_brick.events.onInputOut.add(this.out, this);
				}

		        start_x = start_x + 12+stop_x;
		        start_y = start_y-(this.game.cache.getImage(sprite).height-10)+stop_y;
	        }
	        if (direction == "right") {
	        	if (this.stops.indexOf(this.road[i]) >= 0 || this.road[i] == this.start_position) {
		        	var stop_y = -12;
		        	var stop_x = -26;
		        }else {
		        	var stop_y = 0;
		        	var stop_x = 0;
		        }

	        	var brick = this.game.add.sprite(start_x+right+stop_x, start_y+stop_y, sprite);
	        	brick.tile_number = this.road[i];
				brick_group.add(brick);
		        brick.fixedToCamera = true;

				if (this.road[i] == this.start_position){
					brick.sendToBack();
				}

				if (this.road[i] != this.start_position && this.stops.indexOf(this.road[i]) < 0) {
					//event
			        var event_brick = this.game.add.sprite(start_x+right+stop_x+6, start_y+stop_y+2, event);
			        event_brick.frame = this.event_lists[this.road[i]];
			        this.event_full_map_arr[this.road[i]] = event_brick;
					brick_event_group.add(event_brick);
			        event_brick.fixedToCamera = true;
		        
			        event_brick.inputEnabled = true;
			        event_brick.input.pixelPerfectOver = true;
	    			event_brick.input.useHandCursor = true;
					event_brick.events.onInputOver.add(this.over, this);
				    event_brick.events.onInputOut.add(this.out, this);
		        }

				if (this.stops.indexOf(this.road[i]) >= 0 || this.road[i] == this.start_position) {
					start_x = start_x -4;
				}
		        start_x = start_x + right;
	        }
		}
		var brick_finish = this.game.add.sprite(start_x+22, start_y-20, "finish_position");
		brick_finish.tile_number = this.end_position;
		brick_group.add(brick_finish);
        brick_finish.fixedToCamera = true;

		fullmap_group.add(brick_group);
		fullmap_group.add(brick_event_group);

		this.car_sticky.bringToTop();
	},
	showFullMap: function() {
        mask_fullmap.beginFill(0xffffff);
    	mask_fullmap.drawRect(-20, -5, 40, 10);
    	mask_fullmap.endFill();
    	var tween = this.game.add.tween(mask_fullmap).to( { angle: -360 }, 900, Phaser.Easing.Linear.None, true);
    	var tween2 = this.game.add.tween(mask_fullmap.scale).to( { x: 80, y: 100 }, 1000, Phaser.Easing.Linear.None, true);
    	tween2.onComplete.add(this.showHiddenBtn, this);
	},
	over: function(sprite) {
		sprite.bringToTop();
		sprite.scale.setTo(2,2);
		sprite.anchor.setTo(0.2, 0.5);
	},
	out: function(sprite) {
		sprite.scale.setTo(1,1);
		sprite.anchor.setTo(0, 0);
	},
	hideFullMap: function() {
		mask_fullmap.scale.x = 0;
    	mask_fullmap.scale.y = 0;
    	btn_hide.visible = false;
	},
    showHiddenBtn: function() {
	    btn_hide.visible = true;
    },
}