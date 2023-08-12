import * as me from 'melonjs';
import UIContainer from "./../entities/UIContainer.js";
import { CheckBoxUI } from "../entities/CheckBoxUI.js";
import { ButtonUI } from "../entities/ButtonUI.js";
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

        var cbPanel = new me.UIBaseElement(125, 75, 100, 100);

        // add a few checkbox
        cbPanel.addChild(new CheckBoxUI(
            0, 0,
            game.texture,
            "green_boxCheckmark",
            "grey_boxCheckmark",
            "Music ON", // default
            "Music OFF"
        ));
        cbPanel.addChild(new CheckBoxUI(
            0, 50,
            game.texture,
            "green_boxCheckmark",
            "grey_boxCheckmark",
            "Sound FX ON", // default
            "Sound FX OFF"
        ));

        panel.addChild(cbPanel);

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
    }
};

export default PlayScreen;
