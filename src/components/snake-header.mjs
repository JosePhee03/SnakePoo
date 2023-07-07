// @ts-check

import { OBSERVER } from '../constants/observer.mjs'
import { STATUS } from '../constants/status.mjs'
import { state, store } from '../store/state.mjs'
import Icons from './icons.mjs'

/**
 * @typedef { import('../types/state.type.mjs').State } State
 */

class SnakeHeader extends HTMLElement {

  constructor () {
    super()
    store.subscribe(OBSERVER.SCORE, this.updateScore.bind(this))
    store.subscribe(OBSERVER.STATUS, this.updateButtons.bind(this))
  }

  get styles () {
    return /* html */`
      <style>
        header {
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-inline: 20px;
        }

        .header-left {
          width: 100%;
          display: flex;
          justify-content: start;
        }

        .header-right {
          width: 100%;
          display: flex;
          justify-content: end;
        }

        .header-center {
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .logo-img {
          position: absolute;
          z-index: 10;
          transform: translateY(-5rem);
        }

        #score {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: white;
          filter: var(--shadow);
          font-size: 1.2rem;
        }

        #score span {
          font-size: 0.8rem
        }

      </style>
    `
  }

  get template () {
    return /* html */`
      <header>
        <div class="header-left">
          <div id="score">
            <span>score</span>
            ${state.score}
          </div>
        </div>
        <div class="header-center">
          <img class="logo-img" src="./public/logo.png" alt="">
        </div>
        <div class="header-right">
          <button class="button" id="button-pause">${Icons.pause}</button>
        </div>
      </header>
    `
  }

  /** @param { string } score */
  updateScore (score) {
    const scoreElement = this.querySelector('#score')
    if (scoreElement instanceof Element) {
      scoreElement.childNodes[2].textContent = score.padStart(3, '0')
    }
  }

  handleEvent (event) {
    if (event.type === 'click') {
      if (event.target.id === 'button-pause') {
        store.setState(OBSERVER.STATUS, STATUS.PAUSE)
      }
    }
  }

  updateButtons (status) {
    const buttonPause = this.querySelector('#button-pause')
    if (status === STATUS.START) {
      buttonPause?.removeAttribute('disabled')
    } else {
      buttonPause?.setAttribute('disabled', 'true')
    }
  }

  connectedCallback () {
    this.render()
    this.updateScore(`${state.score}`)
    this.updateButtons(state.status)
    const buttonPause = this.querySelector('#button-pause')
    if (buttonPause instanceof Element) {
      buttonPause.addEventListener('click', this)
    }
  }

  render () {
    this.innerHTML = `${this.styles}${this.template}`
  }

}

window.customElements.define('snake-header', SnakeHeader)