import * as me from "melonjs";
import game from "./../index.js";

/**
 * Cap Guy entiry
 */
class Paladin extends me.Entity {
    /**
     * constructor
     */
    constructor(x, y) {

        // call the super constructor
        super(160, 250, {width : 100, height : 100});

        // just manually change the guy position
        this.body.setStatic();

        // create a new sprite with all animations from the paladin atlas
        this.renderable = game.texture.createAnimationFromName();

        this.renderable.setCurrentAnimation("run front");

        this.anchorPoint.set(0.5, 0.0);
        this.renderable.scale(4);

        // load selected level on change event
        document.getElementById('animation_name').addEventListener('change', ()=>{
            this.renderable.setCurrentAnimation(document.getElementById('animation_name').value);
        });
    }
};

export default Paladin;
