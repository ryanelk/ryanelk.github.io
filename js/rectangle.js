const PI2 = Math.PI * 2;

export class Rectangle {
    constructor(x, y, w, h, color, ctx) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
        this.rotate = 0
        this.ctx = ctx

        this.render()
    }

    render() {
        // console.log("rendering rectangle width: " + this.w )
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();


        // this.ctx.translate(this.x, this.y);
        // center
        // this.ctx.moveTo(this.x, this.y)
        // top left
        this.ctx.moveTo(Math.floor(this.x - this.w/2), Math.floor(this.y - this.h/2))
        // top right
        this.ctx.lineTo(Math.floor(this.x + this.w/2), Math.floor(this.y - this.h/2))
        // bottom right
        this.ctx.lineTo(Math.floor(this.x + this.w/2), Math.floor(this.y + this.h/2))
        // bottom left
        this.ctx.lineTo(Math.floor(this.x - this.w/2), Math.floor(this.y + this.h/2))


        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore()
    }
}