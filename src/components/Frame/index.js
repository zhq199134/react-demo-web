import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllNotifications } from '../../actions/notifications'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import logo from './logo.png'
import './Frame.less'

const { Header, Content, Sider } = Layout
const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(
      s => s.hasRead === false
    ).length
  }
}
@connect(mapState, {
  getAllNotifications
})
@withRouter
class Frame extends Component {
  menuOnclick = ({ key }) => {
    this.props.history.push(key)
  }
  dropdownMenuClick = ({ key }) => {
    this.props.history.push(key)
  }
  showDropDown = () => (
    <Menu onClick={this.dropdownMenuClick}>
      <Menu.Item key="/admin/notifications">
        <Badge dot={Boolean(this.props.notificationsCount)}>通知中心</Badge>
      </Menu.Item>
      <Menu.Item key="/admin/settings">个人设置</Menu.Item>
      <Menu.Item key="/login">退出登录</Menu.Item>
    </Menu>
  )
  componentDidMount() {
    this.props.getAllNotifications()
  }
  render() {
    const selectedKeysArr = this.props.location.pathname.split('/')
    selectedKeysArr.length = 3

    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header qf-header">
          <div className="qf-logo">
            <img src={logo} alt="QFADMIN"></img>
          </div>
          <div>
            <Dropdown overlay={this.showDropDown()}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span>欢迎您！张虎强</span>
                <Badge
                  count={this.props.notificationsCount}
                  offset={[-10, -10]}
                >
                  <DownOutlined />
                </Badge>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[selectedKeysArr.join('/')]}
              onClick={this.menuOnclick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {this.props.menus.map(item => {
                return (
                  <Menu.Item key={item.pathname}>
                    {item.icon}
                    {item.title}
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              className="site-layout-background"
              style={{
                backgroundColor: '#fff',
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default Frame
