import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Table, Form, Tag, Switch, message, Input, Button, Popconfirm, Select } from 'antd'

import axios from '@/utils/axios'

import { Link } from 'react-router-dom'
import moment from 'moment'
import download from '@/utils/download'

import useAntdTable from '@/hooks/useAntdTable'

import useBreadcrumb from '@/hooks/useBreadcrumb'

function ArticleManager(props) {
  useBreadcrumb(['article management'])

  const { tagList, categoryList } = useSelector(state => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList
  }))
  const { getFieldDecorator } = props.form
  const [queryParams, setQueryParams] = useState({})
  const [batch, setBatch] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/article/list',
    queryParams,
    columns: [
      {
        title: 'title',
        dataIndex: 'title'
      },
      {
        title: 'tag',
        dataIndex: 'tags',
        render: (text, record) => {
          return text.map(d => (
            <Tag color={renderColor(d.name, tagList)} key={d.name}>
              <Link to={`/tags/${d.name}`}>{d.name}</Link>
            </Tag>
          ))
        }
      },
      {
        title: 'category',
        dataIndex: 'categories',
        render: (text, record) => {
          return text.map(d => (
            <Tag color='#2db7f5' key={d.name}>
              <Link to={`/categories/${d.name}`}>{d.name}</Link>
            </Tag>
          ))
        }
      },
      {
        title: 'number of views',
        dataIndex: 'viewCount',
        sorter: (a, b) => b.viewCount - a.viewCount
      },
      {
        title: 'published at',
        dataIndex: 'createdAt',
        sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
      },
      {
        title: 'updated at',
        dataIndex: 'updatedAt',
        sorter: (a, b) => (moment(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1)
      },
      {
        dataIndex: 'id',
        title: 'actions',
        render: (articleId, record) => {
          return (
            <ul className='action-list'>
              <li>
                <Link to={`/article/${articleId}`}>view</Link>
              </li>
              <li>
                <Link to={{ pathname: `/admin/article/edit/${record.id}`, state: { articleId } }}>edit</Link>
              </li>
              <li>
                <a onClick={e => output(record.id, record.title)}>export</a>
              </li>
              <li>
                <Popconfirm title='Are you sure？' cancelText='No' onConfirm={e => updateList(() => axios.delete(`/article/${articleId}`))}>
                  <a className='delete-text'>delete</a>
                </Popconfirm>
              </li>
            </ul>
          )
        }
      }
    ]
  })

  function renderColor(name, list) {
    const target = list.find(l => l.name === name)
    return target && target.color
  }

  function output(articleId) {
    download(`/article/output/${articleId}`)
  }

  function outputSelected() {
    download(`/article/output/list/${selectedRowKeys}`)
  }

  function outputAll() {
    download('/article/output/all')
  }

  function delList() {
    axios.delete(`/article/list/${selectedRowKeys}`).then(() => {
      onSearch()
      setSelectedRowKeys([])
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        setQueryParams({ ...queryParams, ...values })
        onSearch({ ...queryParams, ...values })
      }
    })
  }

  const rowSelection = batch ? {
    selectedRowKeys,
    onChange: selectList => setSelectedRowKeys(selectList)
  } : null

  return (
    <div className='admin-article-manager'>
      {/* 检索 */}
      <Form layout='inline' onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <Form.Item label='key word'>
          {getFieldDecorator('keyword')(
            <Input placeholder='type the key word' allowClear />
          )}
        </Form.Item>
        <Form.Item label='tag'>
          {getFieldDecorator('tag')(
            <Select style={{ width: 200 }} allowClear>
              {tagList.map(item => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label='category'>
          {getFieldDecorator('category')(
            <Select style={{ width: 200 }} allowClear>
              {categoryList.map(item => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>index</Button>
          <Button type='primary' onClick={outputAll} style={{ marginRight: 8 }}>
            export all articles
          </Button>
        </Form.Item>
      </Form>

      <Table {...tableProps}
        rowSelection={rowSelection}
        footer={() => (
          <>
            apply to all <Switch checked={batch} onChange={e => setBatch(prev => !prev)} style={{ marginRight: 8 }} />

            {
              batch && (
                <>
                  <Button type='primary' size='small' style={{ marginRight: 8 }} disabled={selectedRowKeys.length === 0} onClick={outputSelected}>export selected</Button>
                  <Popconfirm
                    title='Are you sure delete the articles?'
                    onConfirm={delList}
                    // onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button type='danger' size='small' disabled={selectedRowKeys.length === 0}>delete more</Button>
                  </Popconfirm>

                </>
              )
            }
          </>
        )} />
    </div>
  )
}

export default Form.create()(ArticleManager)
