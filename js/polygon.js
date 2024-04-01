const PI2 = Math.PI * 2;

export class Polygon {
    constructor(x, y, xRadius, yRadius, sides, ctx) {
        this.x = x
        this.y = y
        this.xRadius = xRadius
        this.yRadius = yRadius
        this.sides = sides
        this.rotate = 0
        this.ctx = ctx

        this.render()
    }

    render() {
        console.log("rendering polygon")
        this.ctx.save();
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();

        const angle = PI2 / this.sides;

        this.ctx.translate(this.x, this.y);

        for (let i = 0; i < this.sides; i++) {
            const x = this.xRadius * Math.cos(angle * i);
            const y = this.yRadius * Math.sin(angle * i);
            (i == 0) ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y); 
        }

        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore()
    }

    animate(moveX) {
        this.ctx.save();
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();

        const angle = PI2 / this.sides;

        this.ctx.translate(this.x, this.y);

        for (let i = 0; i < this.sides; i++) {
            const x = this.xRadius * Math.cos(angle * i);
            const y = this.yRadius * Math.sin(angle * i);
            (i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); 
        }

        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore()
    }
}