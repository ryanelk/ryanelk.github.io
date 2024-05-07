import { Utils } from "./utils.js"
const PI2 = Math.PI * 2;

let cl = console.log

export class Card {
    constructor(obj) {
        cl("constructing")
        this.init(obj)
        this.render()
    }

    init(obj) {
        this.initProps(obj)
        this.initPos(obj)
        this.initHtml(obj)
    }

    initProps(obj) {
        this.closed = obj.closed
        this.project = obj.project
        this.ctx = obj.ctx
        this.openDuration = 400
        this.closeDuration = 400
        this.returnDuration = 400
        this.flipDuration = 400
        this.zero = document.timeline.currentTime
        this.rendering = false
    }

    initPos(obj) {
        // cl("initPos")
        this.x = obj.x
        this.y = obj.y
        this.w = (this.closed) ? obj.w : obj.w * 2
        this.h = obj.h
        this.openXDist = obj.w
        this.openXOffset = (this.closed) ? 0 : this.openXDist
        this.w_ = obj.w
        this.h_ = obj.h
    }

    initHtml(obj) {
        this.projectTitle = document.createElement("div")
        this.projectTitle.classList.add("project-title")
        this.projectTitle.id = "project-title"
        document.getElementById("polygon-div").appendChild(this.projectTitle)
        this.projectTitle.style.visibility= "hidden"
        this.projectTitle.style.fontSize = "1.7vh"
        this.projectTitle.innerHTML = obj.project.name

        this.projectDescription = document.createElement("div")
        this.projectDescription.classList.add("project-description")
        this.projectDescription.id = "project-description"
        document.getElementById("polygon-div").appendChild(this.projectDescription)
        this.projectDescription.style.visibility= "hidden"
        this.projectDescription.style.fontSize = "1.7vmin"
        this.projectDescription.innerHTML = obj.project.description

        this.projectExpand = document.createElement("span")
        this.projectExpand.classList.add("material-symbols-outlined")
        this.projectExpand.classList.add("disabled-canvas")
        this.projectExpand.style.position = "absolute"
        this.projectExpand.style.fontSize = "1.7vh"
        this.projectExpand.id = "project-expand"
        document.getElementById("polygon-div").appendChild(this.projectExpand)
        this.projectExpand.innerHTML = "expand_content"
        this.projectExpand.addEventListener('click', this.onExpand.bind(this), false)

        this.projectCollapse = document.createElement("span")
        this.projectCollapse.classList.add("material-symbols-outlined")
        this.projectCollapse.classList.add("disabled-canvas")
        this.projectCollapse.style.position = "absolute"
        this.projectCollapse.id = "project-collapse"
        document.getElementById("polygon-div").appendChild(this.projectCollapse)
        this.projectCollapse.innerHTML = "collapse_content"
        this.projectCollapse.addEventListener('click', this.onExpand.bind(this), false)

        this.projectLink = document.createElement("span")
        this.projectLink.classList.add("material-symbols-outlined")
        this.projectLink.classList.add("disabled-canvas")
        this.projectLink.style.position = "absolute"
        this.projectLink.style.fontSize = "1.7vh"
        this.projectLink.id = "project-link"
        document.getElementById("polygon-div").appendChild(this.projectLink)
        this.projectLink.innerHTML = "link"
        this.projectLink.addEventListener('click', this.onLink.bind(this), false)

        this.projectImg = document.createElement("img")
        this.projectImg.style.position = "absolute"
        this.projectImg.style.height = "20vmin"
        this.projectImg.id = "project-img"
        document.getElementById("polygon-div").appendChild(this.projectImg)
        // this.projectImg.src = obj.project.closedImg
    }

    // load info
    render() {
        if (!this.rendering) {
            console.log("rendering")
            this.rendering = true
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
            this.renderBackground()
            this.renderProject()
            // this.renderTest()
            this.rendering = false
        }
    }

    renderTest() {
        // console.log("render inner rect")
        this.ctx.save();
        this.ctx.beginPath();
        let w = 1
        let h = 1
        let x = this.x + (this.openXOffset/2)
        let y = this.y
        this.ctx.strokeStyle = "#010000"
        this.ctx.fillStyle = "#010000"
        this.ctx.rect(x, y, w, h)
        this.ctx.stroke()
        this.ctx.fill() 
        this.ctx.closePath();
        this.ctx.restore()
    }

    renderProjectImage() {
        // console.log("render project image")
        // this.projectImg.src = "/assets/images/dot.png"
            // let x = this.x - this.openXOffset/2
        this.projectImg.src = this.project.closedImg

        let x = this.x - this.projectImg.width/2 - this.openXOffset/2
        // let y = this.y + document.getElementById("site-header").clientHeight
        let y = this.y - this.projectImg.height/2 + document.getElementById("site-header").clientHeight + 18/2
        // cl([y, this.y, this.projectImg.height/2, document.getElementById("site-header").clientHeight,  18])

        this.projectImg.style.left = `${x}px`
        this.projectImg.style.top = `${y}px`
    }

    renderProjectTitle() {
        // this.ctx.strokeStyle = "#361D29"
        // this.ctx.fillStyle = "#361D29"
        // this.ctx.font = '48px Roboto-Regular';
        // this.ctx.textAlign = "center"
        // this.ctx.fillText('HELLO WORLD', this.x + this.openXOffset/2, this.y - this.h/4);

        if (!this.closed) {
            this.projectTitle.style.visibility= "visible"
            this.projectTitle.style.left = `${(this.x + this.w/4)}px`
            this.projectTitle.style.top = `${this.y - this.h/6}px`
            this.projectTitle.innerHTML = this.project.name
        } else {
            this.projectTitle.style.visibility= "hidden"
        }
    }

    renderProjectDescription() {
        // console.log("render project description")
        if (!this.closed) {
            this.projectDescription.style.visibility= "visible"
            this.projectDescription.style.width = `${this.w_/1.5}px`
            this.projectDescription.style.left = `${(this.x + this.w/4)}px`
            this.projectDescription.style.top = `${this.y - this.h/18}px`
            this.projectDescription.innerHTML = this.project.description
        } else {
            this.projectDescription.style.visibility= "hidden"
        }
    }

    renderProjectLink() {
        if (!this.closed) {
            let x = this.x + (this.w/2 - this.w/5) + this.openXOffset/5
            let y = this.y + (this.h/2 - this.h/26)

            this.projectLink.classList.remove("disabled-canvas")
            this.projectLink.style.left = `${x}px`
            this.projectLink.style.top = `${y}px`
        } else {
            if (!this.projectLink.classList.contains("disabled-canvas")) {
                this.projectLink.classList.add("disabled-canvas")
            }
        }

    }

    renderExpandBtn() {
        // console.log("render expand button")
        let x = this.x + (this.w/2 - this.w/12) + this.openXOffset/12
        let y = this.y + (this.h/2 + this.h/12)

        // use buttons
        if (this.closed) {
            if (!this.projectCollapse.classList.contains("disabled-canvas")) {
                this.projectCollapse.classList.add("disabled-canvas")
            }
            this.projectExpand.classList.remove("disabled-canvas")
            this.projectExpand.style.left = `${x}px`
            this.projectExpand.style.top = `${y}px`
        } else {
            if (!this.projectExpand.classList.contains("disabled-canvas")) {
                this.projectExpand.classList.add("disabled-canvas")
            }
            this.projectCollapse.classList.remove("disabled-canvas")
            this.projectCollapse.style.left = `${x}px`
            this.projectCollapse.style.top = `${y}px`
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

    onExpand(e) {
        this.animate("expand", 0, 0)
    }

    onLink(e) {
        window.open(this.project.link, "_blank").focus()
    }

    animate(action, mouseX, mouseY) {
        // prevent other animations from occurring if animating
        // console.log("animate")
        // console.log([action, mouseX, mouseY])
        switch (action) {
            case "expand":
                if (!this.animating) {
                    // console.log("expand")
                    this.animating = true
                    this.zero = document.timeline.currentTime
                    this.w_old = this.w
                    // use bound animation
                    if (this.closed) {
                        this.closed = !this.closed
                        requestAnimationFrame(this.openCard.bind(this))
                    } else {
                        this.closed = !this.closed
                        requestAnimationFrame(this.closeCard.bind(this))
                    }  
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
                // this.hover(mouseX, mouseY, this)
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
            // load next project if necessary
            this.h = Math.floor(Utils.lerp(0, this.h_old, Utils.mapRange(v, 0.5, 1, 0, 1), "easeout"))
            this.render()
            requestAnimationFrame((t) => this.flipVertical(t))
        } else {
            this.clearProject()
            console.log("animation done")
            this.h = Math.floor(Utils.lerp(0, this.h_old, 1, "easeout"))
            this.render()
            // animation done
            this.animating = false
        }
    }

    clearProject() {
        console.log(this.img)
        if (this.img) {
            this.img = null
        }
    }

    drag(x, y) {
        this.x -= x
        this.y -= y
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
