import * as TYPES from '@/redux/types'
import axios from '@/utils/axios'
import { message } from 'antd'

export const translate = () => {
  message.success(`Translation success`)
  return {
    type: TYPES.LANGUAGE_TRANSLATE,
    payload: { Home: '主页'}
  }
}
