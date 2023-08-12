import * as me from 'melonjs';
import { DebugPanelPlugin } from "debugPlugin";
import PlayScreen from "./screens/play.js";
import resources from "./resources.js";

/* Game namespace */
var game = {
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(800, 600, {parent : "screen", scale : "auto", scaleMethod : "flex-width", renderer : me.video.AUTO})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // register the debug plugin
        me.plugin.register(DebugPanelPlugin,  "debugPanel");

        // set all ressources to be loaded
        me.loader.preload(resources, () => {
            // load the texture atlas file
            // this will be used by object entities later
            this.texture = new me.TextureAtlas([
                me.loader.getJSON("UI_Assets-0"),
                me.loader.getJSON("UI_Assets-1"),
                me.loader.getJSON("UI_Assets-2")
            ]);

            // set the "Play/Ingame" Screen Object
            me.state.set(me.state.PLAY, new PlayScreen());

            // add some keyboard shortcuts
            me.event.on(me.event.KEYDOWN, (action, keyCode /*, edge */) => {
                // toggle fullscreen on/off
                if (keyCode === me.input.KEY.F) {
                    if (!me.device.isFullscreen) {
                        me.device.requestFullscreen();
                    } else {
                        me.device.exitFullscreen();
                    }
                }
            });

            // switch to PLAY state
            me.state.change(me.state.PLAY);
        });
    }
};

export default game;
