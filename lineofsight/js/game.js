import * as me from 'https://esm.run/melonjs';

import PlayScreen from './screens/play.js';

/* Game namespace */
    // Run on page load.
export default function onload() {
    // Initialize the video.
    if (!me.video.init(800, 600, {parent : "screen", scale : "auto", renderer : me.video.CANVAS})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());

    // switch to PLAY state
    me.state.change(me.state.PLAY);
}
