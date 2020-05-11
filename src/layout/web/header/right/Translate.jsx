import React, { useState } from 'react'
import { Button } from 'antd'
import { connect, useSelector, useDispatch } from 'react-redux'

// methods
import { translate } from '@/redux/translate/actions'

function TranslateButton(props) {
  const dispatch = useDispatch()
  const state = useSelector(state => state.translate)

  return (
    <Button type='link' onClick={e => dispatch(translate())}>
      <span role='img'>🇨🇦 🇨🇳</span>
    </Button>
  )
}

export default TranslateButton
