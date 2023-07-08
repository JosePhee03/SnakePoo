// @ts-check
import { OBSERVER } from '../constants/observer.mjs'
import { STATUS } from '../constants/status.mjs'
import { state, store } from '../store/state.mjs'

const TITLE_MODAL = {
  [STATUS.GAME_OVER]: 'Game Over',
  [STATUS.PAUSE]: 'Pause',
  [STATUS.IDLE]: 'Start Game'
}

export default class SnakeStatusBox extends HTMLElement {

  /** @type { string } */
  #status

  constructor () {
    super()
    store.subscribe(OBSERVER.STATUS, this.updateTitle.bind(this))
  }

  get styles () {
    return /* html */`
      <style>

        .back {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0
        }
        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 2rem;
        }
        #button-game {
          padding: 0.4rem 1.4rem;
          width: min-content;
          color: var(--white);
          filter: var(--shadow);
          background: none;
          font-family: 'Press Start 2P', cursive;
          font-size: 1rem;
          border-radius: 0.2rem;
          border: solid 0.2rem var(--white);
        }

        #button-game:hover {
          cursor: pointer;
          background: var(--hover);
        }

        #box-title {
          font-size: 1.4rem;
          color: var(--white);
          filter: var(--shadow);
        }
      </style>
    `
  }

  get template () {
    return /* html */`
    <div class="back">
      <div class="box">
        <h2 id="box-title">${TITLE_MODAL[state.status]}</h2>
        <button id="button-game">Start</button>
      </div>
    <div>
    `
  }

  handleEvent (event) {
    if (event.type === 'click') {
      store.setState(OBSERVER.STATUS, STATUS.START)
    }
  }

  closeModal () {
    this.style.display = 'none'
  }

  openModal () {
    this.style.display = 'block'

    const buttonGame = this.querySelector('#button-game')
    if (buttonGame instanceof HTMLButtonElement) {
      buttonGame.focus()
    }
  }

  /** @param { string } status */
  updateTitle (status) {
    switch (status) {
    case STATUS.START:
      this.closeModal()
      break
    default:
      this.openModal()
    }

    const tittle = this.querySelector('#box-title')
    if (tittle instanceof Element) {
      tittle.childNodes[0].textContent = TITLE_MODAL[status]
    }
  }

  connectedCallback () {
    this.render()

    this.updateTitle(state.status)
    const buttonGame = this.querySelector('#button-game')

    if (buttonGame instanceof Element) {
      buttonGame.addEventListener('click', this)
    }
  }

  render () {
    this.innerHTML = `${this.styles}${this.template}`
  }

}

window.customElements.define('snake-status-box', SnakeStatusBox)