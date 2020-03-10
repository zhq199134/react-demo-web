import React, { Component, createRef } from 'react'
import { Form, Input, Card, Button, DatePicker } from 'antd'
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
}
class ArticleEdit extends Component {
  constructor() {
    super()
    // this.state = {
    //   titleValidtorStatus: '',
    //   titleHelp: ''
    // }
  }
  formRef = createRef()

  onOk(value) {
    console.log('onOk: ', value)
  }
  render() {
    return (
      <Card title="编辑文章" bordered={false} extra={<Button>取消</Button>}>
        <Form {...formItemLayout} ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            name="title"
            label="文章标题"
            // validateStatus={this.state.titleValidtorStatus}
            // help={this.state.titleHelp}
            rules={[
              {
                required: true,
                message: '文章标题不能为空'
                /*自定义校验规则 */
                // validator: (rule, value, callback) => {
                //   try {
                //     if (value !== '123') {
                //       this.setState({
                //         titleValidtorStatus: 'error',
                //         titleHelp: '标题不能为空'
                //       })
                //     } else {
                //       this.setState({
                //         titleValidtorStatus: '',
                //         titleHelp: ''
                //       })
                //     }
                //     callback()
                //   } catch (err) {
                //     callback(err)
                //   }
                // }
              }
            ]}
          >
            <Input placeholder="标题" />
          </Form.Item>
          <Form.Item
            name="author"
            label="文章作者"
            rules={[
              {
                required: true,
                message: '文章作者不能为空'
              }
            ]}
          >
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="文章阅读量"
            rules={[
              {
                required: true,
                message: '文章阅读量不能为空'
              }
            ]}
          >
            <Input placeholder="0" />
          </Form.Item>
          <Form.Item
            name="createAt"
            label="创建时间"
            rules={[
              {
                required: true,
                message: '创建时间不能为空'
              }
            ]}
          >
            <DatePicker showTime placeholder="请选择时间" />
          </Form.Item>
          <Form.Item
            name="content"
            label="文章内容"
            rules={[
              {
                required: true,
                message: '文章内容不能为空'
              }
            ]}
          >
            <div>这里是内容</div>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default ArticleEdit
