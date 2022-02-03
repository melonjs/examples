import * as me from 'https://esm.run/melonjs';

class Selector extends me.Renderable {
    /** Constructor */
    constructor() {
        // reference to the main layer
        var levelLayer = me.game.world.getChildByName("level 1")[0];

        // call the parent constructor using the tile size
        super(0, 0,
            levelLayer.tilewidth / 2,
            levelLayer.tileheight
        );

        this.refLayer = levelLayer;

        this.anchorPoint.set(0, 0);

        // configure it as floating
        this.floating = true;

        // create a corresponding diamond polygon shape with an isometric projection
        this.diamondShape = this.clone().toPolygon().toIso();

        // currently selected tile
        this.currentTile = null;

        // simple system font to display tile coordinates
        this.font = new me.Text(0, 0, {
            font: "Arial",
            fillStyle : "#FFFFFF",
            size: 10,
            textAlign : "center",
        });

        // dirty flag to enable/disable redraw
        this.dirty = false;

        this.isKinematic = false;

        // subscribe to pointer and viewport move event
        this.pointerEvent = me.event.on("pointermove", this.pointerMove, this);
        this.viewportEvent = me.event.on(me.event.VIEWPORT_ONCHANGE, this.viewportMove, this);
    }

    /** pointer move event callback */
    pointerMove(event) {
        var tile = this.refLayer.getTile(event.gameWorldX, event.gameWorldY);
        if (tile && tile !== this.currentTile) {
            // get the tile x/y world isometric coordinates
            this.refLayer.getRenderer().tileToPixelCoords(tile.col, tile.row, this.diamondShape.pos);
            // convert thhe diamon shape pos to floating coordinates
            me.game.viewport.worldToLocal(
                this.diamondShape.pos.x,
                this.diamondShape.pos.y,
                this.diamondShape.pos
            );
            // store the current tile
            this.currentTile = tile;
        };
    }

    /** viewport move event callback */
    viewportMove(pos) {
        // invalidate the current tile when the viewport is moved
        this.currentTile = null;
    }

    /** Update function */
    update(dt) {
        return (typeof(this.currentTile) === "object");
    }

    /** draw function */
    draw(renderer) {
        if (this.currentTile) {
            // draw our diamond shape
            renderer.save();
            renderer.setColor("#FF0000");
            renderer.stroke(this.diamondShape);

            renderer.setColor("#FFFFFF");
            // draw the tile col/row in the middle
            this.font.draw (
                renderer,
                "( " + this.currentTile.col + "/" + this.currentTile.row + " )",
                this.diamondShape.pos.x,
                (this.diamondShape.pos.y + (this.currentTile.height / 2) - 8)
            );
            renderer.restore();
        }
    }
};

class PlayScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // disable gravity
        me.game.world.gravity.set(0, 0);

        // load a level
        me.level.load("isometric");

        // display a basic tile selector
        me.game.world.addChild(new Selector());

        // register on mouse event
        me.input.registerPointerEvent("pointermove", me.game.viewport, function (event) {
            me.event.emit("pointermove", event);
        }, false);
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        // unsubscribe to all events
        me.off.unsubscribe(this.pointerEvent);
        me.off.unsubscribe(this.viewportEvent);
        me.input.releasePointerEvent("pointermove", me.game.viewport);
    }
};

export default PlayScreen;
