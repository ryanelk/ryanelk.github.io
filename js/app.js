import { Card } from "./card.js"
import { Rectangle } from "./rectangle.js"
import { Utils } from "./utils.js"

let cl = console.log

class App {

    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.id = "polygon-canvas"
        document.getElementById("polygon-div").appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')

        this.isDown = false
        this.cardIdx = Utils.cards.length - 1

        // get header/footer elements
        this.volumeBtn = document.getElementById("volume-toggle")
        this.helpBtn = document.getElementById("help")
        this.backBtn = document.getElementById("arrow-back")
        this.forwardBtn = document.getElementById("arrow-forward")
        this.projectInfo = document.getElementById("project-info")

        // bio
        // this.initBio()
        
        // add font
        // let f = new FontFace('Roboto-Regular', 'url(../assets/fonts/Roboto-Regular.ttf)');
        // f.load().then((font) => {
        //     // Ready to use the font in a canvas context
        //     console.log('font ready');
        //     // Add font on the html page
        //     document.fonts.add(font);
        //     this.render()
        // });

        // disable/hide elements that shouldn't be active
        this.backBtn.classList.add("disabled")
        this.volumeBtn.classList.add("disabled")

        // add info
        this.projectInfo.innerHTML = Utils.cards[this.cardIdx].name

        window.addEventListener('resize', this.resize.bind(this), false);

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
        // cl([this.canvas.scrollWidth, this.canvas.scrollHeight, this.canvas.clientWidth, this.canvas.clientHeight, this.canvas.offsetWidth, this.canvas.offsetHeight])
        window.requestAnimationFrame(this.render.bind(this));
        this.render()
    }

    initBio() {
        // create html for bio
        this.projectTitle = document.createElement("div")
        this.projectTitle.classList.add("bio")
        this.projectTitle.id = "bio"
        document.getElementById("polygon-div").appendChild(this.projectTitle)
        this.projectTitle.innerHTML = Utils.bio
        // create button for enabling
    }

    resize() {
        cl("resizing")
        let canvasHeight = document.body.clientHeight - (document.getElementById("site-header").clientHeight + document.getElementById("site-footer").clientHeight)
        this.canvas.height = canvasHeight
        this.canvas.width = this.canvas.clientWidth

        let new_x = this.canvas.clientWidth / 2
        let new_y = this.canvas.clientHeight / 2
        let new_w = this.canvas.clientWidth / 4
        let new_h = this.canvas.clientHeight / 3
        if (this.centerCard && (this.center_card_x != new_x || this.center_card_y != new_y || this.center_card_w != new_w || this.center_card_h != new_h)) {
            console.log("rerendering card")
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

    render() { 
        // cl([this.canvas.scrollWidth, this.canvas.scrollHeight, this.canvas.clientWidth, this.canvas.clientHeight, this.canvas.offsetWidth, this.canvas.offsetHeight])
        // cl([this.canvas.height, canvasHeight, document.body.clientHeight, window.innerHeight])
        // this.canvas.height = this.canvas.scrollHeight
        // this.canvas.height = this.canvas.clientHeight
        let changed = false
        let canvasHeight = document.body.clientHeight - (document.getElementById("site-header").clientHeight + document.getElementById("site-footer").clientHeight)
        if (canvasHeight != this.canvas.height || this.canvas.width != this.canvas.clientWidth) {
            changed = true
        }
        this.canvas.height = canvasHeight
        this.canvas.width = this.canvas.clientWidth

        this.center_card_x = this.canvas.width / 2
        this.center_card_y = this.canvas.height / 2
        this.center_card_w = this.canvas.width / 4
        this.center_card_h = this.canvas.height / 3
        if (this.centerCard) {
            console.log("rerendering card")
            // rerender project info and arrows
            if (changed) {
                this.centerCard.initPos({
                    x: this.center_card_x,
                    y: this.center_card_y,
                    w: this.center_card_w,
                    h: this.center_card_h,
                })
            }
            this.centerCard.render()
        } else {
            console.log("creating new card")
            this.centerCard = new Card({
                x: this._x,
                y: this.center_card_y,
                w: this.center_card_w,
                h: this.center_card_h,
                project: Utils.cards[this.cardIdx],
                ctx: this.ctx,
                closed: true,
            })
            // change visibility of buttons?
        }
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
            this.centerCard.project = Utils.cards[this.cardIdx]
            this.projectInfo.innerHTML = Utils.cards[this.cardIdx].name
            console.log(this.centerCard.project)
            this.centerCard.animate("flipVertical", 0, 0)
        }
    }

    back() {
        if (!this.centerCard.animating && this.cardIdx < Utils.cards.length - 1) {
            this.cardIdx = Math.min(Utils.cards.length - 1, this.cardIdx + 1)
            this.checkDisabled()
            this.centerCard.project = Utils.cards[this.cardIdx]
            this.projectInfo.innerHTML = Utils.cards[this.cardIdx].name
            console.log(this.centerCard.project)
            this.centerCard.animate("flipVertical", 0, 0)
        }
    }

    onDown(e) {
        // set down in card?
        if (Utils.in_bounds(e.offsetX, e.offsetY, this.centerCard)) {
            // determine if this is an interaction or a drag
            this.isDown = true
            this.lastX = e.offsetX
            this.lastY = e.offsetY
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
            this.centerCard.animate("hover", e.offsetX, e.offsetY)
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
        this.centerCard.animate("expand", this.center_card_x, this.center_card_y)
        // this.render()
    }

    onExpand(e) {
        this.centerCard.animate("expand", 0, 0)
    }

    onBack(e) {
        this.back()
    }

    onForward(e) {
        this.forward()
    }

}

window.onload = () => {
    new App();
}