import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button, Row, Col, Icon } from 'antd'
import "../../styles/index.less"
// import {connect} from 'react-redux'
// import {} from '@actions/xxx'
// import Socket from '@configs/socket'

// @connect((storeState)=>({}))

export default class app extends Component {
  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  // 发送socket数据
  onClickSend = () => {
    // Socket.send({ type: 'receive/hello3', data: { name: 'dupi' } })
  }

  render() {
    return (
      <div className="home">
        <Row gutter={10}>
          <Col span={16}>
            <div className="lunbo">
              <img src={require('../../images/1.png')} width="100%"/>
            </div>
          </Col>
          <Col span={8}>
            <div className="common">
              <h5><Icon type="caret-right" />常用应用</h5>
              <ul>
                <li><Icon type="right" />工位器具管理系统</li>
                <li><Icon type="right" />EDL-WEB</li>
                <li><Icon type="right" />EDL-WEB</li>
                <li><Icon type="right" />EDL-WEB</li>
                <li><Icon type="right" />EDL-WEB</li>
                <li><Icon type="right" />EDL-WEB</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: '20px'}}>
          <Col span={8}>
            <div className="common">
              <h5><Icon type="caret-right" />常用应用</h5>
              <ul>
                <li><Icon type="right" />工位器具管理系统</li>
                <li><Icon type="right" />EDL-WEB</li>
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="common">
              <h5><Icon type="caret-right" />常用应用</h5>
              <ul>
                <li><Icon type="right" />工位器具管理系统</li>
                <li><Icon type="right" />EDL-WEB</li>
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="common">
              <h5><Icon type="caret-right" />常用应用</h5>
              <ul>
                <li><Icon type="right" />工位器具管理系统</li>
                <li><Icon type="right" />EDL-WEB</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
