import React, { useState } from 'react'
import { Table, Button, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalComponent from '../Modal/ModalComponent'
import './TableComponent.css'

const TableComponent = () => {
  const [data, setData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [searchValue, setSearchValue] = useState('')

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
          <Button type='danger' onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ]

  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const handleEdit = (record) => {
    setIsVisible(true)
    setEditingData(record)
  }

  const handleDelete = (record) => {
    setData(data.filter((data) => data.key !== record.key))
  }

  const handleAdd = () => {
    setIsVisible(true)
    setEditingData(null)
  }

  const filteredData = searchValue
    ? data.filter((obj) => {
        return Object.values(obj)
          .toString()
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      })
    : data

  return (
    <>
      <ModalComponent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        editingData={editingData}
        setData={setData}
        data={data}
        setEditingData={setEditingData}
      />
      <Input.Search
        placeholder='Поиск...'
        onChange={(e) => handleSearch(e.target.value)}
        className='inputSearch'
      />
      <Button type='primary' onClick={handleAdd} className='addButton'>
        Добавить
      </Button>
      <Table columns={columns} dataSource={filteredData} />
    </>
  )
}

export default TableComponent
