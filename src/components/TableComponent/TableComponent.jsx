import { Button, Input, Table } from 'antd'
import React from 'react'
import './TableComponent.css'

const TableComponent = () => {
  const handleSearch = () => {}
  const handleAdd = () => {}

  return (
    <div>
      <Input.Search
        placeholder='Поиск...'
        onChange={(e) => handleSearch(e.target.value)}
        className='inputSearch'
      />
      <Button type='primary' onClick={handleAdd} className='addButton'>
        Добавить
      </Button>
      <Table />
    </div>
  )
}

export default TableComponent
