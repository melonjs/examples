import * as me from "melonjs";
import { DebugPanelPlugin } from "debugPlugin";

import resources from "./resources.js";
import PlayScreen from "./screens/play.js";

/**
 *
 * Initialize the application
 */
export default function onload() {

    // Initialize the video.
    if (!me.video.init(640, 480, {parent : "screen", scaleMethod : "flex", renderer : me.video.AUTO})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }
    
    // register the debug plugin
    me.plugin.register(DebugPanelPlugin,  "debugPanel");

    // configure base URLs
    me.loader.setBaseURL("image", "data/img/");
    me.loader.setBaseURL("json", "data/json/");
    me.loader.setBaseURL("audio", "data/audio/");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set all ressources to be loaded
    me.loader.preload(resources, () => {

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
};

