import * as me from 'https://esm.run/melonjs';

class Smilie extends me.Sprite {
    constructor(i) {
        super(
            me.Math.random(-15, me.game.viewport.width),
            me.Math.random(-15, me.game.viewport.height),
            {
                image: "monster.png"
            }
        );
        // add a physic body with an ellipse as body shape
        this.body = new me.Body(this, new me.Ellipse(6, 6, this.width - 6, this.height - 6));
        this.body.setMaxVelocity(4, 4);
        this.body.force.set(me.Math.randomFloat(-4, 4), me.Math.randomFloat(-4, 4));
        this.body.gravityScale = 0;

        // apply a random tint
        this.tint = new me.Color().random(64, 255);

        // as we go out of the viewport coordinates
        this.alwaysUpdate = true;
    }

    update() {
        // world limit check
        if (this.pos.x > me.game.viewport.width) {
            this.body.force.x = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.x);
        }
        if (this.pos.x < 0) {
            this.body.force.x = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.x);
        }
        if (this.pos.y > me.game.viewport.height) {
            this.body.force.y = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.y);
        }
        if (this.pos.y < 0) {
            this.body.force.y = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.y);
        }

        // rotate the sprite based on the current velocity
        this.rotate(this.body.force.x < 0 ? -0.05 : 0.05);

        this.setOpacity(0.5);

        return true;
    }

    // collision handler
    onCollision(response) {

        this.setOpacity(1.0);

        this.pos.sub(response.overlapN);

        if (response.overlapN.x !== 0) {
            this.body.force.x = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.x);
        }
        if (response.overlapN.y !== 0) {
            this.body.force.y = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.y);
        }

        return false;
    }
};


export default function onload() {
    // Initialize the video.
    if (!me.video.init(1024, 768, {scaleMethod : "flex"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // load our monster image and populate the game world
    me.loader.load({ name: "monster", type:"image", src:"data/img/monster.png" }, function () {
        // add some keyboard shortcuts
        me.event.on(me.event.KEYDOWN, function (action, keyCode /*, edge */) {
            // toggle fullscreen on/off
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

        // reset/empty the game world
        me.game.world.reset();

        // add a background layer
        me.game.world.addChild(new me.ColorLayer("background", "#5E3F66", 0), 0);

        // Add some objects
        for (var i = 0; i < 255; i++) {
            me.game.world.addChild(new Smilie(i), 3);
        }
    });
};
