import React from 'react'
import { Button } from 'antd'
const Login = ({ history }) => {
  function LoginFunc() {
    console.log(history)
    history.push(`${process.env.PUBLIC_URL}/`)
  }
  return (
    <div>
      <Button type="primary" onClick={LoginFunc}>
        Login
      </Button>
      <Button type="primary" onClick={LoginFunc}>
        test for conflict
      </Button>
      <Button type="primary" onClick={LoginFunc}>
        haha
      </Button>
      <Button type="primary" onClick={LoginFunc}>
        houhou
      </Button>
      <Button type="primary" onClick={LoginFunc}>
        hai
      </Button>
    </div>
  )
}

export default Login
