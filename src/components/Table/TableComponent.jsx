import React, { useState } from 'react'
import { Table, Button, Input } from 'antd'
import ModalComponent from '../Modal/ModalComponent'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const TableComponent = () => {
  const [data, setData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [editingData, setEditingData] = useState(null)

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Числовое значение',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type='primary' onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type='danger' onClick={() => handleDelete(record.key)}>
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ]

  const handleSearch = () => {}
  const handleEdit = () => {}
  const handleDelete = () => {}

  const handleAdd = () => {
    setIsVisible(true)
  }

  return (
    <div>
      <ModalComponent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        editingData={editingData}
        setData={setData}
        data={data}
      />
      <Input.Search
        placeholder='Поиск...'
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button type='primary' onClick={handleAdd} style={{ marginBottom: 16 }}>
        Добавить
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TableComponent
