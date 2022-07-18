import * as me from 'https://esm.run/melonjs@13';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // background sprite
        var bg_sprite = new me.Sprite(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2, {
                image : "background",
                anchorPoint : {x:0.5, y:0.5}
        });
        bg_sprite.scale(2);

        // add to the game world
        me.game.world.addChild(bg_sprite);

        // stage light system
        var whiteLight = new me.Light2d(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            200,
            140,
            "#fff",
            0.7
        );

        // darker ambient light
        this.ambientLight.parseCSS("#1117");
        // spot light
        this.lights.set("whiteLight", whiteLight);

        // light follow the mouse
        me.input.registerPointerEvent("pointermove", me.game.viewport, (event) => {
            whiteLight.centerOn(event.gameX, event.gameY);
        });
    }
};

/**
 *
 * Initialize the application
 */
export default function onload() {

    // Initialize the video.
    if (!me.video.init(728, 410, {parent : "screen", scaleMethod : "flex", renderer : me.video.WEBGL})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());

    me.loader.preload([{
        name   : "background",
        type   : "image",
        src    : "data/pixel-art-16-bit-sega-streets-of-rage-city-wallpaper.jpg",
    }],
        () => {
            me.state.change(me.state.PLAY);
        }
    );
}
