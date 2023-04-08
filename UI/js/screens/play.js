import * as me from 'https://esm.run/melonjs';
import UIContainer from "./../entities/UIContainer.js";
import {CheckBoxUI, ButtonUI} from "./../entities/buttons.js";
import game from "./../index.js";

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // clear the background
        me.game.world.addChild(new me.ColorLayer("background", "rgba(248, 194, 40, 1.0)"), 0);

        // add the UI elements
        var panel = new UIContainer(100, 100, 450, 325, "OPTIONS");

        // add a few checkbox
        panel.addChild(new CheckBoxUI(
            125, 75,
            game.texture,
            "green_boxCheckmark",
            "grey_boxCheckmark",
            "Music ON", // default
            "Music OFF"
        ));
        panel.addChild(new CheckBoxUI(
            125, 125,
            game.texture,
            "green_boxCheckmark",
            "grey_boxCheckmark",
            "Sound FX ON", // default
            "Sound FX OFF"
        ));

        // a few buttons
        panel.addChild(new ButtonUI(
            125, 175,
            "blue",
            "Video Options"
        ));
        panel.addChild(new ButtonUI(
            30, 250,
            "green",
            "Accept"
        ));
        panel.addChild(new ButtonUI(
            230, 250,
            "yellow",
            "Cancel"
        ));

        // add the panel to word (root) container
        me.game.world.addChild(panel, 1);

        // display the current pointer coordinates on top of the pointer arrow
        /*
        this.font = new me.Text(0, 0 ,{
            font: "Arial",
            size: 10,
            fillStyle: "white",
            textAlign: "center",
            textBaseline: "top",
            text: "(xxx, xxx)"
        });
        me.game.world.addChild(this.font, Infinity);

        // display the current pointer coordinates on top of the pointer arrow
        me.event.on(me.event.POINTERMOVE, (event) => {
            var x = Math.round(event.gameScreenX);
            var y = Math.round(event.gameScreenY);
            this.font.pos.set(x, y - this.font.height, this.font.pos.z);
            this.font.setText( "( " + x + "," + y + " )");
        });
        */
    }
};

export default PlayScreen;
