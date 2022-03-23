import * as me from 'https://esm.run/melonjs';
import game from "./../index.js";

// a Panel type container
class UIContainer extends me.Container {

    constructor(x, y, width, height, label) {
        // call the constructor
        super(x, y, width, height);

        // make sure the UI Container bounds are updated
        this.enableChildBoundsUpdate = true;

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // persistent across level change
        this.isPersistent = true;

        // use screen coordinates
        this.floating = true;

        // give a name
        this.name = "UIPanel";

        // back panel sprite
        this.panelSprite = game.texture.createSpriteFromName(
            "grey_panel",
            { width : this.width, height : this.height},
            true
        );
        this.addChild(this.panelSprite);

        this.font = new me.Text(0, 0 ,{
            font: "kenpixel",
            size: 20,
            fillStyle: "black",
            textAlign: "center",
            textBaseline: "top",
            bold: true,
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });

        this.label = label;

        // input status flags
        this.selected = false;
        this.hover = false;
        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0,0);
    }

    onActivateEvent() {
        // register on the global pointermove event
        me.event.on(me.event.POINTERMOVE, this.pointerMove, this);
        //register on mouse/touch event
        me.input.registerPointerEvent("pointerdown", this, this.onSelect.bind(this));
        me.input.registerPointerEvent("pointerup", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointercancel", this, this.onRelease.bind(this));

        // call the parent function
        super.onActivateEvent();
    }

    onDeactivateEvent() {
        // unregister on the global pointermove event
        me.event.off(me.event.POINTERMOVE, this.pointerMove);
        // release pointer events
        me.input.releasePointerEvent("pointerdown", this);
        me.input.releasePointerEvent("pointerup", this);
        me.input.releasePointerEvent("pointercancel", this);

        // call the parent function
        super.onDeactivateEvent();
    }

    /**
     * pointermove function
     */
    pointerMove(event) {
        this.hover = this.getBounds().contains(event.gameX, event.gameY);

        if (this.selected) {
            // follow the pointer
            this.pos.set(event.gameX, event.gameY, this.pos.z);
            this.pos.sub(this.grabOffset);
        }
        // mark the container for redraw
        this.isDirty = true;
    }

    // mouse down function
    onSelect(event) {
        if (this.hover === true) {
            this.grabOffset.set(event.gameX, event.gameY);
            this.grabOffset.sub(this.pos);
            this.selected = true;
            // don"t propagate the event furthermore
            return false;
        }
    }

    // mouse up function
    onRelease(/*event*/) {
        this.selected = false;
    }

    draw(renderer) {
        super.draw(renderer);
        this.font.draw(
            renderer,
            this.label,
            this.width / 2,
            16, // panel border
        );
    }
};
export default UIContainer;
