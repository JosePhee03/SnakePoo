import { STATUS } from '../constants/status.mjs'
import Store from './store.mjs'

const initialState = {
  status: STATUS.IDLE,
  width: 360,
  height: 360,
  size: 10,
  snakeColor: '#F000F2',
  foodColor: '#0F0',
  speed: 100,
  score: 0
}

export const store = new Store(initialState)
export const state = store.state