import React, { Component } from "react";
import { Card, Button, Table, Tag } from "antd";
import { getArticles } from "../../services";
import moment from "moment";
const titleDisplayMap = {
  id: "序号",
  title: "标题",
  author: "作者",
  createAt: "创建时间",
  amount: "阅读量"
};
export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      columns: []
    };
  }
  createDisplayColumns = columnkeys => {
    return columnkeys.map(item => {
      if (item === "amount")
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { amount } = record;
            return <Tag color={amount > 200 ? "red" : "green"}>{amount}</Tag>;
          }
        };
      if (item === "createAt") {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { createAt } = record;
            return moment(createAt).format("YYYY年MM月DD日 HH:mm:ss");
          }
        };
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      };
    });
  };
  getArticleList = () => {
    getArticles().then(res => {
      const columnkeys = Object.keys(res.list[0]);
      const columns = this.createDisplayColumns(columnkeys);
      this.setState({
        total: res.total,
        dataSource: res.list,
        columns
      });
    });
  };
  componentDidMount() {
    this.getArticleList();
  }

  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        extra={<Button>导出到Excel</Button>}
      >
        <Table
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{ total: this.state.total, hideOnSinglePage: true }}
        />
      </Card>
    );
  }
}
