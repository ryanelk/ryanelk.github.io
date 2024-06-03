import { Utils } from "./utils.js"

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
        this.cardIdx = obj.cardIdx
        this.ctx = obj.ctx
        this.openDuration = 400
        this.closeDuration = 400
        this.returnDuration = 400
        this.flipDuration = 400
        this.zero = document.timeline.currentTime
        this.rendering = false
    }

    initPos(obj) {
        cl(obj)
        // cl("initPos")
        this.x = obj.x
        this.y = obj.y
        this.w = (this.closed) ? obj.w : obj.w * 2
        this.h = obj.h
        this.openXDist = obj.w
        this.openXOffset = (this.closed) ? 0 : this.openXDist
        this.w_ = obj.w
        this.h_ = obj.h
        this.htmlOffset = document.getElementById("projects-canvas").getBoundingClientRect().top
        cl(this.htmlOffset)
    }

    initHtml(obj) {
        this.projectTitle = document.createElement("div")
        this.projectTitle.classList.add("project-title")
        this.projectTitle.classList.add("font-outfit")
        this.projectTitle.id = "project-title"
        document.getElementById("projects-div").appendChild(this.projectTitle)
        this.projectTitle.style.visibility= "hidden"
        this.projectTitle.innerHTML = obj.project.name

        this.projectDescription = document.createElement("div")
        this.projectDescription.classList.add("project-description")
        this.projectDescription.classList.add("font-outfit")
        this.projectDescription.id = "project-description"
        document.getElementById("projects-div").appendChild(this.projectDescription)
        this.projectDescription.style.visibility= "hidden"
        this.projectDescription.innerHTML = obj.project.description

        this.projectExpand = document.createElement("span")
        this.projectExpand.classList.add("material-symbols-outlined")
        this.projectExpand.classList.add("clickable")
        this.projectExpand.classList.add("disabled-canvas")
        this.projectExpand.style.position = "absolute"
        this.projectExpand.id = "project-expand"
        document.getElementById("projects-div").appendChild(this.projectExpand)
        this.projectExpand.innerHTML = "expand_content"
        this.projectExpand.addEventListener('click', this.onExpand.bind(this), false)

        this.projectCollapse = document.createElement("span")
        this.projectCollapse.classList.add("material-symbols-outlined")
        this.projectCollapse.classList.add("clickable")
        this.projectCollapse.classList.add("disabled-canvas")
        this.projectCollapse.style.position = "absolute"
        this.projectCollapse.id = "project-collapse"
        document.getElementById("projects-div").appendChild(this.projectCollapse)
        this.projectCollapse.innerHTML = "collapse_content"
        this.projectCollapse.addEventListener('click', this.onExpand.bind(this), false)

        this.projectLink = document.createElement("span")
        this.projectLink.classList.add("material-symbols-outlined")
        this.projectLink.classList.add("clickable")
        this.projectLink.classList.add("disabled-canvas")
        this.projectLink.style.position = "absolute"
        this.projectLink.id = "project-link"
        document.getElementById("projects-div").appendChild(this.projectLink)
        this.projectLink.innerHTML = "link"
        this.projectLink.addEventListener('click', this.onLink.bind(this), false)

        this.projectDrag = document.createElement("span")
        this.projectDrag.classList.add("material-symbols-outlined")
        this.projectDrag.classList.add("grabbable")
        this.projectDrag.style.position = "absolute"
        this.projectDrag.id = "project-drag"
        document.getElementById("projects-div").appendChild(this.projectDrag)
        this.projectDrag.innerHTML = "drag_indicator"

        this.projectImg = document.createElement("img")
        this.projectImg.classList.add("project-img")
        this.projectImg.style.position = "absolute"
        this.projectImg.style.width = "30vmin"
        this.projectImg.style.height = "25vmin"
        this.projectImg.id = "project-img"
        document.getElementById("projects-div").appendChild(this.projectImg)
        // this.projectImg.src = obj.project.closedImg
    }

    // load info
    render() {
        if (!this.rendering) {
            // console.log("rendering")
            this.rendering = true
            this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
            this.renderBackground()
            this.renderProject()
            // this.renderTest()
            this.rendering = false
        }
    }

    renderTest() {
        // console.log("render inner rect")
        cl(["test", this.y])
        this.ctx.save();
        this.ctx.beginPath();
        let w = 2
        let h = 2
        let x = this.x - this.openXOffset/2
        let y = this.y
        this.ctx.strokeStyle = "#010000"
        this.ctx.fillStyle = "#010000"
        this.ctx.rect(x, y, w, h)
        this.ctx.stroke()
        this.ctx.fill() 
        this.ctx.closePath();
        this.ctx.restore()
    }

    renderProjectImg() {
        // console.log("render project image")
        // this.projectImg.src = "/assets/images/dot.png"
            // let x = this.x - this.openXOffset/2
        this.projectImg.src = this.project.closedImg
        this.projectImg.alt = this.project.name

        let x = this.x + this.projectImg.width/2 - this.openXOffset/2
        // let x = this.x - this.projectImg.width/2 - this.openXOffset/2
        // let y = this.y - this.htmlOffset
        let y = this.y + this.htmlOffset - this.projectImg.height/2 + this.h * .53
        cl([y, this.y, this.projectImg.height/2])
        if (x && y) {
            this.projectImg.style.left = `${x}px`
            this.projectImg.style.top = `${y}px`
        }
    }

    renderProjectTitle() {
        // this.ctx.strokeStyle = "#361D29"
        // this.ctx.fillStyle = "#361D29"
        // this.ctx.font = '48px Roboto-Regular';
        // this.ctx.textAlign = "center"
        // this.ctx.fillText('HELLO WORLD', this.x + this.openXOffset/2, this.y - this.h/4);
        let i_w = this.w_ - this.w_/6
        if (!this.closed) {
            this.projectTitle.style.visibility= "visible"
            this.projectTitle.style.left = `${(this.x + this.openXOffset/2 + this.w_/12 + i_w * .53)}px`
            this.projectTitle.style.top = `${this.y + this.htmlOffset + this.h * .20}px`
            this.projectTitle.innerHTML = this.project.name
        } else {
            this.projectTitle.style.visibility= "hidden"
        }
    }

    renderProjectDescription() {
        // console.log("render project description")
        let i_w = this.w_ - this.w_/6
        if (!this.closed) {
            this.projectDescription.style.visibility= "visible"
            this.projectDescription.style.width = `${this.w_/1.5}px`
            this.projectDescription.style.left = `${(this.x + this.openXOffset/2 + this.w_/12 + i_w * .53)}px`
            this.projectDescription.style.top = `${this.y + this.htmlOffset + this.h * .35}px`
            this.projectDescription.innerHTML = this.project.description
        } else {
            this.projectDescription.style.visibility= "hidden"
        }
    }

    renderProjectLink() {
        if (!this.closed) {
            // let x = this.x + (this.w/2 - this.w/5) + this.openXOffset/5
            // let y = this.y + (this.h/1.8 + this.htmlOffset)
            cl([this.x, this.y, this.projectLink.style.width/2, this.projectLink.style.height/2])
            let i_w = this.w_ - this.w_/6
            let x = this.x + this.openXOffset/2 + this.w_/12 + i_w * .9
            let y = this.y + this.htmlOffset + this.h * .88

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
        cl(["expand", this.y, this.htmlOffset, document.getElementById("projects-canvas").getBoundingClientRect().top])
        // let x = this.x + (this.w * .9)
        let i_w = this.w_ - this.w_/6
        let x = this.x + this.openXOffset/2 + this.w_/6 + i_w * .95
        // this.w_/12 + (i_w)
        let y = this.y + this.htmlOffset + this.h * .98
        // let y = (this.y + this.htmlOffset) + this.projectLink.getBoundingClientRect().height/2 + this.h / 2.8
        // cl([this.h, this.h/2.1, this.y, this.htmlOffset])

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

    renderProjectDrag() {
        let i_w = this.w_ - this.w_/6
        let x = this.x - this.openXOffset/2 + this.w_/6 * .17
        let y = this.y + this.htmlOffset + this.h * .5

        this.projectDrag.style.left = `${x}px`
        this.projectDrag.style.top = `${y}px`
    }

    renderDragIndicator() {
        // console.log("render expand button")
        let x, y
        if (this.dragIndicator) {
            // console.log("openx: " + this.openXOffset/2)
            x = this.x - this.openXOffset/2 + this.w * .01
            y = this.y + this.h/2 - this.dragIndicator.height/2
            this.ctx.drawImage(this.dragIndicator, x, y)
        } else {
            this.dragIndicator = new Image();
            // this.img.className = 'projects-img'

            // when image is loaded, position relative to parent
            this.dragIndicator.onload = () => {
                x = this.x - this.openXOffset/2 + this.w * .01
                y = this.y + this.h/2 - this.dragIndicator.height/2
                this.ctx.drawImage(this.dragIndicator, x, y)
            }
            // use path from given project
            this.dragIndicator.src = `../assets/images/drag_indicator.png`
        }
    }

    renderProject() {
        // console.log("render project")
        this.renderProjectImg()
        this.renderProjectTitle()
        this.renderProjectDescription()
        this.renderProjectLink()
        this.renderExpandBtn()
        this.renderProjectDrag()
        // this.renderDragIndicator()
    }

    renderShadow() {
        this.ctx.save();
        this.ctx.beginPath();
        let x = this.x - this.openXOffset/2
        let y = this.y
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
        let x = this.x - this.openXOffset/2
        let y = this.y
        this.ctx.strokeStyle = "#C5B7B7"
        this.ctx.fillStyle = "#C5B7B7"
        cl([this.x, this.y, this.w, this.h])
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
        let x = this.x - this.openXOffset/2 + this.w_/12
        let y = this.y + this.h/12
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
        let x = this.x + this.openXOffset/2 + this.w_/12
        let y = this.y + this.h/12
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
        let v = Math.min((ts - this.zero) / this.openDuration, 1)
        Utils.animateProperty(v, this, "w", this.w_old, this.w_old + this.openXDist, "easeinx2")
        Utils.animateProperty(v, this, "openXOffset", 0, this.openXDist, "easeinx2")
        Utils.animateProperty(v, this.projectTitle.style, "opacity", 0, 100, "easeinx2", "%")
        Utils.animateProperty(v, this.projectDescription.style, "opacity", 0, 100, "easeinx2", "%")
        Utils.animateProperty(v, this.projectLink.style, "opacity", 0, 100, "easeinx2", "%")
        this.render()
        if (v < 1) {
            requestAnimationFrame((t) => this.openCard(t))
        } else {
            this.animating = false
        }
    }

    // close animation
    closeCard(ts) {
        let v = Math.min((ts - this.zero) / this.closeDuration, 1)
        Utils.animateProperty(v, this, "w", this.w_old, this.w_old - this.openXDist, "easeoutx2")
        Utils.animateProperty(v, this, "openXOffset", this.openXDist, 0, "easeoutx2")
        Utils.animateProperty(v, this.projectTitle.style, "opacity", 100, 0, "easeoutx2", "%")
        Utils.animateProperty(v, this.projectDescription.style, "opacity", 100, 0, "easeoutx2", "%")
        Utils.animateProperty(v, this.projectLink.style, "opacity", 100, 0, "easeoutx2", "%")
        this.render()
        if (v < 1) {
            requestAnimationFrame((t) => this.closeCard(t))
        } else {
            this.animating = false
        }
    }

    flipHorizontal(ts) {
        // reduce card and components to width 0
        // grow card and components to og width
    }

    flipVertical(ts) {
        let v = Math.min((ts - this.zero) / this.flipDuration, 1)
        if (v <=  0.5) {
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this, "h", this.h_old, 0, "easeout")
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this.projectTitle.style, "opacity", 100, 0, "easeoutx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this.projectDescription.style, "opacity", 100, 0, "easeoutx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this.projectImg.style, "opacity", 100, 0, "easeoutx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this.projectLink.style, "opacity", 100, 0, "easeoutx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this.projectExpand.style, "opacity", 100, 0, "easeoutx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0, 0.5, 0, 1), this.projectCollapse.style, "opacity", 100, 0, "easeoutx2", "%")
        } else {
            // change project here and only set once!!!!
            if (this.project.name != Utils.cards[this.cardIdx].name) this.project = Utils.cards[this.cardIdx]
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this, "h", 0, this.h_old, "easein")
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this.projectTitle.style, "opacity", 0, 100, "easeinx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this.projectDescription.style, "opacity", 0, 100, "easeinx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this.projectImg.style, "opacity", 0, 100, "easeinx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this.projectLink.style, "opacity", 0, 100, "easeinx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this.projectExpand.style, "opacity", 0, 100, "easeinx2", "%")
            Utils.animateProperty(Utils.mapRange(v, 0.5, 1, 0, 1), this.projectCollapse.style, "opacity", 0, 100, "easeinx2", "%")
        }
        this.render()
        if (v < 1) {
            requestAnimationFrame((t) => this.flipVertical(t))
        } else {
            this.animating = false
        }
    }

    clearProject() {
        if (this.img) {
            this.img = null
        }
    }

    drag(x, y) {
        this.x -= x
        this.y -= y
    }

    move(ts) {
        let v = Math.min((ts - this.zero) / this.returnDuration, 1)
        Utils.animateProperty(v, this, "x", this.x_old, this.x_old + (this.x_new - this.x_old), "easeoutx2")
        Utils.animateProperty(v, this, "y", this.y_old, this.y_old + (this.y_new - this.y_old), "easeoutx2")
        this.render()
        if (v < 1) {
            requestAnimationFrame((t) => this.move(t))
        } else {
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
