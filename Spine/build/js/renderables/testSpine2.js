import * as me from '../../dist/melonjs.module.js'
import game from '../game.js'


// Put user code here //
 
//  End of user code  //

import Spine from '../../lib/plugins/spine.js'
import manifest from '../../manifest.js'

export default class testSpine2 extends Spine{
	constructor(x, y, settings = {}){
		settings.width = settings.width || 365.79;
		settings.height = settings.height || 391.51;
		settings.anchorPoint = {
			x: 0,
			y: 0
		};

		settings.jsonFile = manifest.find(file => file.name === "alien-ess.json").src;
		settings.atlasFile = manifest.find(file => file.name === "alien.atlas").src;
		settings.jsonFile = manifest.find(file => file.name === "alien-ess.json").src; 
		settings.atlasFile = manifest.find(file => file.name === "alien.atlas").src;


        // Put user code here //
        
        //  End of user code  //

		super(x, y, Object.assign(settings));

		this.alpha = 1;
		this.floating = false;
		this.alwaysUpdate = false;
		this.updateWhenPaused = false;
		this.isPersistent = false;
		this.anchorPoint.set(settings.anchorPoint.x, settings.anchorPoint.y);
		this.isKinematic = false;

		this.body = new me.Body(this);
		var bodyShapePos = {x: (this.anchorPoint.x * this.width), y:(this.anchorPoint.y * this.height)}
		this.body.addShape(me.pool.pull("me.Rect", 0 - bodyShapePos.y, 0 - bodyShapePos.y, this.width, this.height) );
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;
		this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
		this.body.gravityScale = 0;

		this._pointerDownHandler = me.input.registerPointerEvent("pointerdown", this, this.onClick.bind(this));
		this.var = {};

		this.setAnimation(0, "death", true);

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
        this.rotate(1.5707970000000002);
        
        //  End of user code  //
	}

    // Put user code here //
    
    //  End of user code  //
};

// Put user code here //
 
//  End of user code  //
