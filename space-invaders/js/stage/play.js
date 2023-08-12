import * as me from 'https://esm.run/melonjs';

import PlayerEntity from "../renderables/player.js";
import EnemyManager from "../managers/enemy-manager.js";

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        me.game.world.backgroundColor.parseCSS("#000000");

        this.player = new PlayerEntity();
        me.game.world.addChild(this.player, 1);

        this.enemyManager = new EnemyManager();
        this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);


        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");

        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    }


    onDestroyEvent() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);

        me.input.unbindKey(me.input.KEY.SPACE);
    }


    checkIfLoss(y) {
        if (y >= this.player.pos.y) {
            this.reset();
        }
    }
};

export default PlayScreen;
