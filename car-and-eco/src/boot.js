var Boot = function(game){
};
  
Boot.prototype = {
	preload: function(){
        this.game.load.image("loading","assets/img/loading.png"); 
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.updateLayout();
		this.game.state.start("Preload");
	}
}