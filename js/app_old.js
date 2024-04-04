import { Polygon } from "./rectangle.js"

class App {


    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.height  = this.canvas.offsetHeight;
        console.log(this.canvas.offsetHeight)
        this.canvas.id = "polygon-canvas"
        document.getElementById("polygon-div").appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        // console.log(window.devicePixelRatio)
        // this.pixelRatio = 1
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        this.stageHeight = document.getElementById("polygon-canvas").getBoundingClientRect().height
        console.log(this.canvas.offsetHeight)

        window.addEventListener('resize', this.resize.bind(this), false);
        
        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
        this.vertices = 4;
        this.maxVertices = 10;
        this.rotate = 0;

        // load image
        this.resize();
        
        this.img = new Image();
        // this.img.className = 'polygon-img'

        // when image is loaded, position
        this.img.onload = () => {
            this.ctx.drawImage(this.img, this.stageWidth / 2 - this.img.width / 2, this.stageHeight / 2 - this.img.height / 2)
        }
        // this.img.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png";
        this.img.src = '../assets/images/bean.png';


        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        // attach buttons
        document.getElementById('polygon-add').addEventListener('click', this.onAdd.bind(this), false);
        document.getElementById('polygon-remove').addEventListener('click', this.onRemove.bind(this), false);
        document.getElementById('polygon-replay').addEventListener('click', this.onReplay.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        console.log([document.getElementById("polygon-canvas").getBoundingClientRect()])
        // may need to redo clientHeight based on header and footer height
        console.log([this.stageWidth, this.stageHeight])
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight
        // this.canvas.height = this.stageHeight * this.pixelRatio;
        console.log([this.canvas.width, this.canvas.height])
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.stageHeight / 3,
            this.vertices,
        );

        if (this.img && this.img.complete) {
            this.ctx.drawImage(this.img, this.stageWidth / 2 - this.img.width / 2, this.stageHeight / 2 - this.img.height / 2)
        }

    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }

    onMove(e) {
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

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92;
        this.polygon.animate(this.ctx, this.moveX);

        this.ctx.save();
        
        this.ctx.translate(this.stageWidth / 2, this.stageHeight / 2);
        this.rotate += this.moveX * 0.008;
        this.ctx.rotate(this.rotate);
        this.ctx.translate(-this.stageWidth / 2, -this.stageHeight / 2);
        if (this.img && this.img.complete) {
            this.ctx.drawImage(this.img, this.stageWidth / 2 - this.img.width/2, this.stageHeight / 2 - this.img.height/2)
        }
        this.ctx.restore()
    }

}

window.onload = () => {
    new App();
}