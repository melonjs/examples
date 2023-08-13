import resources from './resources.js';
import * as me from 'melonjs';
import { TiledInflatePlugin } from 'tiled-inflate-plugin';

/**
 *
 * a basic Tiled loader
 */

export default function onload() {

        // init the video
        if (!me.video.init(1024, 786, {parent : "screen", scaleMethod : "flex"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.plugin.register(TiledInflatePlugin);

        // set all ressources to be loaded
        me.loader.preload(resources, ()=> {
            // subscribe to key down and mouse scroll event to move the map
            me.event.on(me.event.KEYDOWN, (e)=>{keyPressed(e);});
            me.input.registerPointerEvent("wheel", me.game.viewport, (e)=>{onScroll(e);});

            // load selected level on change event
            document.getElementById('level_name').addEventListener('change', ()=>{levelSelector();});

            // load default level
            levelSelector();
        });
};

/**
 * pointermove function
 */
function onScroll(event) {
    if (event.deltaX !== 0) {
        keyPressed(null, event.deltaX < 0 ? me.input.KEY.LEFT : me.input.KEY.RIGHT);
    }
    if (event.deltaY !== 0) {
        keyPressed(null, event.deltaY < 0 ? me.input.KEY.UP: me.input.KEY.DOWN);
    }
}

/**
 * update function
 */
function keyPressed(action, keyCode) {

    // navigate the map :)
    if (keyCode === me.input.KEY.LEFT) {
        me.game.viewport.move(-(me.level.getCurrentLevel().tilewidth / 2), 0);
    }
    if (keyCode === me.input.KEY.RIGHT) {
        me.game.viewport.move(me.level.getCurrentLevel().tilewidth / 2, 0);
    }
    if (keyCode === me.input.KEY.UP) {
        me.game.viewport.move(0, -(me.level.getCurrentLevel().tileheight / 2));
    }
    if (keyCode === me.input.KEY.DOWN) {
        me.game.viewport.move(0, me.level.getCurrentLevel().tileheight / 2);
    }

    // shake it
    if (keyCode === me.input.KEY.ENTER) {
        me.game.viewport.shake(16, 500);
    }

    //zoom in/out
    if (keyCode === me.input.KEY.MINUS) {
        console.log("zoom out");
    }
    if (keyCode === me.input.KEY.PLUS) {
        console.log("zoom in");
    }

    // force redraw
    me.game.repaint();
}

/**
 *
 * change the current level
 * using the listbox current value in the HTML file
 */
function levelSelector() {

    var level;

    switch (document.getElementById("level_name").value || 1) {
        case "1":
            level = "village";
            break;
        case "2":
            level = "desert";
            break;
        case "3":
            level = "sewers";
            break;
        case "4":
            level = "isometric";
            break;
        case "5":
            level = "orthogonal";
            break;
        case "6":
            level = "perspective";
            break;
        case "7":
            level = "hexagonal-mini";
            break;
        case "8":
            level = "rpg";
            break;
        case "9":
            level = "MagicLand";
            break;
        case "10":
            level = "jb-32";
            break;
        case "11":
            level = "gameart2d-desert";
            break;
        case "12":
            level = "level25";
            break;
        case "13":
            level = "island-rotated-tiles";
            break;
        case "14":
            level = "desert-infinite";
            break;
        case "15":
            level = "lunar";
            break;
        default:
            level = "village";
            break;
    };

    // load the new level
    me.level.load(level, {
        "container" : me.game.world,
        "onLoaded"  : ()=> {
            // set the background to black
            me.game.world.backgroundColor.setColor(0, 0, 0);
            // force redraw
            me.game.repaint();
        }
    });
}
