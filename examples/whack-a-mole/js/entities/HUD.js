import data from "./../data.js";

/**
 * a basic HUD item to display score
 */
class ScoreItem extends me.Renderable {
    /**
     * constructor
     */
    constructor(score, align, x, y) {

        // call the super constructor
        // (size does not matter here)
        super(x, y, 10, 10);

        // create a font
        this.font = new me.BitmapText(0, 0, {
            font : "PressStart2P",
            size : 1.5,
            textAlign : align,
            textBaseline : "top"
        });

        // ref to the score variable
        this.scoreRef = score;

        // make sure we use screen coordinates
        this.floating = true;
    };

    /**
     * draw the score
     */
    draw(context) {
        this.font.draw(context, data[this.scoreRef], this.pos.x, this.pos.y);
    };
};

/**
 * a HUD container a
 */
class HUDContainer extends me.Container {

    constructor() {
        // call the constructor
        super();

        // persistent across level change
        this.isPersistent = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at position
        this.addChild(new ScoreItem("score", "left", 10, 10));

        // add our child score object at position
        this.addChild(new ScoreItem("hiscore", "right", me.video.renderer.getWidth(), 10));
    };
};

export default HUDContainer;
