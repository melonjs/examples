import * as me from 'https://esm.run/melonjs';
import Square from './../entities/entities.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        var rectSize = 150;

        // clear the background
        me.game.world.addChild(new me.ColorLayer("background", "black"), 0);

        // add a few shapes
        me.game.world.addChild(new Square(50, 50, rectSize, rectSize), 1);
        me.game.world.addChild(new Square(50, 400, rectSize, rectSize), 1);
        me.game.world.addChild(new Square(300, 125, rectSize, rectSize), 1);
        me.game.world.addChild(new Square(300, 350, rectSize, rectSize), 1);
        me.game.world.addChild(new Square(600, 200, rectSize, rectSize), 1);
        me.game.world.addChild(new Square(600, 400, rectSize, rectSize), 1);

        // basic renderable that cast a ray across the world and check for collision
        class Line extends me.Renderable {
            constructor() {
                super(0, 0, 10, 10);
                this.line = new me.Line(0, 0, [
                    new me.Vector2d(me.game.viewport.width / 2, me.game.viewport.height / 2),
                    new me.Vector2d(me.game.viewport.width, me.game.viewport.height)
                ]);

            }
            update(dt) {
                this.line.rotate(0.0125, new me.Vector2d(me.game.viewport.width / 2, me.game.viewport.height / 2));
                var result = me.collision.rayCast(this.line);

                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        // update the object isColliding flag
                        result[i].isColliding = true;
                    }
                }
                return true;
            }
            draw(renderer) {
                renderer.setColor("red");
                renderer.stroke(this.line);
            }
        }
        me.game.world.addChild(new Line(), 10);
    }
};

export default PlayScreen;
