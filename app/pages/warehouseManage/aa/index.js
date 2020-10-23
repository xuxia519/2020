import React, { Component } from 'react';
import { Modal, Card } from 'antd'
import ReactToPrint from 'react-to-print';

class aa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    };
    this.componentRef = null;
  }

  componentDidMount() {
    
  }

  handleClick = () => {
    this.setState({
      visible: true
    })
  }
  render() {
    const listData = [1,2,3]
    return (
      <div className="page">
        <a onClick={this.handleClick}>打印</a>
        <div>
          <Modal
            title="打印付款通知书"
            visible={this.state.visible}
            footer={
              <div>
                <ReactToPrint
                  trigger={() => <span>打印</span>}
                  content={() => this.componentRef}
                />
              </div>
              //将打印功能的一个按钮放入到FOOTER里
            }
            width={1200}
          >
           
          </Modal>

          <div ref={el => (this.componentRef = el)} >
          {listData.length > 0 ? listData.map((e, index) => (
            <div className="cardHtml" style={{ pageBreakAfter: 'always' }} key={index}>
              <Card title="付款通知书" bordered={false}  >
                {index}{index}{index}{index}{index}{index}{index}{index}
              </Card>
            </div>
          )) : ''}
          </div>
        </div>
      </div>
    )
  }
}
export default aa;