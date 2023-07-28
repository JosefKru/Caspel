import { Button, DatePicker, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import './ModalComponent.css'
import moment from 'moment/moment'

const ModalComponent = ({
  isVisible,
  setIsVisible,
  editingData,
  setData,
  setEditingData,
}) => {
  const [form] = Form.useForm()

  // Эффект для обновления значений формы при изменении editingData
  useEffect(() => {
    if (editingData) {
      // Если редактируется существующая запись, устанавливаем значения формы из editingData (вместо initialValues={editingData})
      form.setFieldsValue({
        name: editingData.name,
        date: moment(editingData.date),
        value: editingData.value,
      })
    } else {
      // Если добавляется новая запись, сбрасываем значения формы
      form.resetFields()
    }
  }, [editingData, form])

  const handleCancel = () => {
    setIsVisible(false)
  }

  const handleSave = (values) => {
    const formattedDate = moment(values.date).format('YYYY-MM-DD')

    if (editingData) {
      // Если редактируется существующая запись, обновляем ее в массиве данных
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingData.key
            ? { ...item, ...values, date: formattedDate }
            : item
        )
      )
      setEditingData(values)
    } else {
      // Если добавляется новая запись, добавляем ее в массив данных
      setData((prevData) => [
        ...prevData,
        { ...values, date: formattedDate, key: Date.now() },
      ])
      setEditingData(values)
    }
    setIsVisible(false)
  }

  return (
    <Modal
      title={editingData ? 'Редактировать данные' : 'Добавить запись'}
      open={isVisible}
      onCancel={handleCancel}
      footer={false}
    >
      <Form onFinish={handleSave} form={form}>
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
