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
      {/* <img src={SIDEBAR.avatar} className='sider-avatar' alt='' /> */}
      <div>
        <iframe title='iphone' style={{ width: '220px', height: '150px' }} src='http://tridiv.com/app/index.html?dmlldz1mdWxsJmRvYz17InNldHRpbmdzIjp7Im5hbWUiOiJpUGhvbmUgNFMiLCJsaWdodCI6InN0YXRpYyIsInNoYWRlIjoiLjMiLCJ0aW50IjoiLjMiLCJib3JkZXIiOiIwIiwiYmciOiIjM2E4OWI3Iiwiem9vbSI6IjI1IiwibWF0Y2giOiIwLjUiLCJzbmFwIjoib2ZmIn0sInNoYXBlcyI6W3sidHlwZSI6ImN1Ym9pZCIsInkiOiIxLjEyNSIsInciOiIxNiIsImgiOiIuNSIsImQiOiIzMiIsInJ5IjoiMTgwIiwiY3IiOiIyLjUiLCJjQWxsIjoiIzMwMzAzMCIsIm5hbWUiOlsiYmFjayJdLCJpQm0iOiJodHRwOi8vdHJpZGl2LmNvbS9kZW1vcy9pcGhvbmU0Uy9iYWNrLnBuZyJ9LHsidHlwZSI6ImN1Ym9pZCIsInciOiIxNi41IiwiaCI6IjEuNzUiLCJkIjoiMzIuNSIsImNyIjoiMi42MjUiLCJjQWxsIjoiI2Q0ZDFjZiIsIm5hbWUiOlsibWlkIl19LHsidHlwZSI6ImN1Ym9pZCIsInkiOiItMS4xIiwidyI6IjE2IiwiaCI6Ii40NSIsImQiOiIzMiIsImNyIjoiMi41IiwiY0FsbCI6IiMzMDMwMzAiLCJpVHAiOiJodHRwOi8vdHJpZGl2LmNvbS9kZW1vcy9pcGhvbmU0Uy90b3AucG5nIiwibmFtZSI6WyJ0b3AiXX0seyJ0eXBlIjoiY3Vib2lkIiwieCI6Ii04LjM4IiwieiI6LTEyLjUsInciOiIuNSIsImgiOiIuMjUiLCJkIjoiMS41IiwicngiOiIwIiwicnoiOi05MCwiY3IiOiIuMjUiLCJjQWxsIjoiI2NiYzhjNiIsIm5hbWUiOlsibG9jayJdfSx7InR5cGUiOiJjeWxpbmRlciIsIngiOiItOC4zOCIsInoiOiItOS41IiwiZGlhbWV0ZXIiOiIxLjI1IiwiaCI6IjAuMjUiLCJyeiI6LTkwLCJzaWRlcyI6IjEyIiwiY0FsbCI6IiNjYmM4YzYiLCJuYW1lIjpbImJ0bi1wbHVzIl19LHsidHlwZSI6ImN5bGluZGVyIiwieCI6Ii04LjM4IiwieiI6Ii03IiwiZGlhbWV0ZXIiOiIxLjI1IiwiaCI6IjAuMjUiLCJyeiI6LTkwLCJzaWRlcyI6IjEyIiwiY0FsbCI6IiNjYmM4YzYiLCJuYW1lIjpbImJ0bi1sZXNzIl19LHsidHlwZSI6ImN1Ym9pZCIsIngiOjMuNSwieiI6Ii0xNi4zOCIsInciOiIuNSIsImgiOiIuMjUiLCJkIjoiMi43NSIsInJ4IjoiMCIsInJ5IjotOTAsInJ6IjotOTAsImNyIjoiLjI1IiwiY0FsbCI6IiNjYmM4YzYiLCJuYW1lIjpbInBvd2VyIl19LHsidHlwZSI6ImN1Ym9pZCIsInkiOiItMS4xIiwidyI6IjE0IiwiaCI6Ii40IiwiZCI6IjIxIiwiaVRwIjoiaHR0cDovL3RyaWRpdi5jb20vZGVtb3MvaXBob25lNFMvc2NyZWVuLnBuZyIsIm5hbWUiOiJjdWItOCJ9XX0='></iframe>
      </div>

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
