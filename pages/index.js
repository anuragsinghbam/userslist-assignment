import Head from 'next/head'
import { Row, Col } from 'antd'
import User from '@/components/UserCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
  }, [])

  const updateUser = (id, values) => {
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user.id === id) return { ...user, ...values }
        return user
      })
    )
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <>
      <Head>
        <title>Users List</title>
        <meta
          name="description"
          content="This app shows the list of ten users."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!users.length && (
          <div>
            <div className="spinner">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          </div>
        )}
        <Row>
          {users.map((user) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={user.username}>
              <User {...{ ...user, updateUser, deleteUser }} />
            </Col>
          ))}
        </Row>
      </main>
    </>
  )
}
