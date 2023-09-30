import * as me from "melonjs";

class Sprite extends me.Sprite {
     /**
     * constructor
     */
    constructor(x, y, settings) {
        super(x, y, {image: settings.sprite});

        // add a physic body
        this.body = new me.Body(this);
        this.body.gravityScale = 0;

        if (typeof settings.shape !== "undefined") {
            this.body.addShape(settings.shape);
        } else {
            this.body.addShape(me.loader.getJSON("shapesdef")[settings.sprite]);
        }

        this.body.setStatic();

        // status flags
        this.selected = false;
        this.hover = false;

        // enable physic and input event for this renderable
        this.isKinematic = false;

        // to memorize where we grab the sprite
        this.grabOffset = new me.Vector2d(0,0);

        this.anchorPoint.set(0.5, 0.5);

        // half transparent when not selected
        this.setOpacity(0.5);
    }

    onActivateEvent() {
        //register on mouse/touch event
        me.input.registerPointerEvent("pointerdown", this, this.onSelect.bind(this));
        me.input.registerPointerEvent("pointerup", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointercancel", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointermove", this, this.pointerMove.bind(this));
        me.input.registerPointerEvent("wheel", this, this.onScroll.bind(this));
    }

    /**
     * pointermove function
     */
    pointerMove(event) {
        if (this.selected) {
            // follow the pointer
            this.pos.set(event.gameX, event.gameY, this.pos.z);
            this.pos.sub(this.grabOffset);
            this.isDirty = true;
            // don't propagate the event furthermore
            return false;
        }
    }

    /**
     * pointermove function
     */
    onScroll(event) {
        if (this.selected) {
            
           
            console.log( {x:event.gameX, y:event.gameY});

            // by default body rotate around the body center
            this.body.rotate(event.deltaY);

            // default anchor point for renderable is 0.5, 0.5
            this.rotate(event.deltaY);

            this.isDirty = true;

            // don't propagate the event furthermore
            return false;
        }
    }

    // mouse down function
    onSelect(event) {
        if (this.selected === false) {
            // manually calculate the relative coordinates for the body shapes
            // since only the bounding box is used by the input event manager
            var x = event.gameX - this.getBounds().x + this.body.getBounds().x;
            var y = event.gameY - this.getBounds().y + this.body.getBounds().y;

            // the pointer event system will use the object bounding rect, check then with with all defined shapes
            if (this.body.contains(x, y)) {
                this.selected = true;
            }
            if (this.selected) {
                this.grabOffset.set(event.gameX, event.gameY);
                this.grabOffset.sub(this.pos);
                this.setOpacity(1.0);
            }
            this.isDirty = true;
        }
        // don't propagate the event furthermore if selected
        return !this.selected;
    }

    // mouse up function
    onRelease(/*event*/) {
        this.selected = false;
        this.setOpacity(0.5);
        this.isDirty = true;
        // don't propagate the event furthermore
        return false;
    }
};

export default Sprite;
