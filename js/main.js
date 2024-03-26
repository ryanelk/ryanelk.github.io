
class Main {

    constructor() {
        document.getElementById('volume-toggle').addEventListener('click', this.onVolumeToggle.bind(this), false);
        document.getElementById('help').addEventListener('click', this.onHelp.bind(this), false);
    }

    onVolumeToggle() {
        this.vertices = Math.max(this.vertices - 1, 3)
        this.resize()
    }

    onHelp() {
        this.resize()
    }
}

window.onload = () => {
    new Main();
}