import * as TYPES from '@/redux/types'
import { save, get, remove } from '@/utils/storage'
import { LANGUAGE_TRANSLATE } from 'redux/types'

// ====== state
const defaultState = { lan_code: 'EN'} // choose default English

export default function translateReducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case LANGUAGE_TRANSLATE:
      const { lan_code } = payload
      return { ...state, lan_code } // spead the ZH object

    default:
      return state
  }
}
