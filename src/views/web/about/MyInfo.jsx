import React from 'react'

// components
import { Divider, Rate, Icon, Avatar } from 'antd'
import Href from '@/components/Href'
import SvgIcon from '@/components/SvgIcon'

const skills = [
  {
    label: 'HTML、CSS、Javascript',
    rate: 4
  },
  {
    label: 'React',
    rate: 3
  },
  {
    label: ' ES6, OOP Javascript',
    rate: 4
  },
  {
    label: 'webpack',
    rate: 2
  },
  {
    label: 'Node.js, MySQL, MongoDB',
    rate: 3
  }
]

const MyInfo = () => {
  return (
    <>
      <Divider orientation='left'>Something to say</Divider>
      <p>Tech stacks: react hooks + antd + koa2 + mysql</p>
      <p>
        Source code <Href href=''>github</Href>
        ，for no commercial purpose
      </p>

      <Divider orientation='left'>About me</Divider>

      <ul className='about-list'>
        <li>Charlie Zha</li>
        <li>Master of Engineering in Information System Security</li>
        <li>
          Contact me：
          <Icon type='qq' /> NA
          <Divider type='vertical' />
          <SvgIcon type='iconemail' style={{ marginRight: 5, transform: 'translateY(2px)' }} />
          <a href='mailto:gershonv@163.com'>charliecha1990@gmail.com</a>
        </li>
        <li>Location: Montreal</li>
        {/* <li>
          Other Social Links：
          <Href href='https://gershonv.github.io/'>hexo 博客</Href>
          <Divider type='vertical' />
          <Href href='https://juejin.im/user/5acac6c4f265da2378408f92'>掘金主页</Href>
        </li> */}
        <li>
          Techs
          <ul>
            {skills.map((item, i) => (
              <li key={i}>
                {item.label}
                <Rate defaultValue={item.rate} disabled />
              </li>
            ))}
          </ul>
        </li>
        <li>
          other
          <ul>
            <li>IDE： VSC</li>
            <li>UI： Material-ui, antd, Bootstrap</li>
            <li>Coding style： standard</li>
          </ul>
        </li>
        <li>
          Personal
          <ul>
            <li>Basketkball, PUBG</li>
            <li>join my wechat:  charlie_222</li>
          </ul>
        </li>
      </ul>
    </>
  )
}

export default MyInfo
