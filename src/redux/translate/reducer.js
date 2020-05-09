import * as TYPES from '@/redux/types'
import { save, get, remove } from '@/utils/storage'
import { LANGUAGE_TRANSLATE } from 'redux/types'

// ====== state
const defaultState = {
  Home: 'Home'
}

export default function UserReducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case LANGUAGE_TRANSLATE:
      const { Home } = payload
      return { ...state, Home }

    default:
      return state
  }
}
