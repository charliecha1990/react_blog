import { combineReducers } from 'redux'

import article from './article/reducer'
import user from './user/reducer'
import translate from './translate/reducer'

export default combineReducers({
  user,
  article,
  translate
})
