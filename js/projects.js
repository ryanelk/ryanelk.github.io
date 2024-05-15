import { Card } from "./card.js"
import { Utils } from "./utils.js"
// import { Bio } from "./bio.js"
// import { Link } from "./link.js"

let cl = console.log

class App {

    constructor(mode) {
        cl(mode)
        this.mode = mode
        this.canvas = document.createElement('canvas')
        this.canvas.id = "projects-canvas"
        
        this.div = document.getElementById("projects-div")
        this.div.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')

        let rect = this.div.getBoundingClientRect()
        cl(rect)
        // canvas
        cl([document.getElementById("site-header").getBoundingClientRect(),document.getElementById("site-footer").getBoundingClientRect()])
        this.canvasHeight = rect.height - (document.getElementById("site-header").getBoundingClientRect().height + document.getElementById("site-footer").getBoundingClientRect().height)
        this.canvasWidth = rect.width
        cl([this.canvasHeight, this.canvasWidth])

        this.canvas.height = this.canvasHeight
        this.canvas.width = this.canvasWidth

        // get header/footer elements
        this.volumeBtn = document.getElementById("volume-toggle")
        this.helpBtn = document.getElementById("help")
        this.backBtn = document.getElementById("arrow-back")
        this.forwardBtn = document.getElementById("arrow-forward")
        this.projectInfo = document.getElementById("project-info")

        // use mode to init
        switch (mode) {
            case "landing":
                this.initLanding()
                break
            case "projects":
                this.initProjects()
                break
        }

        // add font
        // let f = new FontFace('Roboto-Regular', 'url(../assets/fonts/Roboto-Regular.ttf)');
        // f.load().then((font) => {
        //     // Ready to use the font in a canvas context
        //     console.log('font ready');
        //     // Add font on the html page
        //     document.fonts.add(font);
        //     this.render()
        // });
    }

    initLanding() {
        this.initBio()
        this.initLinks()

        this.renderLanding()
    }

    initProjects() {
        // init project variables
        this.isDown = false
        if (!this.cardIdx) this.cardIdx = Utils.cards.length - 1

        // disable/hide elements that shouldn't be active
        this.backBtn.classList.add("disabled")
        // this.volumeBtn.classList.add("disabled")

        // add info
        this.projectInfo.innerHTML = Utils.cards[this.cardIdx].name

        // add event listeners
        window.addEventListener('resize', this.resizeProjects.bind(this), false);
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
        document.addEventListener('keydown', (e) => {
            console.log(e.code)
            switch (e.code) {
                case 'ArrowUp':
                    // up arrow
                    break
                case 'ArrowDown':
                    // down arrow
                    break
                case 'ArrowLeft':
                    // left arrow
                    this.onBack()
                    break
                case 'ArrowRight':
                    // right arrow
                    this.onForward()
                    break
                case "Space":
                    this.onExpand()
                    break
            }
        })
        document.getElementById('arrow-back').addEventListener('click', this.onBack.bind(this), false);
        document.getElementById('project-info').addEventListener('click', this.onExpand.bind(this), false);
        document.getElementById('arrow-forward').addEventListener('click', this.onForward.bind(this), false);

        this.center_card_x = this.canvasWidth / 2
        this.center_card_y = this.canvasHeight / 2
        this.center_card_w = this.canvasWidth / 3.2
        this.center_card_h = this.canvasHeight / 2.4
        this.centerCard = new Card({
            x: this.center_card_x,
            y: this.center_card_y,
            w: this.center_card_w,
            h: this.center_card_h,
            project: Utils.cards[this.cardIdx],
            cardIdx: this.cardIdx,
            ctx: this.ctx,
            closed: false,
        })

        window.requestAnimationFrame(this.renderProjects.bind(this));
    }

    initBio() {
        // load bio circle
    }

    initLinks() {
        // load social links
    }

    resizeLanding() {
        if (this.mode != "landing") return
        cl("resizing")
        let canvasHeight = document.body.clientHeight - (document.getElementById("site-header").clientHeight + document.getElementById("site-footer").clientHeight)
        this.canvasHeight = canvasHeight
        this.canvasWidth = this.canvas.clientWidth

        let new_x = this.canvas.clientWidth / 2
        let new_y = this.canvas.clientHeight / 2
        let new_w = this.canvas.clientWidth / 2
        let new_h = this.canvas.clientHeight / 1.5
    }

    resizeProjects() {
        if (this.mode != "projects") return
        cl("resizing")
        let canvasHeight = document.body.clientHeight - (document.getElementById("site-header").clientHeight + document.getElementById("site-footer").clientHeight)
        this.canvasHeight = canvasHeight
        this.canvasWidth = this.canvas.clientWidth

        let new_x = this.canvasWidth / 2
        let new_y = this.canvasHeight / 2
        let new_w = this.canvasWidth / 2
        let new_h = this.canvasHeight / 1.5
        if (this.centerCard && (this.center_card_x != new_x || this.center_card_y != new_y || this.center_card_w != new_w || this.center_card_h != new_h)) {
            // console.log("rerendering card")
            // rerender project info and arrows
            this.center_card_x = new_x
            this.center_card_y = new_y
            this.center_card_w = new_w
            this.center_card_h = new_h
            this.centerCard.initPos({
                x: this.center_card_x,
                y: this.center_card_y,
                w: this.center_card_w,
                h: this.center_card_h,
            })
        }
    }

    renderLanding() { 
        // cl([this.canvas.scrollWidth, this.canvas.scrollHeight, this.canvas.clientWidth, this.canvas.clientHeight, this.canvas.offsetWidth, this.canvas.offsetHeight])
        // cl([this.canvas.height, canvasHeight, document.body.clientHeight, window.innerHeight])

        if (this.centerCard) {
            // console.log("rerendering card")
            // rerender project info and arrows
            this.centerCard.render()
        } else {
            console.log("creating new card")
            this.centerCard = new Card({
                x: this.center_card_x,
                y: this.center_card_y,
                w: this.center_card_w,
                h: this.center_card_h,
                project: Utils.cards[this.cardIdx],
                cardIdx: this.cardIdx,
                ctx: this.ctx,
                closed: false,
            })
            // change visibility of buttons?
        }
    }


    renderProjects() { 
        cl([this.canvasHeight, this.canvasWidth, document.body.clientHeight, window.innerHeight])
        this.centerCard?.render()
    }

    checkDisabled() {
        if (this.cardIdx == 0 && !this.forwardBtn.classList.contains("disabled")) {
            this.forwardBtn.classList.add("disabled")
        }
        if (this.cardIdx > 0 && this.forwardBtn.classList.contains("disabled")) {
            this.forwardBtn.classList.remove("disabled")
        }
        if (this.cardIdx == Utils.cards.length - 1 && !this.backBtn.classList.contains("disabled")) {
            this.backBtn.classList.add("disabled")
        }
        if (this.cardIdx < Utils.cards.length - 1 && this.backBtn.classList.contains("disabled")) {
            this.backBtn.classList.remove("disabled")
        }
    }

    forward() {
        if (!this.centerCard.animating && this.cardIdx > 0) {
            this.cardIdx = Math.max(0, this.cardIdx - 1)
            this.checkDisabled()
            this.centerCard.cardIdx = this.cardIdx
            this.projectInfo.innerHTML = Utils.cards[this.cardIdx].name
            this.centerCard.animate("flipVertical", 0, 0)
        }
    }

    back() {
        if (!this.centerCard.animating && this.cardIdx < Utils.cards.length - 1) {
            this.cardIdx = Math.min(Utils.cards.length - 1, this.cardIdx + 1)
            this.checkDisabled()
            this.centerCard.cardIdx = this.cardIdx
            this.projectInfo.innerHTML = Utils.cards[this.cardIdx].name
            this.centerCard.animate("flipVertical", 0, 0)
        }
    }

    onDown(e) {
        // set down in card?
        switch (this.mode) {
            case "projects":
                if (Utils.in_bounds(e.offsetX, e.offsetY, this.centerCard)) {
                    // determine if this is an interaction or a drag
                    this.isDown = true
                    this.lastX = e.offsetX
                    this.lastY = e.offsetY
                }
                break
        }
        
        // interactable button that intercepts input to open up card
        // otherwise begin drag
        // will use last movements to "eject" card from screen
        // card will "respawn" after short timeout
    }

    onMove(e) {
        // do hover/drag events
        switch (this.mode) {
            case "projects":
                if (this.isDown) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    let offsetX = this.lastX - e.offsetX
                    let offsetY = this.lastY - e.offsetY
                    this.centerCard.animate("drag", offsetX, offsetY)
                    this.lastX = e.offsetX
                    this.lastY = e.offsetY
                } else {
                    // tint/highlight/animate card on mouseover
                    this.centerCard.animate("hover", e.offsetX, e.offsetY)
                }
                this.renderProjects()
                break
        }
    }

    onUp(e) {
        switch (this.mode) {
            case "projects":
                this.isDown = false;
                // do "eject" if beyond a certain threshold/velocity?
                // else return to original position?
                this.centerCard.animate("move", this.center_card_x, this.center_card_y)
                break
        }
    }

    onExpand(e) {
        switch (this.mode) {
            case "projects":
                this.centerCard.animate("expand", 0, 0)
                break
        }
    }

    onBack(e) {
        switch (this.mode) {
            case "projects":
                this.back()
                break
        }
    }

    onForward(e) {
        switch (this.mode) {
            case "projects":
                this.forward()
                break
        }
    }

}

window.onload = () => {
    new App("projects");
}