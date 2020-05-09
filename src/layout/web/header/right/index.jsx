import React from 'react'
import Search from './Search'
import Navbar from './Navbar'
import UserInfo from './UserInfo'
import Translate from './Translate'

function HeaderRight(props) {
  return (
    <div className='header-right'>
      <Search />
      <Translate />
      <UserInfo />
      <Navbar />
    </div>
  )
}

export default HeaderRight
