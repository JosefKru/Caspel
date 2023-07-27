import React, { useState } from 'react'
import { Table, Button, Modal, Input } from 'antd'
import ModalComponent from '../Modal/ModalComponent'

const TableComponent = () => {
  const [data, setData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [editingData, setEditingData] = useState(null)

  const columns = []

  const handleSearch = () => {}

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
      />
      <Input.Search
        placeholder='Поиск...'
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button type='primary' onClick={handleAdd} style={{ marginBottom: 16 }}>
        Добавить
      </Button>
      <Table columns={columns} />
    </div>
  )
}

export default TableComponent
