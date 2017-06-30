module CustomFrames {

    export class Game extends Phaser.Game {
        // -------------------------------------------------------------------------
        constructor() {
            // calculate screen dimensions
            var screenDims = Utils.ScreenUtils.calculateScreenMetrics(500, 313, Utils.Orientation.LANDSCAPE, 500, 313);

            super(screenDims.gameWidth, screenDims.gameHeight, Phaser.CANVAS, "content", null /* , transparent, antialias, physicsConfig */);
            
            // states
            this.state.add('Boot', Boot);

            // start
            this.state.start('Boot');
        }

        // -------------------------------------------------------------------------
        public additionalFrameProperties(aFrame: Phaser.Frame, aData: any): void {
            // anchor
            if (aData.anchor) {
                aFrame["anchorX"] = aData.anchor.w;
                aFrame["anchorY"] = aData.anchor.h;
            }

            // next tem
            if (aData.nextitem) {
                aFrame["nextItemX"] = aData.nextitem.w;
                aFrame["nextItemY"] = aData.nextitem.h;
            }
        }
    }
}
    