import * as me from 'https://esm.run/melonjs';

// a draggable square entity
class Square extends me.Renderable {

    constructor(x, y, width, height) {
        // call the super constructor
        super(x, y, width, height);

        // use 0,0 as origin
        this.anchorPoint.set(0, 0);

        // add a physic body
        var rect = this.getBounds().clone();
        rect.shift(0, 0);
        this.body = new me.Body(this, rect);
        this.body.setStatic();

        // status flags
        this.selected = false;
        this.hover = false;

        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0,0);

        // turn red once touched by a line
        this.color = new me.Color(0, 255, 0);

        this.isColliding = false;
    }

    onActivateEvent() {
        //register on mouse/touch event
        me.input.registerPointerEvent("pointerdown", this, this.onSelect.bind(this));
        me.input.registerPointerEvent("pointerup", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointercancel", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointermove", this, this.pointerMove.bind(this));
    }

    /**
     * pointermove function
     */
    pointerMove(event) {
        if (this.selected) {
            // follow the pointer
            me.game.world.moveUp(this);
            this.pos.set(event.gameX, event.gameY, this.pos.z);
            this.pos.sub(this.grabOffset);
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
                this.selected = true;
            }
        }
        return this.selected;
    }

    // mouse up function
    onRelease(/*event*/) {
        this.selected = false;
        // don"t propagate the event furthermore
        return false;
    }


    /**
     * draw the square
     */
    draw(renderer) {
        var lineWidth = 2;

        if (this.isColliding === true) {
            this.color.setColor(255, 0, 0);
        } else {
            this.color.setColor(0, 255, 0);
        }

        renderer.setGlobalAlpha(0.5);
        renderer.setColor(this.color);
        renderer.translate(this.pos.x, this.pos.y);
        renderer.fillRect(0, 0, this.width, this.height);
        renderer.setGlobalAlpha(1.0);
        renderer.setLineWidth(lineWidth);
        renderer.strokeRect(
            lineWidth,
            lineWidth,
            this.width - lineWidth * 2,
            this.height - lineWidth * 2
        );

        // reset the colliding flag
        this.isColliding = false;
    }
};

export default Square;
