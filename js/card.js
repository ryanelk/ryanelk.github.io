import { Polygon } from "./polygon.js"
const PI2 = Math.PI * 2;

export class Card {
    constructor(x, y, xRadius, yRadius, project, ctx) {
        console.log("creating card")
        console.log([x, y, xRadius, yRadius, project, ctx])
        this.x = x
        this.y = y
        this.xRadius = xRadius
        this.yRadius = yRadius
        this.project = project 
        this.ctx = ctx
        
        this.closed = true
        this.render()
    }

    // load info
    render() {
        console.log("rendering")
        this.renderBackground()
        this.renderProject()
    }

    renderProject() {
        console.log("render project")
        if (this.closed) {
            // render image closed
            this.img = new Image();
            // this.img.className = 'polygon-img'

            // when image is loaded, position relative to parent
            this.img.onload = () => {
                this.ctx.drawImage(this.img, this.x - this.img.width / 2, this.y - this.img.height / 2)
            }
            // use path from given project
            this.img.src = this.project.closedImg
        } else {

        }
    }

    renderBackground() {
        console.log("render background")
        if (this.closed) {
            // render smaller rectangle
            this.polygon = new Polygon(
                this.x,
                this.y,
                this.xRadius,
                this.yRadius,
                4,
                this.ctx,
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
                this.ctx,
            )
        }
        
    }

    animate(action, mouseX, mouseY) {
        console.log("animate")
        console.log([action, mouseX, mouseY])
        switch (action) {
            case "close":
                console.log("close")
                if (!this.closed) {
                    this.close()
                }
                break
            case "open":
                console.log("open")
                if (this.closed) {
                    this.open()
                }
                break
            case "drag":
                console.log("drag")
                this.drag(mouseX, mouseY)
            default:
                // do mouse hover actions
                this.hover(mouseX, mouseY)
        }
    }

    // open animation
    open() {
        console.log("open")
        // interpolate values?
        this.closed = false
    }

    // close animation
    close() {
        console.log("close")
        // interpolate values?
        this.closed = true
    }

    drag(mouseX, mouseY) {
        console.log("drag")
        // redefine base x and y
    }

    hover(mouseX, mouseY) {
        console.log("hover")
        // apply colors to transparent light rect?
    }
}