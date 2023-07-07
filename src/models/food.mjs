// @ts-check

/**
 * @typedef { import('../types/food.type.mjs').FoodPosition } FoodPosition
 */

export default class Food {

  /** @type { FoodPosition } */
  position

  /**
   * @param { number } sizeX
   * @param { number } sizeY
   */
  constructor (sizeX, sizeY) {
    this.position = this.randomPosition(sizeX, sizeY)
  }

  /**
   * @param { number } sizeX
   * @param { number } sizeY
   * @returns { FoodPosition }
   */
  randomPosition (sizeX, sizeY) {
    const random = (size) => Math.floor(Math.random() * 10) * size

    return {
      foodX: random(sizeX),
      foodY: random(sizeY)
    }
  }

}