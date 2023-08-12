import * as me from 'melonjs';
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
        this.addChild(game.texture.createSpriteFromName(
            "grey_panel",
            { width : this.width, height : this.height},
            true
        ));

        this.addChild(new me.Text(this.width / 2, 16, {
            font: "kenpixel",
            size: 20,
            fillStyle: "black",
            textAlign: "center",
            textBaseline: "top",
            bold: true,
            text: label
        }));

        // input status flags
        this.isHoldable = true;

        // panel can be dragged
        this.isDraggable = true;
    }
};
export default UIContainer;
