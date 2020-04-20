import React, { useState } from 'react'
import { Table, Input, Tag, Form, Switch, Button, Popconfirm, Select, DatePicker } from 'antd'

import axios from '@/utils/axios'
import moment from 'moment'

import useAntdTable from '@/hooks/useAntdTable'
import useBreadcrumb from '@/hooks/useBreadcrumb'

const typeMapList = [
  { value: 1, label: 'github user' },
  { value: 2, label: 'blog user' }
]

function AdminUser(props) {
  useBreadcrumb(['user management'])
  const { getFieldDecorator } = props.form
  const [queryParams, setQueryParams] = useState({})
  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/user/list',
    queryParams,
    columns: [
      { title: 'user name', dataIndex: 'username' },
      { title: 'email', dataIndex: 'email' },
      {
        title: 'email notice',
        dataIndex: 'notice',
        render: (text, record) => (
          <Switch
            defaultChecked={text}
            onChange={checked => updateList(() => axios.put(`/user/${record.id}`, { notice: checked }))}
          />
        )
      },
      {
        title: 'banned',
        dataIndex: 'disabledDiscuss',
        render: (text, record) => (
          <Switch
            defaultChecked={text}
            onChange={checked => updateList(() => axios.put(`/user/${record.id}`, { disabledDiscuss: checked }))}
          />
        )
      },
      {
        title: 'type',
        dataIndex: 'type',
        render: (text, record) => {
          return record.github ? <Tag color='#1890ff'>github user</Tag> : <Tag color='magenta'>blog user</Tag>
        }
      },
      {
        title: 'creation date',
        dataIndex: 'createdAt',
        sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
      },
      {
        dataIndex: 'id',
        title: 'edit',
        render: (userId, record) => (
          <Popconfirm
            title='Are you sure？'
            onConfirm={e => updateList(() => axios.delete(`/user/${userId}`))}>
            <a className='delete-text'>Delete</a>
          </Popconfirm>
        )
      }
    ]
  })

  function handleSubmit(e) {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        if (Array.isArray(values.rangeDate)) {
          values.rangeDate = values.rangeDate.map(m => m.format('YYYY-MM-DD'))
        }
        setQueryParams({ ...queryParams, ...values })
        onSearch({ ...queryParams, ...values })
      }
    })
  }

  return (
    <>
      {/* 检索 */}
      <Form layout='inline' onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <Form.Item label='userName'>
          {getFieldDecorator('username')(
            <Input placeholder='enter the name' allowClear />
          )}
        </Form.Item>

        <Form.Item label='userType'>
          {getFieldDecorator('type')(
            <Select style={{ width: 200 }} allowClear>
              {typeMapList.map(item => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label='creationDate'>
          {getFieldDecorator('rangeDate')(
            <DatePicker.RangePicker />
          )}
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>Index</Button>

        </Form.Item>
      </Form>

      <Table {...tableProps} />
    </>
  )
}

export default Form.create()(AdminUser)
