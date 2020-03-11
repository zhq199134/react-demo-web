import React, { Component, createRef } from 'react'
import { Form, Input, Card, Button, DatePicker, Spin, message } from 'antd'
import E from 'wangeditor'
import './edit.less'
import moment from 'moment'
import { getArticleById, saveArticle } from '../../services'
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
    this.editorRef = createRef()
    this.formRef = createRef()
    this.state = {
      isLoading: false
    }
  }

  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    // html 即变化之后的内容
    this.editor.customConfig.onchange = html => {
      this.formRef.current.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }
  componentDidMount() {
    this.initEditor()
    this.setState({
      isLoading: true
    })
    getArticleById(this.props.match.params.id)
      .then(res => {
        //设置页面数据
        //*****通过结构将res分解为id和其他的两个对象******//
        const { id, ...data } = res
        data.createAt = moment(data.createAt)
        this.formRef.current.setFieldsValue(data)
        this.editor.txt.html(data.content)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  onFinish = values => {
    const data = Object.assign({}, values, {
      createAt: values.createAt.valueOf()
    })
    this.setState({
      isLoading: true
    })
    saveArticle(this.props.match.params.id, data)
      .then(res => {
        message.success(res.msg)
        this.props.history.push('/admin/article')
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }
  render() {
    return (
      <Card
        title="编辑文章"
        bordered={false}
        extra={<Button onClick={this.props.history.goBack}>取消</Button>}
      >
        <Spin spinning={this.state.isLoading}>
          <Form {...formItemLayout} ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item
              name="title"
              label="文章标题"
              rules={[
                {
                  required: true,
                  message: '文章标题不能为空'
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
              <div className="qf-editor" ref={this.editorRef}></div>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}
export default ArticleEdit
