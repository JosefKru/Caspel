import { Button, DatePicker, Form, Input, Modal } from 'antd'
import React from 'react'
import './ModalComponent.css'

const ModalComponent = ({ isVisible, setIsVisible, editingData, setData }) => {
  const handleCancel = () => {
    setIsVisible(false)
  }
  const handleSave = (values) => {
    console.log(editingData)
    if (editingData) {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingData.key ? { ...item, ...values } : item
        )
      )
    } else {
      setData((prevData) => [...prevData, { ...values, key: Date.now() }])
    }
    setIsVisible(false)
  }

  return (
    <Modal
      title='Добавить запись'
      open={isVisible}
      onCancel={handleCancel}
      footer={false}
    >
      <Form onFinish={handleSave}>
        <Form.Item
          label='Имя'
          name='name'
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Дата'
          name='date'
          rules={[{ required: true, message: 'Введите дату' }]}
        >
          <DatePicker className='datePicker' />
        </Form.Item>
        <Form.Item
          label='Числовое значение'
          name='value'
          rules={[{ required: true, message: 'Введите числовое значение' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalComponent
