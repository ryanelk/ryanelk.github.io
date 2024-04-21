export class Button {
    constructor(x, y, id, closed, color, ctx) {
        this.x = x
        this.y = y
        this.id = id
        this.color = color
        this.ctx = ctx
        this.closed = closed

        this.render()
    }

    hover() {
        console.log("button hover")
        // tint button
    }

    render() {
        // console.log("rendering image button")
        if (this.img) {
            this.ctx.drawImage(this.img, this.x - this.img.width/2, this.y - this.img.height/2)
        } else {
            this.img = new Image();
            // this.img.className = 'polygon-img'
            
            // when image is loaded, position relative to parent
            this.img.onload = () => {
                this.ctx.drawImage(this.img, this.x - this.img.width/2, this.y - this.img.height/2)
                this.w = this.img.width/2
                this.h = this.img.height/2
            }
            // use button path
            this.img.src = `../assets/images/${this.id}${this.closed ? 0 : 1}.png`
        }
    }
}