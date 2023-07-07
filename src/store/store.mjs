import Subject from './subject.mjs'

/**
 * @typedef { import('../types/state.type.mjs').State } State
 */

export default class Store extends Subject {

  /** @param { State } state */
  constructor (state) {
    super()
    this.state = state
  }

  /** @return { State } */
  getState () {
    return this.state
  }

  setState (key, value) {
    this.state[key] = value
    super.notify(key, value)
  }

  /**
   *
   * @param { string } key
   * @param { Function } fn
   */
  subscribe (key, fn) {
    super.subscribe(key, fn)
  }

}
