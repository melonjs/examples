import * as me from "melonjs";
import Sprite from "./../entities/entities.js";

class Pointer extends me.Renderable {
    constructor() {
        super(0, 0, 10, 10);
        this.font = new me.Text(0, 0, {
            font: "Arial",
            size: 10,
            fillStyle: "#FFFFFF",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });
        this.font.textAlign = "center";
        this.font.textBaseline = "bottom";
    }
    update(dt) {
        return true;
    }
    draw(renderer) {
        if (typeof me.plugins.debugPanel !== "undefined" && me.plugins.debugPanel.panel.visible === true) {
            var x = Math.round(me.input.pointer.gameWorldX);
            var y = Math.round(me.input.pointer.gameWorldY);
            this.font.draw(renderer, "( " + x + "," + y + " )", x, y );
        }
    }
};

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // clear the background
        me.game.world.addChild(new me.ColorLayer("background", "#5E3F66"), 0);

        var container = new me.Container(100, 100);

        container.floating = true;

        // add a few shapes
        container.addChild(new Sprite(100, 100, {sprite: "hamburger"}));
        container.addChild(new Sprite(200, 200, {sprite: "icecream3"}));

        me.game.world.addChild(container);
        me.game.world.addChild(new Sprite(300, 100, {sprite: "icecream2"}));
        me.game.world.addChild(new Sprite(400, 200, {sprite: "hotdog"}));
        me.game.world.addChild(new Sprite(500, 100, {sprite: "icecream"}));
        me.game.world.addChild(new Sprite(600, 200, {sprite: "drink"}));
        // use a regular circle shape for this one
        me.game.world.addChild(new Sprite(250, 350,  {
            sprite: "orange",
            // orange sprite is 58x59
            shape : new me.Ellipse(29, 29.5, 58, 59)
        }));

        // display the current pointer coordinates on top of the pointer arrow
        me.game.world.addChild(new Pointer(), 10);
    }
};

export default PlayScreen;
