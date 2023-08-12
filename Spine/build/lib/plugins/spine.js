import * as me from '../../dist/melonjs.module.js'
import game from '../../js/game.js'

var spineObject;

export default class Spine extends me.Renderable {
	// Spine
	lastFrameTime;
	canvas;
	context;
	skeleton;
	animationState;
	bounds;
	skeletonRenderer;

	constructor(x, y, settings) {
        spineObject = spineWebGL;
        if(me.video.renderer instanceof me.CanvasRenderer)
            spineObject = spine;

		if ((typeof settings.width !== "number") || (typeof settings.height !== "number")) {
            throw new Error("height and width properties are mandatory when passing settings parameters to an object entity");
        }

		super(x, y, settings.width, settings.height);

		this.children = [];

        if (settings.image) {
            // set the frame size to the given entity size, if not defined in settings
            settings.framewidth = settings.framewidth || settings.width;
            settings.frameheight = settings.frameheight || settings.height;
            this.renderable = new me.Sprite(0, 0, settings);
        }

        // Update anchorPoint
        if (settings.anchorPoint) {
            this.anchorPoint.setMuted(settings.anchorPoint.x, settings.anchorPoint.y);
        } else {
            // for backward compatibility
            this.anchorPoint.setMuted(0, 0);
        }

		// set the sprite name if specified
        if (typeof (settings.name) === "string") {
            this.name = settings.name;
        }

        // displaying order
        if (typeof settings.z !== "undefined") {
            this.pos.z = settings.z;
        }

		this.scaleValue = {x: 1, y: 1}
		this.type = settings.type || "";
		this.id = settings.id || "";
		this.alive = true;

		// initialize the default body
        if (typeof settings.shapes === "undefined") {
            settings.shapes = pool.pull("Polygon", 0, 0, [
                pool.pull("Vector2d", 0,          0),
                pool.pull("Vector2d", this.width, 0),
                pool.pull("Vector2d", this.width, this.height),
                pool.pull("Vector2d", 0,          this.height)
            ]);
        }
        this.body = new me.Body(this, settings.shapes, this.onBodyUpdate.bind(this));

		// set the  collision mask and type (if defined)
        this.body.setCollisionMask(settings.collisionMask);
        this.body.setCollisionType(settings.collisionType);

        // disable for entities
        this.autoTransform = false;

		// resize the entity if required
        if (this.width === 0 && this.height === 0) {
            this.resize(this.body.getBounds().width, this.body.getBounds().height);
        }

		// this.assetPath = settings.assetPath;
		this.jsonFile = settings.jsonFile;
		this.atlasFile = settings.atlasFile;

        this.lastFrameTime = me.timer.getTime();
		this.mixTime = settings.mixTime || 0.2;

		this.loadSpineAssets(this.atlasFile, this.jsonFile)
	}

	get renderable() {
        return this.children[0];
    }

    set renderable(value) {
        if (value instanceof me.Renderable) {
            this.children[0] = value;
            this.children[0].ancestor = this;
            this.updateBounds();
        } else {
            throw new Error(value + "should extend me.Renderable");
        }
    }

	loadSpineAssets(atlasFile, jsonFile) {
		// this.context = me.video.renderer.getContext("2d");
		// this.canvas =  document.getElementsByTagName("canvas")[0];

		// Setup Canvas
		this.canvas = me.video.renderer.canvas;
		if(me.video.renderer instanceof me.CanvasRenderer)
			this.context = this.canvas.getContext("2d");
		else {
			this.melonGL = me.video.renderer.getContextGL(this.canvas);
			this.context = new spineObject.ManagedWebGLRenderingContext(this.melonGL, {
                "alpha": false,
                "antialias": false,
                "depth": false,
                "stencil": true,
                "preserveDrawingBuffer": false,
                "premultipliedAlpha": false,
                "powerPreference": "default",
                "failIfMajorPerformanceCaveat": true
            });
			if (!this.context.gl) {
				alert('WebGL is unavailable.');
				return;
			}
			this.melonShader = me.video.renderer.currentCompositor.activeShader;

            if(me.video.renderer.currentCompositor.spineShader == undefined) {
                this.spineShader = me.video.renderer.currentCompositor.spineShader = new me.GLShader(this.melonGL, this.melonShader.vertex, this.melonShader.fragment);
            } else 
                this.spineShader = me.video.renderer.currentCompositor.spineShader;
			
            this.shader = spineObject.Shader.newTwoColoredTextured(this.context);
			this.batcher = new spineObject.PolygonBatcher(this.context);
			this.mvp = new spineObject.Matrix4().ortho2d(0, 0, this.canvas.width - 1, this.canvas.height - 1);;
		}
		this.skeletonRenderer = new spineObject.SkeletonRenderer(this.context);

		// Create the texture atlas and skeleton data.
		let atlas = game.assetManager.require(atlasFile);
		let atlasLoader = new spineObject.AtlasAttachmentLoader(atlas);
		let skeletonJson = new spineObject.SkeletonJson(atlasLoader);
		let skeletonData = skeletonJson.readSkeletonData(game.assetManager.require(jsonFile));

		// Instantiate a new skeleton based on the atlas and skeleton data.
		this.skeleton = new spineObject.Skeleton(skeletonData);
		this.skeleton.setToSetupPose();
		this.skeleton.updateWorldTransform();
		this.bounds = this.skeleton.getBoundsRect();

		// Setup an animation state with a default mix of 0.2 seconds.
		var animationStateData = new spineObject.AnimationStateData(this.skeleton.data);
		animationStateData.defaultMix = this.mixTime;
		this.animationState = new spineObject.AnimationState(animationStateData);
	}

    rotate(angle, v) {
        this.skeleton.getRootBone().rotation -= (angle / 0.0174533)
        super.rotate(angle, v)
    }

	scale(x, y) {
		this.scaleValue = {x, y: typeof(y) === "undefined" ? x : y}
		super.scale(x, y);
	}

	update (dt){
		if (this.renderable) {
            this.isDirty |= this.renderable.update(dt);
        }
        this.isDirty = true;
        return super.update(dt);
	}

	onBodyUpdate() {
        this.updateBounds();
    }

	/**
     * update the bounds when the body is modified
     * @ignore
     * @name onBodyUpdate
     * @memberof Entity
     * @param {Body} body - the body whose bounds to update
     */
    preDraw(renderer) {
        renderer.save();

        // translate to the entity position
        renderer.translate(
            this.pos.x + this.body.getBounds().x,
            this.pos.y + this.body.getBounds().y
        );

        if (this.renderable instanceof me.Renderable) {
            // draw the child renderable's anchorPoint at the entity's
            // anchor point.  the entity's anchor point is a scale from
            // body position to body width/height
            renderer.translate(
                this.anchorPoint.x * this.body.getBounds().width,
                this.anchorPoint.y * this.body.getBounds().height
            );
        }
    }

    /**
     * draw this entity (automatically called by melonJS)
     * @name draw
     * @memberof Entity
     * @protected
     * @param {CanvasRenderer|WebGLRenderer} renderer - a renderer instance
     * @param {Camera2d} [viewport] - the viewport to (re)draw
     */
    draw(renderer, viewport) {
        this.render(renderer);
		
        var renderable = this.renderable;
        if (renderable instanceof me.Renderable) {
            // predraw (apply transforms)
            renderable.preDraw(renderer);

            // draw the object
            renderable.draw(renderer, viewport);

            // postdraw (clean-up);
            renderable.postDraw(renderer);
        }
    }

    /**
     * Destroy function<br>
     * @ignore
     */
    destroy() {
        // free some property objects
        if (this.renderable) {
            this.renderable.destroy.apply(this.renderable, arguments);
            this.children.splice(0, 1);
        }

        // call the parent destroy method
        super.destroy(arguments);
    }

    /**
     * onDeactivateEvent Notification function<br>
     * Called by engine before deleting the object
     * @name onDeactivateEvent
     * @memberof Entity
     */
    onDeactivateEvent() {
        if (this.renderable && this.renderable.onDeactivateEvent) {
            this.renderable.onDeactivateEvent();
        }
    }

	render(renderer) {
		// Calculate the delta time between this and the last frame in seconds.
		var delta = (me.timer.getTime() - this.lastFrameTime) / 1000;
		this.lastFrameTime = me.timer.getTime();

		// Set the skeleton position in canvas.
		// this.skeleton.x = this.canvas.width / 2;
		// this.skeleton.y = this.canvas.height - this.canvas.height * 0.1;
		

		// this.context.clearRect(this.skeleton.x, this.skeleton.y, this.bounds.width, this.bounds.height);
        if(me.video.renderer instanceof me.CanvasRenderer) {
            this.skeleton.x = this.width / 2 - this.body.bounds.min.x;
		    this.skeleton.y = this.height - this.body.bounds.min.y;

            this.skeleton.scaleX = this.scaleValue.x;
		    this.skeleton.scaleY = -this.scaleValue.y;
        } else {
            this.skeleton.x = this.pos.x + this.width/2;
		    this.skeleton.y = this.canvas.height - (this.pos.y + this.height/2);

            this.skeleton.scaleX = this.scaleValue.x;
		    this.skeleton.scaleY = this.scaleValue.y;
        }

        this.updateBounds()

		// Update and apply the animation state, update the skeleton's
		// world transforms and render the skeleton.
		this.animationState.update(delta);
		this.animationState.apply(this.skeleton);
		this.skeleton.updateWorldTransform();

        if(me.video.renderer instanceof me.CanvasRenderer == false) {
            // change shader to temp shader (spineShader) & remove all texture
            me.video.renderer.currentCompositor.useShader(this.spineShader);
            for(var a = 0; a < renderer.currentCompositor.boundTextures.length; a++)
                renderer.currentCompositor.deleteTexture2D(renderer.currentCompositor.getTexture2D(a))

            // Bind the shader and set the texture and model-view-projection matrix.
            this.shader.bind();
            this.shader.setUniformi(spineObject.Shader.SAMPLER, 0);
            this.shader.setUniform4x4f(spineObject.Shader.MVP_MATRIX, this.mvp.values);

            // Start the batch and tell the SkeletonRenderer to render the active skeleton.
            this.batcher.begin(this.shader);

            // this.skeletonRenderer.premultipliedAlpha = true;
            this.skeletonRenderer.draw(this.batcher, this.skeleton);
            this.batcher.end();

            this.shader.unbind();

            // rebind melonjs buffer & shader
            renderer.currentCompositor.gl.bindBuffer(renderer.currentCompositor.gl.ARRAY_BUFFER, renderer.currentCompositor.gl.createBuffer());
            renderer.currentCompositor.gl.bufferData(renderer.currentCompositor.gl.ARRAY_BUFFER, renderer.currentCompositor.vertexBuffer.buffer, renderer.currentCompositor.gl.STREAM_DRAW);

            this.melonGL.enable(this.melonGL.BLEND);
            this.melonGL.blendFunc(this.melonGL.SRC_ALPHA, this.melonGL.ONE_MINUS_SRC_ALPHA);
            me.video.renderer.currentCompositor.useShader(this.melonShader);
        } else 
            this.skeletonRenderer.draw(this.skeleton);
	}

	/** Extra Function for Melon Editor */

	setAnimationByIndex(track_index, index, loop = false) {
		if (index < 0 || index >= this.skeleton.data.animations.length)
			return (console.log('Animation Index not found'))
		else
			this.animationState.setAnimation(track_index, this.skeleton.data.animations[index].name, loop);
	}

	setAnimation(track_index, name, loop = false) {
		this.animationState.setAnimation(track_index, name, loop);
	}

	addAnimationByIndex(track_index, index, loop = false, delay = 0){
		if (index < 0 || index >= this.skeleton.data.animations.length)
			return (console.log('Animation Index not found'))
		else
			this.animationState.addAnimation(track_index, this.skeleton.data.animations[index].name, loop, delay);
	}

	addAnimationByName(track_index, animationName, loop = false, delay = 0){
		this.animationState.addAnimation(track_index, animationName, loop, delay);
	}

	getSpinePosition() {
		return new me.Vector2d(this.pos.x, this.pos.y)
	}

	setSpineSize(width, height) {
		this.width = width;
		this.height = height;
	}

	getSpineSize() {
		return {
			width: this.width,
			height: this.height
		};
	}

	setDefaultMixTime(){
		this.animationState.data.defaultMix = mixTime;
	}

	setTransitionMixTime(firstAnimation, secondAnimation, mixTime){
		this.animationState.setMix(firstAnimation, secondAnimation, mixTime);
	}

	setSkinByName(skinName){
		this.skeleton.setSkinByName(skinName);
	}

	setToSetupPose(){
		this.skeleton.setToSetupPose();
	}

    updateBounds(absolute = true) {
        if(!this.anchorPoint || !this.skeleton) return;
        var bounds = this.getBounds();

        bounds.clear();
        bounds.addFrame(
            this.skeleton.getBoundsRect().x,
            this.skeleton.getBoundsRect().y,
            this.skeleton.getBoundsRect().width,
            this.skeleton.getBoundsRect().height,
        );

        if (this.body) {
            var bodybounds = this.body.shapes[0].getBounds();
            var bodybounds2 = this.body.getBounds();

            bodybounds.clear();
            bodybounds.addFrame(
                0,
                0,
                this.skeleton.getBoundsRect().width,
                this.skeleton.getBoundsRect().height,
            );

            bodybounds2.clear();
            bodybounds2.addFrame(
                0,
                0,
                this.skeleton.getBoundsRect().width,
                this.skeleton.getBoundsRect().height,
            );
        }

        if (absolute === true) {
            if(bounds.centerOn){
                bounds.centerOn(this.pos.x + bounds.x + bounds.width / 2,  this.pos.y + bounds.y + bounds.height / 2);
            }
            if (typeof this.ancestor !== "undefined" && typeof this.ancestor.addChild === "function" && this.floating !== true) {
                bounds.translate(this.ancestor.getAbsolutePosition());
            }
        }

        return bounds;
    }

	destroy() {
        pool.push(this.offset);
        this.offset = undefined;
        super.destroy();
    }
}