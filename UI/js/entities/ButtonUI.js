import * as me from 'melonjs';
import game from "../index.js";

/**
 * a basic button control
 */
export class ButtonUI extends me.UISpriteElement {
    /**
     * constructor
     */
    constructor(x, y, color, label) {
        super(x, y, {
            image: game.texture,
            region : color + "_button04"
        });

        // offset of the two used images in the texture
        this.unclicked_region = game.texture.getRegion(color + "_button04");
        this.clicked_region = game.texture.getRegion(color + "_button05");

        this.anchorPoint.set(0, 0);
        this.setOpacity(0.5);

        this.font = new me.Text(0, 0 ,{
            font: "kenpixel",
            size: 12,
            fillStyle: "black",
            textAlign: "center",
            textBaseline: "middle",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });

        this.label = label;

        // only the parent container is a floating object
        this.floating = false;
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.5);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(event) {
        this.translate(0, this.height - this.clicked_region.height);
        this.setRegion(this.clicked_region);
        // don't propagate the event
        return false;
    }

    /**
     * function called when the pointer button is released
     */
    onRelease(/* event */) {
        this.setRegion(this.unclicked_region);
        this.translate(0, -(this.height - this.clicked_region.height));
        // don't propagate the event
        return false;
    }

    draw(renderer) {
        super.draw(renderer);
        this.font.draw(renderer,
            this.label,
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );
    }

    /**
     * OnDestroy Notification function
     */
    onDestroyEvent() {
        this.font.destroy();
        this.font = null;
    }
    
};
