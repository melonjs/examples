import * as me from '../../dist/melonjs.module.js'
import game from '../game.js'


// Put user code here //
 
//  End of user code  //

export default class testSprite extends me.Sprite {
	constructor(x, y, settings = {}) {
		settings.texture = "enemy";
		settings.image = game.textureMap.get(settings.texture);
		game.util.__populateAtlasIndices([
			"enemy00_walk_side_0","enemy00_walk_side_1","enemy00_walk_side_10",
			"enemy00_walk_side_11","enemy00_walk_side_2","enemy00_walk_side_3",
			"enemy00_walk_side_4","enemy00_walk_side_5","enemy00_walk_side_6",
			"enemy00_walk_side_7","enemy00_walk_side_8","enemy00_walk_side_9"
		], settings);
		settings.framewidth = settings.framewidth || 115;
		settings.frameheight = settings.frameheight || 117;
		settings.anchorPoint = {
			x: 0,
			y: 0.5
		};

        // Put user code here //
        
        //  End of user code  //

		super(x, y, Object.assign(settings));
		delete settings.image;
		this.alpha = 1;
		this.floating = false;
		this.alwaysUpdate = false;
		this.updateWhenPaused = false;
		this.isPersistent = false;

		this.addAnimation('Animation', [{ name: "enemy00_walk_side_0", delay: 100 },{ name: "enemy00_walk_side_1", delay: 100 },{ name: "enemy00_walk_side_10", delay: 100 },{ name: "enemy00_walk_side_11", delay: 100 },{ name: "enemy00_walk_side_2", delay: 100 },{ name: "enemy00_walk_side_3", delay: 100 },{ name: "enemy00_walk_side_4", delay: 100 },{ name: "enemy00_walk_side_5", delay: 100 },{ name: "enemy00_walk_side_6", delay: 100 },{ name: "enemy00_walk_side_7", delay: 100 },{ name: "enemy00_walk_side_8", delay: 100 },{ name: "enemy00_walk_side_9", delay: 100 }]);
		this.setCurrentAnimation('Animation');
		this.isKinematic = false;

		this.body = new me.Body(this);
		var bodyShapePos = {x: (this.anchorPoint.x * this.width), y:(this.anchorPoint.y * this.height)}
		this.body.addShape(me.pool.pull("me.Rect", 0 - bodyShapePos.y, 0 - bodyShapePos.y, this.width, this.height) );
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;
		this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
		this.body.gravityScale = 0;

		this._pointerDownHandler = me.input.registerPointerEvent("pointerdown", this, this.onClick.bind(this));
		this.var = {};

        // Put user code here //
        
        //  End of user code  //
	}

	update (dt){
		var drawNextFrame = super.update(dt);

		drawNextFrame = drawNextFrame || this.body.vel.x !== 0 || this.body.vel.y !== 0;
        // Put user code here //
        
        //  End of user code  //
		return drawNextFrame;
	}

	onCollision(response, other) {
		var isSolid = true;
        // Put user code here //
        
        //  End of user code  //
		return isSolid;
	}

	draw(renderer) {
		super.draw(renderer);
        // Put user code here //
        
        //  End of user code  //
	}

	onActivateEvent() {
        // Put user code here //
        
        //  End of user code  //
	}

	onDeactivateEvent() {

		me.input.releasePointerEvent("pointerdown", this, this._pointerDownHandler);
        // Put user code here //
        
        //  End of user code  //
	}

	onClick(pointer) {
        // Put user code here //
        this.rotate(1.5707970000000002, this.anchorPoint);

        //  End of user code  //
	}

    // Put user code here //
    
    //  End of user code  //
};

// Put user code here //
 
//  End of user code  //
