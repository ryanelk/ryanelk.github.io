const PI2 = Math.PI * 2;
let cl = console.log

export class Utils {

    static in_bounds(mouseX, mouseY, element=this) {
        cl(element)
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
        element.render()
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

    static animateProperty(ts, element, property, duration, interpolation) {

    }

    static mapRange(v, start_0, end_0, start_1, end_1) {
        return (v - start_0) / (end_0 - start_0) * (end_1 - start_1) + start_1
    }

    static bio = "I am a product development engineer with a background in computer science. \nI push for accessibility and innovation in my work, and make sure that intention is clear in the end product.\nIn my free time, I love to experiment with game design and development as part of a multimedia collective."

    static cards = [
        {
            name: "Drop Dial",
            closedImg: '../assets/images/projects/0.png',
            link: "https://shuixian.itch.io/drop-dial",
            description: "Control a rotating, music-powered bar in a low-saturation cityscape. Made in Unity for UC Berkeley's Game Design DeCal, Spring 2018."
        },
        {
            name: "Summit Shake!",
            closedImg: '../assets/images/projects/1.png',
            link: "https://ampersands.itch.io/summit-shake",
            description: "Shake climbers off your sides as a sentient mountain. Made in PICO-8 for The Dream Arcade Archive, May 2020"
        },
        {
            name: "¡Esperé!",
            closedImg: '../assets/images/projects/2.png',
            link: "https://ampersands.itch.io/espere",
            description: "Play as a street vendor serving up paletas on a hot, sunny day. Made in Unity for Hispanic Heritage Month Jam, Oct 2020"
        },
        {
            name: "Egg on a Wire",
            closedImg: '../assets/images/projects/3.png',
            link: "https://snoresnax.itch.io/egg-on-a-wire",
            description: "Keep the egg safe from sparks by manipulating telephone wires. Made in Godot for Mini Jam 99, Feb 2022"
        }, 
        {
            name: "Pen Pals",
            closedImg: '../assets/images/projects/4.png',
            link: "https://snoresnax.itch.io/pen-pals",
            description: "Guide letters to their destination or demise in branching narrative experience. Made in Godot for Black and White Jam 8, Apr 2022"
        }, 
        {
            name: "Eternal Sanctuary",
            closedImg: '../assets/images/projects/5.png',
            link: "https://snoresnax.itch.io/eternal-sanctuary",
            description: "OST created for an imaginary game about runaways who seek refuge in an abandoned house. Made in Ableton for OST Composing Jam 4, Jul 2022" 
        }, 
        {
            name: "Bottoms Up",
            closedImg: '../assets/images/projects/6.png',
            link: "https://snoresnax.itch.io/bottoms-up",
            description: "Collaborate to recreate recipes in asymmetrical platformer. Made in Godot for Multiplayer Game Jam, Aug 2022"
        }, 
        {
            name: "fisherman",
            closedImg: '../assets/images/projects/7.png',
            link: "https://snoresnax.itch.io/fisherman",
            description: "Play a twisted game of fetch to capture lost spirits. Made in Godot for AI and Games Jam, Oct 2022"
        }, 
        {
            name: "Mural",
            closedImg: '../assets/images/projects/8.png',
            link: "https://ampersands.itch.io/mural",
            description: "Rediscover a faded mural by repainting it. Made in Godot for Hispanic Heritage Month, Oct 2022"
        }, 
        {
            name: "Wingit",
            closedImg: `${window.location.origin}/assets/images/projects/9.png`,
            link: "https://snoresnax.itch.io/wingit",
            description: "Alter bad pick-up lines in revolutionary dating app. Made in Godot for Indiepocalypse Issue 42, May 2023"
        }, 
        {
            name: "aguas",
            closedImg: '../assets/images/projects/10.png',
            link: "https://ampersands.itch.io/aguas",
            description: "Escape from a jar of aguas frescas. Made in Godot for Con Latinidad, Oct 2023"
        }, 
        {
            name: "bands",
            closedImg: `${window.location.origin}/assets/images/projects/11.png`,
            link: "https://snoresnax.itch.io/bands",
            description: "Zine investigating different manifestations of growth in life. Made in Procreate for Zine Jam: Growth Edition, Jan 2024"
        }, 
    ]

}
