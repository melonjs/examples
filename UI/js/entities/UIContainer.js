import * as me from 'https://esm.run/melonjs';
import game from "./../index.js";

// a Panel type container
class UIContainer extends me.UIBaseElement {

    constructor(x, y, width, height, label) {
        // call the constructor
        super(x, y, width, height);

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "UIPanel";

        // back panel sprite
        this.panelSprite = game.texture.createSpriteFromName(
            "grey_panel",
            { width : this.width, height : this.height},
            true
        );
        this.addChild(this.panelSprite);

        this.font = new me.Text(0, 0 ,{
            font: "kenpixel",
            size: 20,
            fillStyle: "black",
            textAlign: "center",
            textBaseline: "top",
            bold: true
        });

        this.label = label;

        // input status flags
        this.isHoldable = true;

        // panel can be dragged
        this.isDraggable = true;
    }


    draw(renderer) {
        super.draw(renderer);
        this.font.draw(
            renderer,
            this.label,
            this.width / 2,
            16, // panel border
        );
    }
};
export default UIContainer;
