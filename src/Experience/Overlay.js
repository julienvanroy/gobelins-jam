import Experience from "./Experience";

export default class Overlay
{
    constructor()
    {
        this.experience = new Experience()
        this.video = this.experience.video
        this.element = document.getElementById('overlay')

        this.element.addEventListener('click', this.hide.bind(this))
    }

    show()
    {
        this.element.style.display = 'block'
        this.video.instance.play()
    }

    hide()
    {
        this.element.style.display = 'none'
        this.video.instance.pause()
    }

    destroy()
    {
        this.element.removeEventListener('click', this.hide.bind(this))
    }
}
