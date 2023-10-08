import * as me from "melonjs";
import game from "./../index.js";

/**
 * Cap Guy entiry
 */
class CapGuyEntity extends me.Entity {
    /**
     * constructor
     */
    constructor(x, y) {

        // call the super constructor
        super(0, 200, {width : 100, height : 300});

        // just manually change the guy position
        this.body.setStatic();

        // create an animation using the cap guy sprites, and add as renderable
        this.renderable = game.texture.createAnimationFromName([
            "capguy/walk/0001", "capguy/walk/0002",
            "capguy/walk/0003", "capguy/walk/0004",
            "capguy/walk/0005", "capguy/walk/0006",
            "capguy/walk/0007", "capguy/walk/0008"
        ]);
    }

    /**
     * manage the enemy movement
     */
    update(dt) {
        // just manually change the guy position
        this.pos.x += 0.3 * dt;

        // repeat once leaving the viewport
        if (this.pos.x >= me.game.viewport.width) {
            this.pos.x = 0;
        }

        // call the parent function
        super.update(dt);

        return true;
    }
};

export default CapGuyEntity;
