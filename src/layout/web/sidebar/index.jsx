import React, { useEffect, useState } from 'react'
import { SIDEBAR } from '@/config'
import axios from '@/utils/axios'
import { useSelector } from 'react-redux'

// components
import { Link } from 'react-router-dom'
import Href from '@/components/Href'
import { Icon, Divider, Tag } from 'antd'

import { Alert } from 'antd'

import { ANNOUNCEMENT } from '@/config'
import { MDN } from '@/config'

import useFetchList from '@/hooks/useFetchList'

function SideBar(props) {
  const tagList = useSelector(state => state.article.tagList || [])

  const { dataList: articleList } = useFetchList({
    withLoading: false,
    requestUrl: '/article/list',
    queryParams: {
      order: 'viewCount DESC',
      page: 1,
      pageSize: 6
    }
  })

  return (
    <div className='app-sidebar'>
      <img src={SIDEBAR.avatar} className='sider-avatar' alt='' />
      <Divider orientation='left'>quick links</Divider>
      <a href={MDN.link}>MDN Dev Channel</a>
      {/* <h2 className='title'>{SIDEBAR.title}</h2>
      <h5 className='sub-title'>{SIDEBAR.subTitle}</h5> */}
      {/* <ul className='home-pages'>
        {Object.entries(SIDEBAR.homepages).map(([linkName, item]) => (
          <li key={linkName}>
            {item.icon}
            <Href href={item.link}>{linkName}</Href>
          </li>
        ))}
      </ul> */}

      {/* {ANNOUNCEMENT.enable && <Alert message={ANNOUNCEMENT.content} type='info' />} */}

      <Divider orientation='left'>what's up</Divider>
      <ul className='article-list'>
        {articleList.map(d => (
          <li key={d.id}>
            <Link to={`/article/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>

      <Divider orientation='left'>tags</Divider>
      <div className='tag-list'>
        {tagList.map((tag, i) => (
          <Tag key={i} color={tag.color}>
            <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
          </Tag>
        ))}
      </div>
    </div>
  )
}

export default SideBar
