import * as me from 'https://esm.run/melonjs';

import PlayScreen from "../stage/play.js";
import CONSTANTS from '../constants.js';


export class Laser extends me.Renderable {

    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, CONSTANTS.LASER.WIDTH, CONSTANTS.LASER.HEIGHT);

        // add a physic body and configure it
        this.body = new me.Body(this);
        // add a default collision shape
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        // this body has a velocity of 0 units horizontal and 16 units vertically
        this.body.vel.set(0, -16);
        // the force to be applied at each update is -8 units vertically (in html, this means towards top of window)
        this.body.force.set(0, -8);
        // cap the velocity of the laser beam to the initial velocity
        this.body.setMaxVelocity(3, 16);
        // this object is officially a projectile
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        // don't let gravity affect the object
        this.body.ignoreGravity = true;

        // always update, so that we can track it when outside the screen
        this.alwaysUpdate = true;
    }

    /**
     * call when the object instance is being recycled
     */
    onResetEvent(x, y) {
        this.pos.set(x, y);
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        // if the laser is above the screen, remove it from the game world
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }
        return super.update(dt);
    }

    /**
     * @param response
     * @param other
     * @returns {boolean}
     */
    onCollision(response, other) {

        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            me.game.world.removeChild(this);
            return false;
        }
    }

    /**
     * draw the laser
     */
    draw(renderer) {
        let color = renderer.getColor();
        renderer.setColor('#5EFF7E');
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        renderer.setColor(color);
    }
}

export default Laser;
