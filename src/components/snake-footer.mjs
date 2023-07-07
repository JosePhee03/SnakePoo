class SnakeFooter extends HTMLElement {

  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
  }

  get styles () {
    return /* html */`
      <style>
        :host {
          width: 100%;
          height: 60px;
          display: flex;
        }

        .arrow {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: pink;
        }
      </style>
    `
  }

  get templates () {
    return /* html */`
      <button class="arrow arrow-up">1</button>
      <button class="arrow arrow-down">2</button>
      <button class="arrow arrow-left">3</button>
      <button class="arrow arrow-right">4</button>
    `
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = `${this.styles}${this.templates}`
  }
}

window.customElements.define('snake-footer', SnakeFooter, { extends: 'footer' })