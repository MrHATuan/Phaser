Score = function(game, x1, x2, x3, y) {
    var moneyLabel, pointLabel;

    this.initScore(game, x1, x2, x3, y);
};

Score.prototype.initScore = function(game, x1, x2, x3, y) {
    this.game = game;

    this.money = 0;
    this.moneyBuffer = 0;
    this.point = 0;

    // Create Money
    moneyLabel = this.game.add.text(x1, y, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'right', wordWrap: true, wordWrapWidth: 100});
    moneyLabel.anchor.setTo(0.5);

    // Create Point
    var textPoint = this.game.add.text(x2, y, "My Point: ", {font: "20px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
    textPoint.anchor.setTo(0.5);
    pointLabel = this.game.add.text(x3, y, "0", {font: "25px Arial", fill: "#ffffff", stroke: "#535353", strokeThickness: 5, align: 'left'});
    pointLabel.anchor.setTo(0.5);
};

Score.prototype.update = function() {
    // increment Money
    if(this.moneyBuffer > 0){
        this.moneyBuffer -= 2;
        this.money += 2;
        moneyLabel.setText(this.money);
    }

    pointLabel.setText(this.point);
};

Score.prototype.upMoney = function(money) {
    this.moneyBuffer += money;
};

Score.prototype.upPoint = function(point) {
    this.point += point;
};