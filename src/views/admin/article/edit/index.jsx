import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import './index.less'

import axios from '@/utils/axios'
import { Button, Input, Modal, BackTop, message } from 'antd'
import MdEditor from '@/components/MdEditor'
import List from './Tag'
import useBreadcrumb from '@/hooks/useBreadcrumb'
function Edit(props) {
  const store = useSelector(state => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList,
    authorId: state.user.userId
  }))

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tagList, setTagList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [tagSelectedList, setTagSelectedList] = useState([])
  const [cateSelectedList, setCateSelectedList] = useState([])

  const editId = parseInt(props.match.params.id)

  useBreadcrumb([{ link: '/admin/article/manager', name: '文章管理' }, editId ? '编辑文章' : '新增文章'])

  useEffect(() => {
    // did mounted
    if (editId) {
      fetchArticle(editId)
    } else {
    }
  }, [props.match.params])

  useEffect(() => {
    // mounted
    if (!editId) {
      const tags = store.tagList.map(d => d.name).slice(0, 10)
      const cates = store.categoryList.map(d => d.name).slice(0, 10)
      setTagList(tags)
      setCategoryList(cates)
      tags[0] && setTagSelectedList([tags[0]])
      cates[0] && setCateSelectedList([cates[0]])
    }
  }, [store.tagList, store.categoryList])

  function fetchArticle(id) {
    axios.get(`/article/${id}?type=0`).then(res => {
      setTitle(res.title)
      setContent(res.content)
      const tags = res.tags.map(d => d.name)
      const categories = res.categories.map(d => d.name)
      setTagList(tags)
      setCategoryList(categories)
      setTagSelectedList(tags)
      setCateSelectedList(categories)
    })
  }

  function add() {
    if (!title) return message.warning('title cannot be empty！')
    axios
      .post('/article', {
        title,
        content,
        tagList: tagSelectedList,
        categoryList: cateSelectedList,
        authorId: store.authorId
      })
      .then(res => {
        Modal.confirm({
          title: 'Artilce created,view it now?',
          onOk: () => props.history.push(`/article/${res.id}`)
        })
      })
  }

  function update() {
    axios
      .put(`/article/${editId}`, {
        title,
        content,
        tags: tagSelectedList,
        categories: cateSelectedList
      })
      .then(() => {
        message.success('Updated')
      })
  }

  return (
    <div className='admin-edit-article'>
      <ul className='form-list'>
        <li>
          <span className='label'>title：</span>
          <span style={{ flex: 1 }}>
            <Input
              placeholder='Please provide the title'
              className='title-input'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </span>
        </li>
        <li>
          <span className='label'>tag：</span>
          <span>
            <List
              list={tagList}
              setList={setTagList}
              selectedList={tagSelectedList}
              setSelectedList={setTagSelectedList}
            />
          </span>
        </li>
        <li>
          <span className='label'>category：</span>
          <span>
            <List
              list={categoryList}
              setList={setCategoryList}
              selectedList={cateSelectedList}
              setSelectedList={setCateSelectedList}
            />
          </span>
        </li>
      </ul>
      <MdEditor value={content} onChange={setContent} />
      <Button
        type='primary'
        shape='circle'
        size='large'
        disabled={!title}
        className='action-icon'
        title={editId ? 'update' : 'add'}
        icon={editId ? 'sync' : 'plus'}
        onClick={() => {
          editId ? update() : add()
        }}
      />

      <BackTop target={() => document.querySelector('.admin-content-wrap')} />
    </div>
  )
}

export default Edit
