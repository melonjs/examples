import * as me from 'https://esm.run/melonjs';

import resources from './resources.js';
import PlayScreen from './screens/play.js';


/* Game namespace */
var game = {
    // Run on page load.
    onload : function () {

        // Initialize the video.
        if (!me.video.init(640, 480, {parent : "screen", scaleMethod : "flex", renderer : me.video.CANVAS})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // initialize the Debug Panel
        import('./plugin/debug/debugPanel.js').then((plugin) => {
            // automatically register the debug panel
            me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel");
        });


        // configure base URLs
        me.loader.setBaseURL("image", "data/img/");
        me.loader.setBaseURL("json", "data/json/");
        me.loader.setBaseURL("audio", "data/audio/");

        // set all ressources to be loaded
        me.loader.preload(resources, this.loaded.bind(this));
    },


    /**
     * callback when everything is loaded
     */
    loaded: function () {

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
    }
};

export default game;
