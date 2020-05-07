import React, { Component } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

// methods
import { loginout } from '@/redux/user/actions'

// components
import { Button, Dropdown, Menu, Avatar } from 'antd'
import AppAvatar from '@/components/Avatar'

// hooks
import useBus from '@/hooks/useBus'

function UserInfo(props) {
  const dispatch = useDispatch()
  const bus = useBus()
  const userInfo = useSelector(state => state.user)
  const { username, github, role } = userInfo

  const MenuOverLay = (
    <Menu>
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => bus.emit('openUploadModal')}>Upload articles</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => props.history.push('/admin')}>Management</span>
        </Menu.Item>
      )}
      <Menu.Item>
        <span className='user-logout' onClick={e => dispatch(loginout())}>
          Log out
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='header-userInfo'>
      {username ? (
        <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
          <div style={{ height: 55 }}>
            <AppAvatar userInfo={userInfo} popoverVisible={false} />
          </div>
        </Dropdown>
      )
        : (
          <>
            <Button
              ghost
              type='primary'
              size='small'
              style={{ marginRight: 20 }}
              onClick={e => bus.emit('openSignModal', 'login')}>
              Sign In
            </Button>
            <Button ghost type='danger' size='small' onClick={e => bus.emit('openSignModal', 'register')}>
              Register
            </Button>
          </>
        )}
    </div>
  )
}

export default withRouter(UserInfo)
