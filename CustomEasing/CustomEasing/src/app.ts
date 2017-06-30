module CustomFrames {
    export class Globals {
        // game derived from Phaser.Game
        static game: Game = null;

        // game orientation
        static correctOrientation: boolean = false;
    }
}

// -------------------------------------------------------------------------
window.onload = () => {
    CustomFrames.Globals.game = new CustomFrames.Game();
};
