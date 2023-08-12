import * as me from 'https://esm.run/melonjs';
import EnemyEntity from './../renderables/enemy.js';
import PlayScreen from "../stage/play.js";

class EnemyManager extends me.Container {
    static COLS = 9;
    static ROWS = 4;

    constructor() {
        super(32, 32, EnemyManager.COLS * 64 - 32, EnemyManager.ROWS * 64 - 32);

        this.enableChildBoundsUpdate = true;
        this.vel = 16;

        this.onChildChange = () => {
            if(this.children.length === 0) {
                me.state.current().reset();
            }
        }
    }


    /**
     *
     */
    createEnemies() {
        for (let i = 0; i < EnemyManager.COLS; i++) {
            for (let j = 0; j < EnemyManager.ROWS; j++) {
                var enemy = new EnemyEntity(i * 64, j * 64);
                this.addChild(enemy);
            }
        }

        this.createdEnemies = true;
    }


    onActivateEvent() {
        this.timer = me.timer.setInterval(() => {

            let bounds = this.getBounds();

            if ((this.vel > 0 && (bounds.right + this.vel) >= me.game.viewport.width) ||
                (this.vel < 0 && (bounds.left + this.vel) <= 0)) {

                this.vel *= -1;
                this.pos.y += 16;

                if (this.vel > 0) {
                    this.vel += 5;
                }
                else {
                    this.vel -= 5;
                }

                // again, I wish I could do me.state.get(me.state.PLAY).checkIfLoss()
                // this is bugging out on bounds.bottom, because bounds.bottom === Infinity when it is moving down?
                if(me.state.current() instanceof PlayScreen)
                    me.state.current().checkIfLoss(bounds.bottom); // <<<
            }
            else {
                this.pos.x += this.vel;
            }
        }, 250);
    }

    onDeactivateEvent() {
        me.timer.clearInterval(this.timer);
    }
}

export default EnemyManager;
