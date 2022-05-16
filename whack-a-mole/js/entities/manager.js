import MoleEntity from "./mole.js";

/**
 * a mole manager (to manage movement, etc..)
 */
class MoleManager extends me.Renderable {

    constructor() {
        // call the super constructor
        super(0, 0, {
            width : 10,
            height : 10
        });

        this.moles = [];
        this.timer = 0;

        var i = 0;

        // add the first row of moles
        for (i = 0; i < 3; i ++) {
            this.moles[i] = new MoleEntity((112 + (i * 310)), 127+40);
            me.game.world.addChild (this.moles[i], 15);
        }

        // add the 2nd row of moles
        for (i = 3; i < 6; i ++) {
            this.moles[i] = new MoleEntity((112 + ((i-3) * 310)), 383+40);
            me.game.world.addChild (this.moles[i], 35);
        }

        // add the 3rd row of moles
        for (i = 6; i < 9; i ++) {
            this.moles[i] = new MoleEntity((112 + ((i-6) * 310)), 639+40);
            me.game.world.addChild (this.moles[i], 55);
        }

        this.timer = 0;
    };

    /*
     * update function
     */
    update( dt ) {
        // every 1/2 seconds display moles randomly
        this.timer += dt;
        if ((this.timer) >= 500) {
            for (var i = 0; i < 9; i += 3) {
                var hole = me.Math.random(0, 3) + i;
                if (!this.moles[hole].isOut && !this.moles[hole].isVisible) {
                    this.moles[hole].display();
                }
            }
            this.timer = 0;
        }
        return false;
    };
};

export default MoleManager;
