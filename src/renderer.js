class Renderer {
  start = () => {
    if(this.app) return this.app
    PIXI = this.getPixi()
    this.app = new PIXI.Application()
    document.body.appendChild(this.app.view)
  }

  getApp = () => this.app

  getPixi = () => PIXI
}

const renderer = new Renderer()
export default renderer
