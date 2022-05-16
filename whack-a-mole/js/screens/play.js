import HUDContainer from "./../entities/HUD.js";
import MoleManager from "./../entities/manager.js";

// list of y position where to create background and grass elements
var y_pos = [0, 127, 255, 383, 511, 639];

class PlayScreen extends me.Stage {
    /**
     * action to perform on state change
     */
    onResetEvent() {

        me.game.reset();

        // add the background & foreground sprite elements
        y_pos.forEach((y, i) => {
            // create a background sprite
            var background  = new me.Sprite(0, y, {image: me.loader.getImage("background")});
            // create the grass sprite, alternate between the upper and lower one
            var grass = new me.Sprite(0, y, {image: me.loader.getImage(i%2===0?"grass_upper":"grass_lower")});
            // set default anchor points
            background.anchorPoint.set(0, 0);
            grass.anchorPoint.set(0, 0);
            // add the game world
            me.game.world.addChild(background, 0);
            me.game.world.addChild(grass, (i * 10) + 10);
        });

        // instantiate the mole Manager
        var moleManager = new MoleManager(0, 0);
        me.game.world.addChild (moleManager, 0);

        // add our HUD (scores/hiscore)
        this.HUD = new HUDContainer();
        me.game.world.addChild(this.HUD);

        // start the main soundtrack
        me.audio.playTrack("whack");
    };

    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // stop some music
        me.audio.stopTrack();
    };
};

export default PlayScreen;
