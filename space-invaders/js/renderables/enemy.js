import * as me from 'https://esm.run/melonjs';

class EnemyEntity extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "ships",
            framewidth: 32,
            frameheight: 32,
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.ignoreGravity = true;

        // randomize and set animation
        this.addAnimation("idle", [me.Math.random(0, 4)], 1);
        this.setCurrentAnimation("idle");
    }

    /**
     * @param response
     * @param other
     * @returns {boolean}
     */
    onCollision(response, other) {
        if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
            // ancestor here is the eneny mamanager "container"
            this.ancestor.removeChild(this);
            return false;
        }
    }
}

export default EnemyEntity;
