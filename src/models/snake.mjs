// @ts-check
import { DIRECTION } from '../constants/direction.mjs'

/**
 * @typedef {import('../types/snake.type.mjs').Body} Body
 */

export default class Snake {

  /** @type { Body[] }*/
  body = [ { snakeX: 0, snakeY: 0 } ]

  resetBody () {
    this.body = [ { snakeX: 0, snakeY: 0 } ]
  }

  addBody () {
    this.body.push({ snakeX: -100, snakeY: -100 })
  }

  /**
   * @param { string } direction
   * @param { number } sizeX
   * @param { number } sizeY
   */

  move (direction, sizeX, sizeY) {
    const body = this.body
    const head = this.body[0]
    const { snakeX, snakeY } = head

    let newHead
    switch (direction) {
    case DIRECTION.DOWN:
      newHead = { snakeY: snakeY + sizeY, snakeX }
      break
    case DIRECTION.LEFT:
      newHead = { snakeY, snakeX: snakeX - sizeX }
      break
    case DIRECTION.RIGHT:
      newHead = { snakeY, snakeX: snakeX + sizeX }
      break
    case DIRECTION.UP:
      newHead = { snakeY: snakeY - sizeY, snakeX }
      break
    default:
      throw Error ('Dirección no encontrada')
    }

    const newBody = body.map((_, index, ArrBody) => {
      if (index === 0) return newHead
      else return ArrBody[index - 1]
    })

    this.body = newBody
  }
}