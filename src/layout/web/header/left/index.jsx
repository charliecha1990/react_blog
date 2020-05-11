import React, { useState, useMemo } from 'react'
import { Icon, Dropdown, Menu, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'

// import config
import { HEADER_BLOG_NAME } from '@/config'
import EN from '../right/navList'
import ZH from '../right/navList'

// icon
import SvgIcon from '@/components/SvgIcon'

const HeaderLeft = props => {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  function handleChange(e) {
    e.preventDefault()
    setKeyword(e.target.value)
  }

  function onPressEnter(e) {
    e.target.blur()
  }

  function onSubmit() {
    history.push(`/?page=1&keyword=${keyword}`)
    setKeyword('')
  }

  function clickSearch(e) {
    e.stopPropagation()
  }

  function backHome () {
    history.push(`/`)
  }

  // function getNavList () {
  //   const lan_code = useSelector(state => state.translate.lan_code)
  //   console.log(lan_code)
  //   return lan_code === 'EN' ? navList : ZH
  // }
  const lan_code = useSelector(state => state.translate.lan_code)
  const nav_list = lan_code === 'EN' ? EN : [
    {
      icon: 'home',
      title: '主页',
      link: '/'
    },
    {
      icon: 'edit',
      title: '归档',
      link: '/archives'
    },
    {
      icon: 'folder',
      title: '分类',
      link: '/categories'
    },
    {
      icon: 'user',
      title: '关于',
      link: '/about'
    }
  ]

  const menu = (
    <Menu className='header-nav'>
      {nav_list.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item key={'search'}>
        <Icon type='search' />
        {console.log('menu rendered', nav_list)}
        {console.log('lan_code', lan_code)}
        <Input
          className='search-input'
          onClick={clickSearch}
          value={keyword}
          onChange={handleChange}
          onPressEnter={onPressEnter}
          onBlur={onSubmit}
        />
      </Menu.Item>
    </Menu>
  )

  console.log('menu', menu)

  return (
    <div className='header-left'>
      <div className='blog-name' onClick={() => backHome()}>{HEADER_BLOG_NAME}</div>
      <Dropdown
        overlayClassName='header-dropdown'
        trigger={['click']}
        overlay={menu}
        getPopupContainer={() => document.querySelector('.app-header .header-left')}>
        <Icon type='menu-o' className='header-dropdown-icon' />
      </Dropdown>
      {console.log('nav component rendered')}
    </div>
  )
}

export default HeaderLeft
