import { Polygon } from "./polygon.js"


export class Card {
    constructor(x, y, xRadius, yRadius, project) {
        this.x = x
        this.y = y
        this.xRadius = xRadius
        this.yRadius = yRadius
        this.project = project 
        
        this.closed = true
        this.render()
    }

    // load info
    render() {
        this.renderBackground()
        this.renderProject()
    }

    renderProject() {
        if (this.closed) {
            // render image closed
            this.img = new Image();
            // this.img.className = 'polygon-img'

            // when image is loaded, position relative to parent
            this.img.onload = () => {
                this.ctx.drawImage(this.img, this.x - this.img.width / 2, y- this.img.height / 2)
            }
            // use path from given project
            this.img.src = '../assets/images/bean.png';
        } else {

        }
    }

    renderBackground() {
        if (this.closed) {
            // render smaller rectangle
            this.polygon = new Polygon(
                this.x,
                this.y,
                this.xRadius,
                this.yRadius,
                4,
            )
        } else {
            // render wider rectangle
            this.xRadius = this.xRadius * 2
            this.polygon = new Polygon(
                this.x,
                this.y,
                this.xRadius,
                this.yRadius,
                4,
            )
        }
        
    }

    animate(ctx, action, mouseX, mouseY) {
        switch (action) {
            case "close":
                console.log("close")
                if (!this.closed) {
                    this.close(ctx)
                }
                break
            case "open":
                console.log("open")
                if (this.closed) {
                    this.open(ctx)
                }
                break
            case "drag":
                console.log("drag")
                this.drag(ctx, mouseX, mouseY)
            default:
                // do mouse hover actions
                this.hover(ctx, mouseX, mouseY)
        }
    }

    // open animation
    open(ctx) {
        // interpolate values?
        this.closed = false
    }

    // close animation
    close(ctx) {
        // interpolate values?
        this.closed = true
    }

    drag(ctx, mouseX, mouseY) {
        // redefine base x and y
    }

    hover(ctx, mouseX, mouseY) {
        // apply colors to transparent light rect?
    }

    animate(ctx) {
        ctx.save();
        ctx.fillStyle = '#000000';
        ctx.beginPath();

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        this.rotate += moveX * 0.008;

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);
            (i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); 
        }

        ctx.fill();
        ctx.closePath();
        ctx.restore()
    }
}