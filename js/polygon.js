const PI2 = Math.PI * 2;

export class Polygon {
    constructor(x, y, xRadius, yRadius, sides) {
        this.x = x;
        this.y = y;
        this.xRadius = radius;
        this.yRadius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    animate(ctx, moveX) {
        ctx.save();
        ctx.fillStyle = '#000000';
        ctx.beginPath();

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        this.rotate += moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.xRadius * Math.cos(angle * i);
            const y = this.yRadius * Math.sin(angle * i);
            (i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); 
        }

        ctx.fill();
        ctx.closePath();
        ctx.restore()
    }
}