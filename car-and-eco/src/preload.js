var Preload = function(game){}

Preload.prototype = {
    preload: function(){ 
        var loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.game.load.setPreloadSprite(loadingBar);
        // background
        this.load.image('bg', 'assets/img/bg.png');
        this.load.image('border', 'assets/img/border.png');
        this.load.image('right_frame', 'assets/img/right_frame.png');
        // map
        this.load.json('map', 'assets/map/map.json');
        this.load.spritesheet('mapsheet', 'assets/map/sheet.png', 110, 64, 2);
        // Car
        this.load.spritesheet('car', 'assets/img/car.png', 66, 52, 4);
        this.load.image('upgradeBg', 'assets/img/car/upgradeCar/upgrade_bg.png');
        this.load.image('notificationStepBg', 'assets/img/car/upgradeCar/notification_step.png');
        this.load.spritesheet('notificationUpgradeBg', 'assets/img/car/upgradeCar/notification_upgrade.png', 526, 266, 3);
        this.load.spritesheet('carPriceBg', 'assets/img/car/upgradeCar/car_price_bg.png', 467, 101, 4);

        this.load.image('buyCarBg', 'assets/img/car/buyCar/buy_car_bg.png');
        this.load.image('textBg', 'assets/img/car/buyCar/text_bg.png');
        this.load.image('textGoToFactory', 'assets/img/car/buyCar/text_go_to_factory.png');
        this.load.spritesheet('yearBuyCar', 'assets/img/car/buyCar/year-buy-car.png', 147, 27, 5);

        // dice
        this.load.spritesheet('diceBg', 'assets/img/dice/diceBg.png', 222, 222, 52);
        this.load.spritesheet('diceAll', 'assets/img/dice/dice_aimation.png', 83, 82, 12);
        this.load.spritesheet('dice', 'assets/img/dice/dice.png', 73, 81, 6);
        this.load.spritesheet('diceRandom', 'assets/img/dice/dice_random.png', 83, 83, 50);
        // factory
        this.load.image('factoryGround', 'assets/img/factory/ground.png');
        this.load.image('factory', 'assets/img/factory/factory.png');
        this.load.image('mainFactory', 'assets/img/factory/mainFactory.png');
        this.load.image('factoryNew', 'assets/img/factory/factoryNew.png');
        this.load.image('solarFactory', 'assets/img/factory/solarFactory.png');
        this.load.image('recycleFactory', 'assets/img/factory/recycleFactory.png');
        this.load.image('recycleFactoryNew', 'assets/img/factory/recycleFactoryNew.png');
        this.load.image('emissionFactory', 'assets/img/factory/emissionFactory.png');
        this.load.image('emissionFactoryNew', 'assets/img/factory/emissionFactoryNew.png');
        this.load.image('waterFactory', 'assets/img/factory/waterFactory.png');
        this.load.image('waterFactoryNew', 'assets/img/factory/waterFactoryNew.png');
        // factory Icon
        this.load.image('iconMain', 'assets/img/factory/factory_icon/icon_main.png');
        this.load.image('iconMainCover', 'assets/img/factory/factory_icon/icon_mainCover.png');
        this.load.image('iconSolar', 'assets/img/factory/factory_icon/icon_solar.png');
        this.load.image('iconSolarCover', 'assets/img/factory/factory_icon/icon_solarCover.png');
        this.load.image('iconRecycle', 'assets/img/factory/factory_icon/icon_recycle.png');
        this.load.image('iconRecycleCover', 'assets/img/factory/factory_icon/icon_recycleCover.png');
        this.load.image('iconEmissions', 'assets/img/factory/factory_icon/icon_emissions.png');
        this.load.image('iconEmissionsCover', 'assets/img/factory/factory_icon/icon_emissionsCover.png');
        this.load.image('iconWater', 'assets/img/factory/factory_icon/icon_water.png');
        this.load.image('iconWaterCover', 'assets/img/factory/factory_icon/icon_waterCover.png');
        // Buy Factory
        this.load.image('buyFactoryBg', 'assets/img/factory/factory_buy/bg_buy_factory.png');
        this.load.image('buyFactoryBorder', 'assets/img/factory/factory_buy/buy_factory_border.png');
        this.load.image('buyMain', 'assets/img/factory/factory_buy/buy_main.png');
        this.load.image('buySolar', 'assets/img/factory/factory_buy/buy_solar.png');
        this.load.image('buyRecycle', 'assets/img/factory/factory_buy/buy_recycle.png');
        this.load.image('buyEmssion', 'assets/img/factory/factory_buy/buy_emssion.png');
        this.load.image('buyWater', 'assets/img/factory/factory_buy/buy_water.png');
        this.load.image('investOk', 'assets/img/factory/factory_buy/invest_ok.png');
        this.load.image('moneyBg', 'assets/img/factory/factory_buy/money_bg.png');
        this.load.image('buyFactoryNoti', 'assets/img/factory/factory_buy/notification.png');
        // Event
        this.load.image('whiteBg', 'assets/img/event/white_bg.png');
        this.load.image('allEventBg', 'assets/img/event/allEvent_bg.png');
        this.load.image('investBg', 'assets/img/event/invest/invest_bg.png');
        this.load.image('eventHeader', 'assets/img/event/event/event_header.png');
        this.load.image('eventText', 'assets/img/event/event/event_text.png');
        this.load.image('eventCard', 'assets/img/event/event/event_card.png');
        this.load.image('troubleHeader', 'assets/img/event/trouble/trouble_header.png');
        this.load.image('troubleText', 'assets/img/event/trouble/trouble_text.png');
        this.load.image('troubleCard', 'assets/img/event/trouble/trouble_card.png');
        this.load.image('specialHeader', 'assets/img/event/special/special_header.png');
        this.load.image('specialCircle', 'assets/img/event/special/special_circle.png');
        this.load.image('specialStar', 'assets/img/event/special/special_star.png');
        // Buttons
        this.load.spritesheet('btnClose1', 'assets/img/button/btn_close1.png', 97, 33, 3);
        this.load.spritesheet('btnClose2', 'assets/img/button/btn_close2.png', 145, 44, 3);
        this.load.spritesheet('btnBack', 'assets/img/button/btn_back.png', 49, 41, 3);
        this.load.spritesheet('btnGameContinue', 'assets/img/button/btn_game_continue.png', 155, 27, 3);

        this.load.spritesheet('btnInvestCar', 'assets/img/button/btn_Invest.png', 234, 44, 3);

        this.load.spritesheet('btnCarDevelop', 'assets/img/button/btn_car_develop.png', 205, 55, 3);
        this.load.spritesheet('btnFactoryBuild', 'assets/img/button/btn_factory_build.png', 205, 55, 3);

        this.load.spritesheet('btnBuyFactory', 'assets/img/button/btn_buy_factory.png', 153, 33, 3);

    },
    create: function(){
        this.game.state.start("Main");
    }
}