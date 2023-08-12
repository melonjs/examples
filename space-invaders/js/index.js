import * as me from 'https://esm.run/melonjs';

import PlayScreen from './stage/play.js';
import Laser from './renderables/laser.js';
import DataManifest from './manifest.js';

export default function onload() {

    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(800, 600, {parent : "screen", scale : "auto", scaleMethod: "flex-width"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the Debug Panel
    import('./plugin/debug-plugin.js').then((plugin) => {
        // automatically register the debug panel
        me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel");
    });


    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set and load all resources.
    me.loader.preload(DataManifest, function() {
        // set the user defined game stages
        me.state.set(me.state.PLAY, new PlayScreen());

        // add our laser entity in the entity pool
        me.pool.register("laser", Laser, true);

        // Start the game.
        me.state.change(me.state.PLAY);
    });
};
