import React, { Component } from 'react'
import { Card, Upload, Spin } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/user'
@connect(state => ({ avatar: state.user.avatar }), { changeAvatar })
class Profile extends Component {
  state = {
    isUploading: false,
    avatar: ''
  }
  handleAvatarUpload = ({ file }) => {
    const data = new FormData()
    data.append(
      'Token',
      'd44626a8e49f585a5ee00da054f8d6e817c5836f:_NvgXkG6XblOWHpvIJa5C47foJw=:eyJkZWFkbGluZSI6MTU4NDI4Njk3OSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzEyOTI0IiwiYWlkIjoiMTY3MTM3MCIsImZyb20iOiJmaWxlIn0='
    )
    data.append('file', file)
    this.setState({
      isUploading: true
    })
    axios
      .post('http://up.imgapi.com/', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isUploading: false
          })
          this.props.changeAvatar(res.data.linkurl)
        } else {
          //处理错误
        }
      })
      .catch(() => {
        //处理错误
      })
  }
  render() {
    return (
      <Card title="个人设置" bordered={false}>
        <Upload
          style={{
            border: '1px dashed #dedede',
            height: 80,
            width: 80,
            display: 'block'
          }}
          showUploadList={false}
          customRequest={this.handleAvatarUpload}
        >
          <Spin spinning={this.state.isUploading}>
            {this.props.avatar ? (
              <img
                style={{ height: 80, width: 80 }}
                src={this.props.avatar}
                alt="头像"
              />
            ) : (
              <span>点击上传</span>
            )}
          </Spin>
        </Upload>
      </Card>
    )
  }
}
export default Profile
