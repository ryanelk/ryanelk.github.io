import { Rectangle } from "./rectangle.js"
import { Button } from "./button.js"
import { Utils } from "./utils.js"
const PI2 = Math.PI * 2;

export class Card {
    constructor(x, y, w, h, project, ctx) {
        console.log("creating card")
        console.log([x, y, w, h, project, ctx])
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.project = project 
        this.ctx = ctx
        this.closed = true
        this.openDuration = 500
        this.closeDuration = 500
        this.returnDuration = 500
        this.zero = document.timeline.currentTime
        this.rendering = false
        this.openXDist = this.w
        this.openXOffset = (this.closed) ? 0 : openXDist

        this.w_ = w

        this.render()
    }

    // load info
    render() {
        // console.log("rendering")
        if (!this.rendering) {
            this.rendering = true
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
            this.renderBackground()
            this.renderProject()
            this.rendering = false
        }
    }

    renderProjectImage() {
        // console.log("render project image")
        let x
        let y

        // redraw image
        if (this.img) {
            console.log("openx: " + this.openXOffset/2)
            x = this.x - this.img.width/2 - this.openXOffset/2
            y = this.y - this.img.height/2 
            this.ctx.drawImage(this.img, x, y)
        } else {
            this.img = new Image();
            // this.img.className = 'polygon-img'

            // when image is loaded, position relative to parent
            this.img.onload = () => {
                x = this.x - this.img.width/2  - this.openXOffset/2
                y = this.y - this.img.height/2 
                this.ctx.drawImage(this.img, x, y)
            }
            // use path from given project
            this.img.src = this.project.closedImg
        }
    }

    renderProjectTitle() {
        this.ctx.strokeStyle = "#361D29"
        this.ctx.fillStyle = "#361D29"
        this.ctx.font = '48px Roboto-Regular';
        this.ctx.textAlign = "center"
        this.ctx.fillText('HELLO WORLD', this.x + this.openXOffset/2, this.y - this.h/4);
    }

    renderProjectDescription() {
        // console.log("render project description")
        if (!this.closed) {
            // render project description
            // load font?
            // size and format font?
        }
    }

    renderToggleBtn() {
        // console.log("render toggle button")
        let x = this.x + (this.w/2 - this.w/6)
        let y = this.y + (this.h/2 - this.h/6)
        if (this.toggleBtn) {
            this.toggleBtn.x = x
            this.toggleBtn.y = y
            this.toggleBtn.render()
        } else {
            this.toggleBtn = new Button(x, y, "../assets/images/button.png",  "#C5B7B7", this.ctx) 
        }
    }

    renderProject() {
        // console.log("render project")
        this.renderProjectImage()
        this.renderProjectTitle()
        this.renderProjectDescription()
        this.renderToggleBtn()
    }

    // renderOuterRectangle() {
    //     // console.log("render outer rect")
    //     let w = this.w
    //     if (this.outerRectangle) {
    //         this.outerRectangle.x = this.x
    //         this.outerRectangle.y = this.y
    //         this.outerRectangle.w = w
    //         this.outerRectangle.render()
    //     } else {
    //         this.outerRectangle = new Rectangle(
    //             this.x,
    //             this.y,
    //             w,
    //             this.h,
    //             "#C5B7B7",
    //             this.ctx,
    //         )
    //     }
    // }

    renderOuterRectangle() {
        // console.log("render outer rect")
        this.ctx.save();
        this.ctx.beginPath();
        let x = this.x - this.w/2
        let y = this.y - this.h/2
        this.ctx.strokeStyle = "#C5B7B7"
        this.ctx.fillStyle = "#C5B7B7"
        this.ctx.roundRect(x, y, this.w, this.h, 5)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore()
    }

    renderInnerRectangle() {
        // console.log("render inner rect")
        this.ctx.save();
        this.ctx.beginPath();
        let w = this.w_ - this.w_/6
        let h = this.h - this.h/6
        let x = this.x - (w/2 + this.openXOffset/2)
        let y = this.y - h/2
        this.ctx.strokeStyle = "#FFFFFF"
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.roundRect(x, y, w, h, 5)
        this.ctx.stroke()
        this.ctx.fill() 
        this.ctx.closePath();
        this.ctx.restore()
    }

    renderBackground() {
        // console.log("render background")
        this.renderOuterRectangle()
        this.renderInnerRectangle()
    }

    animate(action, mouseX, mouseY) {
        // prevent other animations from occurring if animating
        // console.log("animate")
        // console.log([action, mouseX, mouseY])
        switch (action) {
            case "toggle":
                if (!this.animating) {
                    // console.log("toggle")
                    this.animating = true
                    this.zero = document.timeline.currentTime
                    this.w_old = this.w
                    // use bound animation
                    this.closed ? requestAnimationFrame(this.openCard.bind(this)) : requestAnimationFrame(this.closeCard.bind(this))
                }
                break
            case "drag":
                // console.log("drag")
                Utils.drag(mouseX, mouseY, this)
                break
            case "move":
                // console.log("move")
                if (!this.animating) {
                    this.animating = true
                    this.zero = document.timeline.currentTime

                    this.x_old = this.x
                    this.y_old = this.y
                    this.x_new = mouseX
                    this.y_new = mouseY
                    requestAnimationFrame(this.move.bind(this))
                }
                break
            case "hover":
                // console.log("hover")
                Utils.hover(mouseX, mouseY, this)
                break
            case "exit":
                // move to offscreen point?
                break
            case "enter":
                // move to center point
                
                break
        }
    }

    in_bounds(mouseX, mouseY, element=this) {
        let x = element.x - element.w/2
        let y = element.y - element.h/2
        console.log([mouseX, mouseY, element, mouseX > x && mouseX < (x + element.w), (mouseY > y && mouseY < (y + element.h))])
        // check if mouse is within bounds of element (renders from center)
        
        return (mouseX > x && mouseX < (x + element.w)) && (mouseY > y && mouseY < (y + element.h))
    }

    // open animation
    openCard(ts) {
        // console.log("open")
        // console.log([ts, this.zero, this.w_old])
        // determine interpolation style
        let v = (ts - this.zero) / this.openDuration
        // interpolate values from 0-1
        if (v < 1) {
            // set values with v
            this.w = Math.floor(Utils.lerp(this.w_old, this.w_old + this.openXDist, v, "easein"))
            // move other elements
            this.openXOffset = Math.floor(Utils.lerp(0, this.openXDist, v, "easeinx2"))
            this.render()
            requestAnimationFrame((t) => this.openCard(t))
        } else {
            console.log("animation done")
            this.w = Math.floor(Utils.lerp(this.w_old, this.w_old + this.openXDist, 1, "easein"))
            this.openXOffset = Math.floor(Utils.lerp(0, this.openXDist, 1, "easeinx2"))
            this.render()
            // animation done
            this.closed = false
            this.animating = false
        }
    }

    // close animation
    closeCard(ts) {
        // console.log("close")
        // console.log([ts, this.zero, this.w_old])
        // determine interpolation style
        let v = (ts - this.zero) / this.closeDuration
        // interpolate values from 0-1
        if (v < 1) {
            // set values with v
            this.w = Math.floor(Utils.lerp(this.w_old, this.w_old - this.openXDist, v, "easeout"))
            this.openXOffset = Math.floor(Utils.lerp(this.openXDist, 0, v, "easeoutx2"))
            this.render()
            requestAnimationFrame((t) => this.closeCard(t))
        } else {
            console.log("animation done")
            this.w = Math.floor(Utils.lerp(this.w_old, this.w_old - this.openXDist, 1, "easeout"))
            this.openXOffset = Math.floor(Utils.lerp(this.openXDist, 0, 1, "easeoutx2"))
            this.render()
            // animation done
            this.closed = true
            this.animating = false
        }
    }

    move(ts) {
        let v = (ts - this.zero) / this.returnDuration
        if (v < 1) {
            // set values with v
            this.x = Math.floor(Utils.lerp(this.x_old, this.x_old + (this.x_new - this.x_old), v, "easeout"))
            this.y = Math.floor(Utils.lerp(this.y_old, this.y_old + (this.y_new - this.y_old), v, "easeout"))
            this.render()
            requestAnimationFrame((t) => this.move(t))
        } else {
            console.log("animation done")
            this.x = Math.floor(Utils.lerp(this.x_old, this.x_old + (this.x_new - this.x_old), 1, "easeout"))
            this.y = Math.floor(Utils.lerp(this.y_old, this.y_old + (this.y_new - this.y_old), 1, "easeout"))
            this.render()
            // animation done
            this.animating = false
        }
    }

    hover(mouseX, mouseY) {
        // console.log("hover")
        if (Utils.in_bounds(mouseX, mouseY, this.toggleBtn)) {
            this.toggleBtn.hover()
        }
        // apply colors to transparent light rect?
    }
}
