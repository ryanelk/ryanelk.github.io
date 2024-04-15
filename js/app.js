import { Card } from "./card.js"
import { Rectangle } from "./rectangle.js"
import { Utils } from "./utils.js"


class App {

    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.height  = this.canvas.offsetHeight;
        this.canvas.id = "polygon-canvas"
        document.getElementById("polygon-div").appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.stageHeight = document.getElementById("polygon-canvas").getBoundingClientRect().height
        this.stageWidth = document.body.clientWidth;

        window.addEventListener('resize', this.render.bind(this), false);
        
        this.isDown = false;

        // center card
        this.center_card_x = this.stageWidth / 2
        this.center_card_y = this.stageHeight / 2
        this.center_card_w = this.stageWidth / 4
        this.center_card_h = this.stageHeight / 3
        
        // add font
        let f = new FontFace('Roboto-Regular', 'url(../assets/fonts/Roboto-Regular.ttf)');
        f.load().then((font) => {
            // Ready to use the font in a canvas context
            console.log('font ready');
            // Add font on the html page
            document.fonts.add(font);
            this.render()
        });

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        document.getElementById('polygon-replay').addEventListener('click', this.onReplay.bind(this), false);
        document.getElementById('polygon-add').addEventListener('click', this.onOpen.bind(this), false);
        document.getElementById('polygon-remove').addEventListener('click', this.onClose.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
        
        this.render();
    }

    render() { 
        this.canvas.width = this.stageWidth
        this.canvas.height = this.stageHeight

        // re-render center card
        if (this.centerCard) {
            // console.log("rerendering card")
            this.centerCard.render()
        } else {
            // console.log("creating new card")
            this.centerCard = new Card(
                this.center_card_x,
                this.center_card_y,
                this.center_card_w,
                this.center_card_h,
                {
                    name: "Test Project",
                    closedImg: '../assets/images/bean.png',
                },
                this.ctx,
            )
        }
    }

    onDown(e) {
        // set down in card?
        if (Utils.in_bounds(e.offsetX, e.offsetY, this.centerCard)) {
            // determine if this is an interaction or a drag
            if (Utils.in_bounds(e.offsetX, e.offsetY, this.centerCard.toggleBtn)) {
                this.centerCard.animate("toggle", e.offsetX, e.offsetY)
            } else {
                this.isDown = true
                this.lastX = e.offsetX
                this.lastY = e.offsetY
            }
        }
        // interactable button that intercepts input to open up card
        // otherwise begin drag
        // will use last movements to "eject" card from screen
        // card will "respawn" after short timeout
    }

    onMove(e) {
        // do hover/drag events
        if (this.isDown) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            let offsetX = this.lastX - e.offsetX
            let offsetY = this.lastY - e.offsetY
            this.centerCard.animate("drag", offsetX, offsetY)
            this.lastX = e.offsetX
            this.lastY = e.offsetY
        } else {
            // tint/highlight/animate card on mouseover
            // this.centerCard.animate("hover", e.offsetX, e.offsetY)
        }
        this.render()
    }

    onUp(e) {
        this.isDown = false;
        // do "eject" if beyond a certain threshold/velocity?
        // else return to original position?
        this.centerCard.animate("move", this.center_card_x, this.center_card_y)
    }

    onReplay(e) {
         // center card
        this.centerCard.animate("toggle", this.center_card_x, this.center_card_y)
        // this.render()
    }

    onOpen(e) {
        this.centerCard.animate("toggle", this.center_card_x, this.center_card_y)
    }

    onClose(e) {
        this.centerCard.animate("toggle", this.center_card_x, this.center_card_y)
    }
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
    }

}

window.onload = () => {
    new App();
}