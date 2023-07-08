export default class Subject {

  constructor () {
    this.observers = {}
  }

  /**
   * @param { string } key
   * @param { any } value
   */
  subscribe (key, value) {
    if (!(key in this.observers)) {
      this.observers[key] = []
    }

    this.observers[key].push(value)
  }

  unsubscribe (obs) {
    this.observers = this.observers.filter(o => o !== obs)
  }

  notify (key, obj) {
    this.observers[key].forEach(obs => {
      obs(obj)
    })
  }

}