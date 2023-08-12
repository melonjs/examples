import * as me from './dist/melonjs.module.js'

import game from './js/game.js'

import test from './js/stage/test.js'
import bg from './js/renderables/bg.js'
import testSpine2 from './js/renderables/testSpine2.js'
import testSprite from './js/renderables/testSprite.js'


import DataManifest from './manifest.js'

/**
 *
 * Initialize the application
 */
export default function onload() {
	// initialize the display canvas once the device/browser is ready
	if (!me.video.init(1920, 1280, {parent : "screen", renderer: me.video.CANVAS, scale : "auto", scaleMethod: "fit" , antiAlias: false, doubleBuffering: false, transparent: true, powerPreference: 'default'})) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}


	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// allow cross-origin for image/texture loading
	me.loader.crossOrigin = "anonymous";

	import('./lib/plugins/debugPanel.js').then((plugin) => {
		me.utils.function.defer(me.plugin.register, this, plugin.debugPanel, "debugPanel");
	});


	// set and load all resources.
	me.loader.preload(DataManifest, async function() {
		me.state.test = "test";
		me.state.set(me.state.test, new test());

		me.pool.register('bg', bg);
		me.pool.register('testSpine2', testSpine2);
		me.pool.register('testSprite', testSprite);

		game.textureMap = new Map();
		game.textureMap.set("CumiGoreng", new me.video.renderer.Texture([
			me.loader.getJSON("texture_CumiGoreng_0")
		], undefined, false));

		game.textureMap.set("enemy", new me.video.renderer.Texture([
			me.loader.getJSON("texture_enemy_0")
		], undefined, false));

		game.textureMap.set("image", new me.video.renderer.Texture([
			me.loader.getJSON("texture_image_0")
		], undefined, false));

		game.imageLocation = {
			"background": "image",
			"AHG001_back_attack_0": "CumiGoreng",
			"AHG001_back_attack_1": "CumiGoreng",
			"AHG001_back_attack_2": "CumiGoreng",
			"AHG001_back_attack_3": "CumiGoreng",
			"AHG001_back_attack_4": "CumiGoreng",
			"AHG001_back_dead_0": "CumiGoreng",
			"AHG001_back_dead_1": "CumiGoreng",
			"AHG001_back_dead_2": "CumiGoreng",
			"AHG001_back_recall_0": "CumiGoreng",
			"AHG001_back_recall_1": "CumiGoreng",
			"AHG001_back_run_0": "CumiGoreng",
			"AHG001_back_run_1": "CumiGoreng",
			"AHG001_back_run_2": "CumiGoreng",
			"AHG001_back_run_3": "CumiGoreng",
			"AHG001_back_run_4": "CumiGoreng",
			"AHG001_back_run_5": "CumiGoreng",
			"AHG001_back_run_6": "CumiGoreng",
			"AHG001_back_run_7": "CumiGoreng",
			"AHG001_back_run_8": "CumiGoreng",
			"enemy00_walk_side_0": "enemy",
			"enemy00_walk_side_1": "enemy",
			"enemy00_walk_side_10": "enemy",
			"enemy00_walk_side_11": "enemy",
			"enemy00_walk_side_2": "enemy",
			"enemy00_walk_side_3": "enemy",
			"enemy00_walk_side_4": "enemy",
			"enemy00_walk_side_5": "enemy",
			"enemy00_walk_side_6": "enemy",
			"enemy00_walk_side_7": "enemy",
			"enemy00_walk_side_8": "enemy",
			"enemy00_walk_side_9": "enemy",
			"im_2_03": "image",
			"play1": "image",
		};

		var spineObject = spineWebGL;
        if(me.video.renderer.type == "CANVAS")
            spineObject = spine;		game.assetManager = new spineObject.AssetManager()
		game.assetManager.loadBinary("data/spine/coin-pro.skel");
		game.assetManager.loadBinary("data/spine/dragon-ess.skel");
		game.assetManager.loadBinary("data/spine/goblins-pro.skel");
		game.assetManager.loadBinary("data/spine/mix-and-match-pro.skel");
		game.assetManager.loadBinary("data/spine/spineboy-pro.skel");
		game.assetManager.loadText("data/spine/alien-ess.json");
		game.assetManager.loadText("data/spine/coin-pro.json");
		game.assetManager.loadText("data/spine/dragon-ess.json");
		game.assetManager.loadText("data/spine/goblins-pro.json");
		game.assetManager.loadText("data/spine/mix-and-match-pro.json");
		game.assetManager.loadText("data/spine/spineboy-pro.json");
		game.assetManager.loadTextureAtlas("data/spine/alien.atlas");
		game.assetManager.loadTextureAtlas("data/spine/coin-pma.atlas");
		game.assetManager.loadTextureAtlas("data/spine/dragon-pma.atlas");
		game.assetManager.loadTextureAtlas("data/spine/goblins-pma.atlas");
		game.assetManager.loadTextureAtlas("data/spine/mix-and-match-pma.atlas");
		game.assetManager.loadTextureAtlas("data/spine/spineboy-pma.atlas");
		await game.assetManager.loadAll();


		game.util.__populateAtlasIndices = function(animationKeys, settings){
			let tpAtlas = [], indices = {},
				width = 0, height = 0,
				texture = game.textureMap.get(settings.texture);
			for (let i = 0; i < animationKeys.length; i++) {
				let region = texture.getRegion(animationKeys[i]);
				if (region == null) {
					// throw an error
					throw new me.video.renderer.Texture.Error(
						"Texture - region for " + animationKeys[i] + " not found");
				}
				tpAtlas[i] = region;
				indices[animationKeys[i]] = i;
				width = Math.max(region.width, width);
				height = Math.max(region.height, height);
			}
			settings.framewidth = width;
			settings.frameheight = height;
			settings.atlas = tpAtlas;
			settings.atlasIndices = indices;
		}
		me.pool.register('spriteTP', __spriteTP);
		me.state.change(me.state.test);
	});

};

class __spriteTP extends me.Sprite {
	constructor(x, y, settings = {}) {
		settings.image = (settings.texture) ? game.textureMap.get(settings.texture) : settings.region;
		(settings.texture) ? settings.region = settings.region : "";
		settings.anchorPoint = settings.anchorPoint || {
			x : 0.5,
			y : 0.5
		}
		super(x, y, Object.assign(settings));

		this.alpha = 1;
		this.floating = false;
		this.alwaysUpdate = false;
		this.updateWhenPaused = false;
		this.isPersistent = false;

		this.imageName = settings.region;

	}
};

