import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'
import './login.less'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 }
}
@connect(
  state => ({ isLogin: state.user.isLogin, isLoading: state.user.isLoading }),
  { login }
)
class Login extends Component {
  onFinish = values => {
    this.props.login(values)
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  render() {
    return this.props.isLogin ? (
      <Redirect to="/admin" />
    ) : (
      <Card title="登录" className="login-wapper">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名是必填的！' }]}
            colon={false}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码是必填的！' }]}
            colon={false}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={4}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={4}>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.props.isLoading}
              >
                登录
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Login
