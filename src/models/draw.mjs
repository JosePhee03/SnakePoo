// @ts-check

import { state } from '../store/state.mjs'

export default class Draw {

  /**
   * @param { CanvasRenderingContext2D } context
   */
  constructor (context) {
    const { foodColor, snakeColor } = state

    this._snakeColor = snakeColor
    this._foodColor = foodColor
    this._context = context
  }

  /**
   * @param { number } sizeY
   * @param { number } sizeX
   * @param { { snakeX: number, snakeY: number }[] } body
   */

  drawSnake (sizeY, sizeX, body) {
    this._context.fillStyle = this._snakeColor

    body.forEach(({ snakeX, snakeY }) => {
      this._context.fillRect(snakeX, snakeY, sizeX, sizeY)
    })
  }

  /**
   * @param { number } sizeY
   * @param { number } sizeX
   * @param { { foodX: number, foodY: number } } food
   */

  drawFood (sizeY, sizeX, food) {
    const { foodX, foodY } = food

    this._context.fillStyle = this._foodColor

    this._context.fillRect(foodX, foodY, sizeX, sizeY)
  }

  /**
   * Renderizar la comida y la serpiente en el canvas
   * @param { { snakeX: number, snakeY: number }[] } body
   * @param { { foodX: number, foodY: number } } food
   * @param { number } width
   * @param { number } height
   * @param { number } sizeX
   * @param { number } sizeY
   */

  render (body, food, width, height, sizeX, sizeY) {
    this._context.clearRect(0, 0, width, height)

    this.drawFood(sizeY, sizeX, food)
    this.drawSnake(sizeY, sizeX, body)
  }

}