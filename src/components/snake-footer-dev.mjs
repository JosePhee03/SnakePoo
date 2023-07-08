import { OBSERVER } from '../constants/observer.mjs'
import { state, store } from '../store/state.mjs'

class SnakeFooterDev extends HTMLElement {

  constructor () {
    super()
    store.subscribe(OBSERVER.STATUS, this.updateStatus.bind(this))
    store.subscribe(OBSERVER.WIDTH, this.updateWidth.bind(this))
    store.subscribe(OBSERVER.HEIGHT, this.updateHeight.bind(this))
    store.subscribe(OBSERVER.SIZE, this.updateSize.bind(this))
    store.subscribe(OBSERVER.SCORE, this.updateScore.bind(this))
  }

  get styles () {
    return /* html */`
      <style>
        .footer-dev {
          position: fixed;
          left: 0;
          bottom: 0;
          background: #FFF;
          font-family: sans-serif;
          display: flex;
          padding: 1rem;
          flex-direction: column;
          gap: .2rem
        }
      </style>
    `
  }
  /* status: STATUS.IDLE,
  width: 360,
  height: 360,
  size: 10,
  snakeColor: '#F000F2',
  foodColor: '#0F0',
  speed: 10,
  score: 0 */

  get templates () {
    return /* html */`
      <footer class="footer-dev">
        <span id="dev-status"><b>Staus:</b> ${state.status}</span>
        <span id="dev-width"><b>Width:</b> ${state.width}</span>
        <span id="dev-height"><b>Height:</b> ${state.height}</span>
        <span id="dev-foodColor"><b>FoodColor:</b> ${state.foodColor}</span>
        <span id="dev-snakeColor"><b>SnakeColor:</b> ${state.snakeColor}</span>
        <span id="dev-size"><b>Size:</b> ${state.size}</span>
        <span id="dev-score"><b>Score:</b> ${state.score}</span>
        <span id="dev-speed"><b>Speed:</b> ${state.speed}</span>
      </footer>
    `
  }

  connectedCallback () {
    this.render()
  }

  updateStatus (status) {
    this.querySelector('#dev-status').childNodes[1].textContent = status
  }

  updateWidth (width) {
    this.querySelector('#dev-width').childNodes[1].textContent = width
  }

  updateHeight (height) {
    this.querySelector('#dev-height').childNodes[1].textContent = height
  }

  updateFoodColor (foodColor) {
    this.querySelector('#dev-foodColor').childNodes[1].textContent = foodColor
  }

  updateSnakeColor (snakeColor) {
    this.querySelector('#dev-snakeColor').childNodes[1].textContent = snakeColor
  }

  updateSize (size) {
    this.querySelector('#dev-size').childNodes[1].textContent = size
  }

  updateScore (score) {
    this.querySelector('#dev-score').childNodes[1].textContent = score
  }

  updateSpeed (speed) {
    this.querySelector('#dev-speed').childNodes[1].textContent = speed
  }

  render () {
    this.innerHTML = `${this.styles}${this.templates}`
  }
}

window.customElements.define('snake-footer-dev', SnakeFooterDev)