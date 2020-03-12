import React, { Component, createRef, Fragment } from 'react'
import { Card, Row, Col } from 'antd'
import { getArticleAmount } from '../../services'
import echarts from 'echarts'
import './dashboard.less'
export default class Dashboard extends Component {
  constructor() {
    super()
    this.articleAmountRef = createRef()
  }
  initArticleChart = () => {
    getArticleAmount().then(res => {
      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.amount.map(item => item.month)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: res.amount.map(item => item.value),
            type: 'line',
            areaStyle: {}
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.articleChart.setOption(option)
    })
  }
  componentDidMount() {
    this.articleChart = echarts.init(this.articleAmountRef.current)
    this.initArticleChart()
  }
  render() {
    return (
      <Fragment>
        <Card title="概览" bordered={false}>
          <Row gutter={16}>
            <Col span={6} className="gutter-row">
              <div
                className="qf-gutter-box"
                style={{ backgroundColor: '#ffab91' }}
              >
                col-6
              </div>
            </Col>
            <Col span={6} className="gutter-row">
              <div
                className="qf-gutter-box"
                style={{ backgroundColor: '#b39ddb' }}
              >
                col-6
              </div>
            </Col>
            <Col span={6} className="gutter-row">
              <div
                className="qf-gutter-box"
                style={{ backgroundColor: '#c5e1a5' }}
              >
                col-6
              </div>
            </Col>
            <Col span={6} className="gutter-row">
              <div
                className="qf-gutter-box"
                style={{ backgroundColor: '#80deea' }}
              >
                col-6
              </div>
            </Col>
          </Row>
        </Card>
        <Card title="最近浏览量" bordered={false}>
          <div ref={this.articleAmountRef} style={{ height: '350px' }}></div>
        </Card>
      </Fragment>
    )
  }
}
