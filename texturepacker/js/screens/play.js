import * as me from "melonjs";
import CapGuyEntity from "./../entities/entities.js";
import game from "./../index.js";

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // viewport width and height
        var w = me.game.viewport.width;
        var h = me.game.viewport.height;

        // add the Background
        var background = game.texture.createSpriteFromName("background");
        // set position to the middle of the viewport
        // (as the sprite anchorPoint is (0.5, 0.5)
        background.pos.set(w / 2, h / 2, 1);
        // add to the scene
        me.game.world.addChild(background, 1);
        // add the Cap Guy
        me.game.world.addChild(new CapGuyEntity(), 2);
    }
};

export default PlayScreen;
