// @ts-check
import { OBSERVER } from '../constants/observer.mjs'
import { DIRECTION, OPOSITE_DIRECTION } from '../constants/direction.mjs'
import { STATUS } from '../constants/status.mjs'
import { state, store } from '../store/state.mjs'
import Draw from './draw.mjs'
import Food from './food.mjs'
import Snake from './snake.mjs'

/**
 * @typedef { import('../types/snake.type.mjs').Body } Body
 * @typedef { import('../types/food.type.mjs').FoodPosition } FoodPosition
 */

export class Game {

  /** @type { string } */
  status = STATUS.IDLE
  /** @type { string } */
  direction = DIRECTION.RIGHT
  /** @type { number } */
  score = 0

  /**
   * @param { CanvasRenderingContext2D } context
   */

  constructor (context) {
    const { width, height, size, speed } = state

    this._width = width
    this._height = height
    this._sizeX = width / size
    this._sizeY = width / size
    this._context = context
    this._draw = new Draw(context)
    this._snake = new Snake()
    this._food = new Food(this._sizeX, this._sizeY)
    this._speed = speed
    document.addEventListener('change-direction',
    /** @param { * } event */
      (event) => {
        const newDirection = event.detail.direction
        if (this.status === STATUS.PAUSE) return
        if (OPOSITE_DIRECTION[this.direction] !== newDirection) {
          this.direction = newDirection
        }
      })
  }

  /** @param { number } score */
  updateScore (score) {
    this.score = score
    store.setState(OBSERVER.SCORE, `${score}`)
  }

  /** @param { string } status */
  updateStatus (status) {
    const oldStatus = this.status
    const newStatus = status
    this.status = status
    if (oldStatus === STATUS.PAUSE && newStatus === STATUS.START) return this.start()
    else if (oldStatus === STATUS.GAME_OVER || oldStatus === STATUS.IDLE && newStatus === STATUS.START) return this.restart()
  }

  pause () {
    store.setState(OBSERVER.STATUS, STATUS.PAUSE)
  }

  gameOver () {
    store.setState(OBSERVER.STATUS, STATUS.GAME_OVER)
  }

  restart () {
    this._snake.resetBody()
    this.updateScore(0)
    this.ramdomFood()
    this.direction = DIRECTION.RIGHT
    this.gameLoop()
  }

  start () {
    this.gameLoop()
  }

  ramdomFood () {
    const newFood = this._food.randomPosition(this._sizeX, this._sizeY)
    const body = this._snake.body
    const isFoodInTheBody = () => body.some(({ snakeX, snakeY }) =>
      newFood.foodX === snakeX && newFood.foodY === snakeY
    )

    if (isFoodInTheBody()) return this.ramdomFood()

    this._food.position = newFood
  }

  isCollitionFood () {
    const { foodX, foodY } = this._food.position
    const { snakeX, snakeY } = this._snake.body[0]

    if (foodX === snakeX && foodY === snakeY) {
      this._snake.addBody()
      this.ramdomFood()
      this.updateScore(this.score + 1)
    }
  }

  isCollitionHeadWithBody () {
    const body = this._snake.body
    const head = this._snake.body[0]

    return body.some((_Body, index) => {
      if (index === 0) return false
      else return _Body.snakeX === head.snakeX && _Body.snakeY === head.snakeY
    })
  }

  isCollitionHeadWithBorder () {
    const head = this._snake.body[0]
    return head.snakeX < 0 || head.snakeX >= this._width || head.snakeY < 0 || head.snakeY >= this._height
  }

  isGameOver () {
    if (this.isCollitionHeadWithBorder()
    || this.isCollitionHeadWithBody()) {
      this.gameOver()
    } else return
  }

  gameLoop () {
    if (this.status === STATUS.START) {
      const gameInterval = setInterval(() => {
        this._snake.move(this.direction, this._sizeX, this._sizeY)
        this.isGameOver()
        this.isCollitionFood()
        this._draw.render(
          this._snake.body,
          this._food.position,
          this._width,
          this._height,
          this._sizeX,
          this._sizeY,
        )
        if (this.status !== STATUS.START) {
          clearInterval(gameInterval)
        }
      }, this._speed)
    }

  }

}