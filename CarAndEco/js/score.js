Score = function(game, arena, parent, x, y) {
    this.initScore(game, parent, x, y);
};

Score.prototype.initScore = function(game, parent, x, y) {
    this.game = game;
    this.arena = arena;

    this.money = 0;
    this.moneyBuffer = 0;
    this.point = 0;

    // Create Money
    var moneyLabel = this.game.add.text(100, this.game.world.height - 35, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'right', wordWrap: true, wordWrapWidth: 100});
    moneyLabel.anchor.setTo(0.5);

    // Create Point
    var textPoint = this.game.add.text(300, this.game.world.height - 35, "My Point: ", {font: "20px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
    textPoint.anchor.setTo(0.5);
    var pointLabel = this.game.add.text(400, this.game.world.height - 35, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
    pointLabel.anchor.setTo(0.5);
};