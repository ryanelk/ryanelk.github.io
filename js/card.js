import { Rectangle } from "./rectangle.js"
import { Button } from "./button.js"
import { Utils } from "./utils.js"
const PI2 = Math.PI * 2;

export class Card {
    constructor(x, y, w, h, project, ctx) {
        this.closed = true
        this.x = x
        this.y = y
        this.w = (this.closed) ? w : w * 2
        this.h = h
        this.project = project 
        this.ctx = ctx
        this.openDuration = 400
        this.closeDuration = 400
        this.returnDuration = 400
        this.flipDuration = 400
        this.zero = document.timeline.currentTime
        this.rendering = false
        this.openXDist = w
        this.openXOffset = (this.closed) ? 0 : this.openXDist

        this.w_ = w
        this.h_ = w

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
            if (this.w > this.img.width && this.h > this.img.height) {
            // console.log("openx: " + this.openXOffset/2)
                x = this.x - this.img.width/2 - this.openXOffset/2
                y = this.y - this.img.height/2 
                this.ctx.drawImage(this.img, x, y)
            }
        } else {
            this.img = new Image();
            // this.img.className = 'polygon-img'

            // when image is loaded, position relative to parent
            this.img.onload = () => {
                if (this.w > this.img.width && this.h > this.img.height) {
                    x = this.x - this.img.width/2  - this.openXOffset/2
                    y = this.y - this.img.height/2 
                    this.ctx.drawImage(this.img, x, y)
                }
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
        // this.ctx.fillText('HELLO WORLD', this.x + this.openXOffset/2, this.y - this.h/4);
    }

    renderProjectDescription() {
        // console.log("render project description")
        if (!this.closed) {
            // render project description
            // load font?
            // size and format font?
        }
    }

    renderProjectLink() {
        if (!this.closed) {
            let x = this.x + (this.w/2 - this.w/8) + this.openXOffset/8
            let y = this.y + (this.h/2 - this.h/8)
            if (this.projectLink) {
                // console.log([this.expandBtn.closed, this.closed])
                this.projectLink.x = x
                this.projectLink.y = y
                this.projectLink.render()
            } else {
                // console.log("making a new button")
                // console.log([this.expandBtn ? this.expandBtn.closed : "IDK", this.closed])
                this.projectLink = new Button(x, y, "link_", this.closed, "#C5B7B7", this.ctx) 
            }
        }

    }

    renderExpandBtn() {
        // console.log("render expand button")
        let x = this.x + (this.w/2 - this.w/26) + this.openXOffset/26
        let y = this.y + (this.h/2 - this.h/26)
        if (this.expandBtn && this.expandBtn.closed == this.closed) {
            // console.log([this.expandBtn.closed, this.closed])
            this.expandBtn.x = x
            this.expandBtn.y = y
            this.expandBtn.render()
        } else {
            // console.log("making a new button")
            // console.log([this.expandBtn ? this.expandBtn.closed : "IDK", this.closed])
            this.expandBtn = new Button(x, y, "expand_card_", this.closed, "#C5B7B7", this.ctx) 
        }
    }

    renderDragIndicator() {
        // console.log("render expand button")
        let x, y
        if (this.dragIndicator) {
            // console.log("openx: " + this.openXOffset/2)
            x = this.x - (this.w/2 - this.w/60) - this.openXOffset/60
            y = this.y - this.dragIndicator.height/2 
            this.ctx.drawImage(this.dragIndicator, x, y)
        } else {
            this.dragIndicator = new Image();
            // this.img.className = 'polygon-img'

            // when image is loaded, position relative to parent
            this.dragIndicator.onload = () => {
                x = this.x - (this.w/2 - this.w/60) - this.openXOffset/60
                y = this.y - this.dragIndicator.height/2 
                this.ctx.drawImage(this.dragIndicator, x, y)
            }
            // use path from given project
            this.dragIndicator.src = `../assets/images/drag_indicator.png`
        }
    }

    renderProject() {
        // console.log("render project")
        this.renderProjectImage()
        this.renderProjectTitle()
        this.renderProjectDescription()
        this.renderProjectLink()
        this.renderExpandBtn()
        this.renderDragIndicator()
    }

    renderShadow() {
        this.ctx.save();
        this.ctx.beginPath();
        let x = this.x - this.w/2
        let y = this.y - this.h/2
        this.ctx.strokeStyle = "#77787a"
        this.ctx.fillStyle = "#77787a"
        this.ctx.roundRect(x - 4, y + 4, this.w, this.h, 5)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore()
    }

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

    renderInnerRectangle2() {
        // console.log("render inner rect")
        this.ctx.save();
        this.ctx.beginPath();
        let w = this.w_ - this.w_/6
        let h = this.h - this.h/6
        let x = this.x - w/2 + (this.openXOffset/2)
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
        this.renderShadow()
        this.renderOuterRectangle()
        this.renderInnerRectangle()
        this.renderInnerRectangle2()
    }

    animate(action, mouseX, mouseY) {
        // prevent other animations from occurring if animating
        console.log("animate")
        console.log([action, mouseX, mouseY])
        switch (action) {
            case "expand":
                if (!this.animating) {
                    // console.log("expand")
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
                if (!this.animating && (this.x != mouseX && this.y != mouseY)) {
                    console.log("move")
                    this.animating = true
                    this.zero = document.timeline.currentTime

                    this.x_old = this.x
                    this.y_old = this.y
                    this.x_new = mouseX
                    this.y_new = mouseY
                    requestAnimationFrame(this.move.bind(this))
                }
                break
            case "flipVertical":
                console.log("flip vertical")
                if (!this.animating) {
                    this.animating = true
                    this.zero = document.timeline.currentTime
                    this.h_old = this.h
                    requestAnimationFrame(this.flipVertical.bind(this))
                }
                break
            case "hover":
                // console.log("hover")
                this.hover(mouseX, mouseY, this)
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
        this.closed = false
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
            this.animating = false
        }
    }

    // close animation
    closeCard(ts) {
        // console.log("close")
        // console.log([ts, this.zero, this.w_old])
        // determine interpolation style
        let v = (ts - this.zero) / this.closeDuration
        this.closed = true
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
            this.animating = false
        }
    }

    flipHorizontal(ts) {
        // reduce card and components to width 0
        // grow card and components to og width
    }

    flipVertical(ts) {
        let v = (ts - this.zero) / this.flipDuration
        // reduce card and components to width 0
        // need to perform in two stages
        if (v <= 0.5) {
            // set values with v
            this.h = Math.floor(Utils.lerp(this.h_old, 0, Utils.mapRange(v, 0, 0.5, 0, 1), "easeout"))
            this.render()
            requestAnimationFrame((t) => this.flipVertical(t))
        } else if (v < 1) {
            this.clearProject()
            // load next project if necessary
            this.h = Math.floor(Utils.lerp(0, this.h_old, Utils.mapRange(v, 0.5, 1, 0, 1), "easeout"))
            this.render()
            requestAnimationFrame((t) => this.flipVertical(t))
        } else {
            console.log("animation done")
            this.h = Math.floor(Utils.lerp(0, this.h_old, 1, "easeout"))
            this.render()
            // animation done
            this.animating = false
        }
    }

    clearProject() {
        if (this.img || this.projectLink) {
            this.img = null
            this.projectLink = null
        }
    }

    move(ts) {
        let v = (ts - this.zero) / this.returnDuration
        if (v < 1) {
            // set values with v
            this.x = Math.floor(Utils.lerp(this.x_old, this.x_old + (this.x_new - this.x_old), v, "easeoutx2"))
            this.y = Math.floor(Utils.lerp(this.y_old, this.y_old + (this.y_new - this.y_old), v, "easeoutx2"))
            this.render()
            requestAnimationFrame((t) => this.move(t))
        } else {
            console.log("animation done")
            this.x = Math.floor(Utils.lerp(this.x_old, this.x_old + (this.x_new - this.x_old), 1, "easeoutx2"))
            this.y = Math.floor(Utils.lerp(this.y_old, this.y_old + (this.y_new - this.y_old), 1, "easeoutx2"))
            this.render()
            // animation done
            this.animating = false
        }
    }

    hover(mouseX, mouseY) {
        // console.log("hover")
        if (Utils.in_bounds(mouseX, mouseY, this.expandBtn)) {
            this.expandBtn.hover()
        }
        // apply colors to transparent light rect?
    }
}
