import React, { Component } from 'react'
import XLSX from 'xlsx'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'
import { getArticles, deleteArticle as deleteArticleById } from '../../services'
import moment from 'moment'
const titleDisplayMap = {
  id: '序号',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}
export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
      deleteArticleTitle: null,
      isShowArticleModal: false,
      deleteArticleConfimLoading: false,
      deleteArticleID: null
    }
  }
  toEdit = id => {
    // this.props.history.push({
    //   pathname: `/admin/artical/edit/${record.id}`,
    //   state: {
    //     title: record.title
    //   }
    // })
    this.props.history.push(`/admin/article/edit/${id}`)
  }
  createDisplayColumns = columnkeys => {
    const columns = columnkeys.map(item => {
      if (item === 'amount')
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { amount } = record
            return (
              <Tooltip
                title={amount > 200 ? '超过200阅读量' : '未超过200阅读量'}
              >
                <Tag color={amount > 200 ? 'red' : 'green'}>{amount}</Tag>
              </Tooltip>
            )
          }
        }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { createAt } = record
            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: record => {
        return (
          <>
            <Button
              size="small"
              type="primary"
              onClick={this.toEdit.bind(this, record.id)}
            >
              编辑
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={this.showDeleteArticleModel.bind(this, record)}
            >
              删除
            </Button>
          </>
        )
      }
    })
    return columns
  }
  showDeleteArticleModel = record => {
    // Modal.confirm({
    //   title: '此操作不可逆，请谨慎！！！',
    //   content: (
    //     <Typography>
    //       确定要删除<span style={{ color: '#f00' }}>{record.title}</span>吗？
    //     </Typography>
    //   ),
    //   onOk() {
    //     deleteArticle(record.id).then(res => {
    //       console.log(res)
    //     })
    //   }
    // })
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleConfimLoading: false,
      deleteArticleID: record.id
    })
  }
  deleteArticle = () => {
    this.setState({
      deleteArticleConfimLoading: true
    })
    deleteArticleById(this.state.deleteArticleID)
      .then(res => {
        message.success(res.msg)
        this.setState(
          {
            offset: 0
          },
          () => {
            this.getArticleList()
          }
        )
      })
      .catch(err => {
        //处理错误
      })
      .finally(() => {
        this.setState({
          deleteArticleConfimLoading: false,
          isShowArticleModal: false
        })
      })
  }
  getArticleList = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(res => {
        const columnkeys = Object.keys(res.list[0])
        const columns = this.createDisplayColumns(columnkeys)
        //如果组件没有挂载 则返回
        if (!this.updater.isMounted(this)) return
        this.setState({
          total: res.total,
          dataSource: res.list,
          columns
        })
      })
      .catch(err => {
        //处理错误
      })
      .finally(() => {
        //如果组件没有挂载 则返回
        if (!this.updater.isMounted(this)) return
        this.setState({
          isLoading: false
        })
      })
  }
  onChange = (page, pageSize) => {
    this.setState(
      {
        offset: pageSize * (page - 1),
        limited: pageSize
      },
      () => {
        this.getArticleList()
      }
    )
  }
  onShowSizeChange = (current, size) => {
    this.setState(
      {
        offset: 0,
        limited: size
      },
      () => {
        this.getArticleList()
      }
    )
  }
  exportExcel = () => {
    //导出excel
    //组合数据
    const data = [Object.keys(this.state.dataSource[0])]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      const element = this.state.dataSource[i]
      // data.push(Object.values(element))
      data.push([
        element.id,
        element.title,
        element.author,
        element.amount,
        moment(element.createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'sheetjs.xlsx')
  }
  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: ''
    })
  }
  componentDidMount() {
    this.getArticleList()
  }
  componentWillMount() {}

  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        extra={<Button onClick={this.exportExcel}>导出</Button>}
      >
        <Table
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isLoading}
          pagination={{
            current: this.state.offset / this.state.limited + 1,
            total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.onChange,
            pageSizeOptions: ['10', '50', '100', '200']
          }}
        />
        <Modal
          title="此操作不可逆，请谨慎！！"
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          maskClosable={false}
          confirmLoading={this.state.deleteArticleConfimLoading}
          onOk={this.deleteArticle}
        >
          <Typography>
            确定要删除
            <span style={{ color: '#f00' }}>
              {this.state.deleteArticleTitle}
            </span>
            吗？
          </Typography>
        </Modal>
      </Card>
    )
  }
}
