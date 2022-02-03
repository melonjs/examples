import * as me from 'https://esm.run/melonjs';

import game from './../game.js';
import VirtualJoypad from './../entities/controls.js';
import UIContainer from './../entities/HUD.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
      // load a level
        me.level.load("map1");

        // reset the score
        game.data.score = 0;

        // add our HUD to the game world
        if (typeof this.HUD === "undefined") {
            this.HUD = new UIContainer();
        }
        me.game.world.addChild(this.HUD);

        // display if debugPanel is enabled or on mobile
        if ((me.plugins.debugPanel && me.plugins.debugPanel.panel.visible) || me.device.touch) {
            if (typeof this.virtualJoypad === "undefined") {
                this.virtualJoypad = new VirtualJoypad();
            }
            me.game.world.addChild(this.virtualJoypad);
        }

        // play some music
        me.audio.playTrack("dst-gameforest");
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {

        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // remove the joypad if initially added
        if (this.virtualJoypad && me.game.world.hasChild(this.virtualJoypad)) {
            me.game.world.removeChild(this.virtualJoypad);
        }

        // stop some music
        me.audio.stopTrack("dst-gameforest");
    }
};

export default PlayScreen;
