import { Button, Card, Form, Input, Modal } from 'antd'
import {
  MailOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteFilled,
  PhoneOutlined,
  GlobalOutlined,
  EditOutlined,
} from '@ant-design/icons'

import React, { useState } from 'react'
import styles from './UserCard.module.css'

export default function UserCard(props) {
  const { id, name, email, phone, website, username, updateUser, deleteUser } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    const noError = form.getFieldsError().every(({ errors }) => {
      return !errors.length
    })
    if (noError) {
      updateUser(id, form.getFieldValue())
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ name, email, website, phone }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input user's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input user's email!" },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input user's phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
            rules={[
              { required: true, message: "Please input user's website!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Card
        className={styles.card}
        cover={
          <img
            alt="example"
            src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg`}
          />
        }
        actions={[
          <span onClick={toggleLike}>
            {isLiked ? (
              <HeartFilled
                style={{ fontSize: 18, color: '#f00' }}
                key="heart"
              />
            ) : (
              <HeartOutlined
                style={{ fontSize: 18, color: '#f00' }}
                key="heart"
              />
            )}
          </span>,
          <EditOutlined
            onClick={showModal}
            style={{ fontSize: 18 }}
            key="edit"
          />,
          <DeleteFilled onClick={() => deleteUser(id)} style={{ fontSize: 18 }} key="delete" />,
        ]}
      >
        <h3>{name}</h3>
        <p>
          <MailOutlined style={{ fontSize: 18 }} /> &nbsp; {email}
        </p>
        <p>
          <PhoneOutlined style={{ fontSize: 18 }} /> &nbsp; {phone}
        </p>
        <p>
          <GlobalOutlined style={{ fontSize: 18 }} /> &nbsp; https://{website}
        </p>
      </Card>
    </>
  )
}
