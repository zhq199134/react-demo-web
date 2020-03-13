import React, { Component } from 'react'
import { Card, Button, List, Badge } from 'antd'
import { connect } from 'react-redux'

@connect(state => ({ list: state.notifications.list }))
class Notifications extends Component {
  render() {
    console.log(this.props)

    return (
      <Card
        title="通知中心"
        bordered={false}
        extra={
          <Button
            disabled={this.props.list.every(item => item.hasRead === true)}
          >
            全部标记为已读
          </Button>
        }
      >
        <div ref={this.articleAmountRef} style={{ height: '350px' }}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={item => (
              <List.Item
                extra={item.hasRead ? null : <Button>标记为已读</Button>}
              >
                <List.Item.Meta
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </div>
      </Card>
    )
  }
}
export default Notifications
