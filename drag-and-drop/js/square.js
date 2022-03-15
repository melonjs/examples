import * as me from 'https://esm.run/melonjs@10.5';

export class Square extends me.Draggable {

    constructor(x, y, settings) {
        // call the super constructor
        super(x, y, settings.width, settings.height);
        // set the color to white
        this.color = "white";
        // set the font we want to use
        this.font = new me.Text(0, 0, {font:"Verdana", size:15, fillStyle:"black"});
        this.font.bold();
        // set the text
        this.text = "Drag me";
    }
    /**
     * update function
     */
    update(dt) {
        super.update(dt);
        return true;
    }
    /**
     * draw the square
     */
    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y);
    }
    /**
     * dragStart overwrite function
     */
    dragStart(e) {
        // call the super function
        super.dragStart(e);
        // set the color to blue
        this.color = "blue";
    }
    dragEnd(e) {
        // call the super function
        super.dragEnd(e);
        // set the color to white
        this.color = "white";
    }
};

export class DropTarget extends me.DropTarget {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings.width, settings.height);
        // set the color to white
        this.color = "red";
        // set the font we want to use
        this.font = new me.Text(0, 0, {font:"Verdana", size:15, fillStyle:"black"});

        this.font.bold();
        // set the text
        this.text = "Drop on me\n\nAnd I\"ll turn green\n\ncheckmethod: overlap";
    }
    /**
     * update function
     */
    update(dt) {
        super.update(dt);
        return true;
    }
    /**
     * draw the square
     */
    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y, );
    }
    /**
     * drop overwrite function
     */
    drop(e) {
        // call the super function
        super.drop(e);
        // save a reference to this to use in the timeout
        var self = this;
        // indicate a succesful drop
        this.color = "green";
        // set the color back to red after a second
        window.setTimeout(function () {
            self.color = "red";
        }, 1000);
    }
};

export class DropTarget2 extends DropTarget {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y, settings);
        // set the color to white
        this.color = "red";
        // set the font we want to use
        this.font = new me.Text(0, 0, {font:"Verdana", size:15, fillStyle:"black"});
        this.font.bold();
        // set the text
        this.text = "Drop on me\n\nAnd I\"ll turn green\n\ncheckmethod: contains";
        // set the check method to "contains" (default is "overlap")
        this.setCheckMethod(this.CHECKMETHOD_CONTAINS);
    }
};
