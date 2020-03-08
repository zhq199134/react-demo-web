import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import logo from './logo.png'
import './Frame.less'

const { Header, Content, Sider } = Layout
@withRouter
class Frame extends Component {
  menuOnclick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
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
