import React from 'react'
import { Icon } from 'antd'
import SvgIcon from '@/components/SvgIcon'

import Href from '@/components/Href'
import MyInfo from '@/views/web/about/MyInfo'

// API_BASE_URL

export const SERVER_IP = '172.105.98.245' // IP address of the deployed server
export const API_BASE_URL = `http://${SERVER_IP}:6060`

// export const API_BASE_URL = 'http://127.00.1:6060'

// project config
export const HEADER_BLOG_NAME = 'Charlie Zha ❤️ coding' // header title 显示的名字

// === sidebar
export const SIDEBAR = {
  avatar: require('@/assets/images/avatar.jpeg'), // 侧边栏头像
  title: 'Charlie Zha', // 标题
  subTitle: 'A place to grow', // 子标题
  // 个人主页
  homepages: {
    github: {
      link: 'https://github.com/charliecha1990',
      icon: <Icon type='github' theme='filled' className='homepage-icon' />
    },
    juejin: {
      link: 'NA',
      icon: <SvgIcon type='iconjuejin' className='homepage-icon' />
    }
  }
}

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: 'c6a96a84105bb0be1fe5', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize' // 跳转的登录的地址
}

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, // 关于页面是否开启讨论
  renderMyInfo: <MyInfo /> // 我的介绍 自定义组件 => src/views/web/about/MyInfo.jsx
}

export const MDN = {
  link: 'https://developer.mozilla.org/en-US/'
}

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: true, // 是否开启
  content: (
    <>
      Please add me (charlie_222) in your wechat if you are interested in discussing web technologies
    </>
  )
}

// i18n
export const LANGUAGE = {
  ZH: {
    Home: '主页',
    Archives: '归档',
    Categories: '分类',
    About: '关于我'
  },
  EN: {
    Home: 'Home',
    Archives: 'Archives',
    Categories: 'Categories',
    About: 'About'
  }
}
