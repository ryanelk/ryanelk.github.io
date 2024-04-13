const PI2 = Math.PI * 2;

export class Utils {

    static in_bounds(mouseX, mouseY, element=this) {
        let x = element.x - element.w/2
        let y = element.y - element.h/2
        console.log(["hello", mouseX, mouseY, [x, x+element.w], [y, y + element.h], element, mouseX > x, mouseX < (x + element.w), mouseY > y, mouseY < (y + element.h)])
        // check if mouse is within bounds of element (renders from center)
        
        return (mouseX > x && mouseX < (x + element.w)) && (mouseY > y && mouseY < (y + element.h))
    }

    static drag(offsetX, offsetY, element=this) {
        // console.log("drag")
        // redefine base x and y
        // do interpolation to make smoother?
        element.x -= offsetX
        element.y -= offsetY
    }

    static move(mouseX, mouseY, element=this) {
        // console.log("move")
        element.x = mouseX
        element.y = mouseY
    }

    static hover(mouseX, mouseY, element=this) {
        // console.log("hover")
        if (this.in_bounds(mouseX, mouseY, element)) {
            element.hover()
        }
        // apply colors to transparent light rect?
    }

    static flip(x) {
        return 1 - x
    }

    static square(x) {
        return x * x
    }

    static easein(t) {
        return this.square(t)
    }

    static easeout(t) {
        return this.flip(this.square(this.flip(t)))
    }

    static easeinx2(t) {
        return this.square(this.square(t))
    }

    static easeoutx2(t) {
        return this.flip(this.square(this.square(this.flip(t))))
    }

    static spike(t) {
        if (t <= .5) {
            return this.easein(t/.5)
        }
        return this.easein(this.flip(t)/.5)
    }

    static lerp(from, to, t, ease="linear") {
        switch (ease) {
            case "linear":
                break
            case "easein":
                t = this.easein(t)
                break
            case "easeout":
                t = this.easeout(t)
                break
            case "easeinx2":
                t = this.easein(t)
                break
            case "easeoutx2":
                t = this.easeout(t)
                break
            case "spike":
                t = this.spike(t)
        }
        // console.log(t)
        return from + (to - from) * t
    }
}
