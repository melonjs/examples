import * as me from 'https://esm.run/melonjs';

import CONSTANTS from '../constants.js';

class PlayerEntity extends me.Sprite {

    /**
     * constructor
     */
    constructor() {
        let image = me.loader.getImage("player");

        super(
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height - image.height - 20,
            { image : image, width: 32, height: 32 }
        );

        this.velx = 450;
        this.maxX = me.game.viewport.width - this.width;
    }

    /**
     * update the entity
     */
    update(dt) {
        super.update(dt);

        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.velx * dt / 1000;
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.velx * dt / 1000;
        }

        if (me.input.isKeyPressed("shoot")) {
            me.game.world.addChild(me.pool.pull("laser", this.getBounds().centerX - CONSTANTS.LASER.WIDTH / 2, this.getBounds().top));
        }

        this.pos.x = me.Math.clamp(this.pos.x, 32, this.maxX);

        return true;
    }

   /**
     * collision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        return true;
    }
};

export default PlayerEntity;
