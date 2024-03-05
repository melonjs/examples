import * as me from "melonjs";
import { DebugPanelPlugin } from "debugPlugin";
import PlayScreen from './screens/play.js';


var resources = [
    { name : "paladin", type : "json", src : "data/paladin.json" },
    { name : "paladin", type : "image", src : "data/paladin.png" }
];

/* Game namespace */
var game = {

    // Run on page load.
    onload : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {parent : "screen", scale: "auto", scaleMethod : "fill"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // register the debug plugin
        me.plugin.register(DebugPanelPlugin,  "debugPanel");

        me.loader.setOptions({ withCredentials: true });

        // set all ressources to be loaded
        me.loader.preload(resources, () => {
            // load the texture atlas file
            this.texture = new me.TextureAtlas(
                me.loader.getJSON("paladin"),
                me.loader.getImage("paladin")
            );

            me.state.set(me.state.PLAY, new PlayScreen());

            // Start the game.
            me.state.change(me.state.PLAY);
        });
    }
};

export default game;
