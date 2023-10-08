import * as me from "melonjs";
import { DebugPanelPlugin } from "debugPlugin";
import PlayScreen from './screens/play.js';


var resources = [
    { name : "cityscene", type : "json", src : "data/img/cityscene.json" },
    { name : "cityscene", type : "image", src : "data/img/cityscene.png" }
];

/* Game namespace */
var game = {

    // Run on page load.
    onload : function () {
        // Initialize the video.
        if (!me.video.init(800, 400, {parent : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // register the debug plugin
        me.plugin.register(DebugPanelPlugin,  "debugPanel");

        // set all ressources to be loaded
        me.loader.preload(resources, () => {
            // load the texture atlas file
            this.texture = new me.TextureAtlas(
                me.loader.getJSON("cityscene"),
                me.loader.getImage("cityscene")
            );

            me.state.set(me.state.PLAY, new PlayScreen());

            // Start the game.
            me.state.change(me.state.PLAY);
        });
    }
};

export default game;
