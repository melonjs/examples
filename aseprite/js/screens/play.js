import * as me from "melonjs";
import Paladin from "./../entities/entities.js";
import game from "./../index.js";

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // viewport width and height
        var w = me.game.viewport.width;
        var h = me.game.viewport.height;

        me.game.world.addChild(new Paladin(), 2);
    }
};

export default PlayScreen;
