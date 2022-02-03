import * as me from 'https://esm.run/melonjs';
import game from './../game.js';

class CoinEntity extends me.Collectable {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y,
            Object.assign({
                image: game.texture,
                region : "coin.png",
                shapes :[new me.Ellipse(35 / 2, 35 / 2, 35, 35)] // coins are 35x35
            })
        );
    }

    // add a onResetEvent to enable object recycling
    onResetEvent(x, y, settings) {
        this.shift(x, y);
        // renable collision with other objects
        this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
    }

    /**
     * collision handling
     */
    onCollision(/*response*/) {

        // do something when collide
        me.audio.play("cling", false);
        // give some score
        game.data.score += 250;

        //avoid further collision and delete it
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        me.game.world.removeChild(this);

        return false;
    }
};

export default CoinEntity;
