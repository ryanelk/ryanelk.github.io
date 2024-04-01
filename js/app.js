import { Card } from "./card.js"

class App {


    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.height  = this.canvas.offsetHeight;
        console.log(this.canvas.offsetHeight)
        this.canvas.id = "polygon-canvas"
        document.getElementById("polygon-div").appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        // console.log(window.devicePixelRatio)
        // this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        this.stageHeight = document.getElementById("polygon-canvas").getBoundingClientRect().height
        console.log(this.canvas.offsetHeight)

        window.addEventListener('resize', this.resize.bind(this), false);
        
        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
        this.vertices = 4;
        this.maxVertices = 4;
        this.rotate = 0;
        
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        // load image
        this.resize();
        
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        console.log([document.getElementById("polygon-canvas").getBoundingClientRect()])
        // may need to redo clientHeight based on header and footer height
        console.log([this.stageWidth, this.stageHeight])
        this.canvas.width = this.stageWidth;
        // this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight
        // this.canvas.height = this.stageHeight * this.pixelRatio;
        console.log([this.canvas.width, this.canvas.height])
        // this.ctx.scale(this.pixelRatio, this.pixelRatio);

        // instantiate center card
        this.card = new Card(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.stageHeight / 3,
            this.stageHeight / 4,
            {
                name: "Test Project",
                closedImg: '../assets/images/bean.png',
            },
            this.ctx,
        )
    }

    onDown(e) {
        // set
        this.isDown = true;
        this.offsetX = e.clientX;
    }

    onMove(e) {
        // do hover/drag events
        if (this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }

    onUp(e) {
        this.isDown = false;
    }

    onAdd(e) {
        this.vertices = Math.min(this.vertices + 1, this.maxVertices) 
        this.resize()
    }

    onRemove(e) {
        this.vertices = Math.max(this.vertices - 1, 3)
        this.resize()
    }

    onReplay(e) {
        this.resize()
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        // this.ctx.save();
        // do actions to canvas
        // this.ctx.restore()
    }

}

window.onload = () => {
    new App();
}