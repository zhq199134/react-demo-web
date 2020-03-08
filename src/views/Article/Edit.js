import React, { Component } from 'react'
import { Card, Button } from 'antd'
export default class ArticleEdit extends Component {
  render() {
    console.log(this.props)

    return (
      <Card title="编辑文章" bordered={false} extra={<Button>取消</Button>}>
        文章表单
      </Card>
    )
  }
}
