import React, { Component } from 'react'
import { Progress } from 'antd'

export default class developing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // activeTab: 'pop' ,
    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="developing">
        <Progress
          type="circle"
          percent={100}
          format={() => '即将上线，敬请期待...'}
          width={200}
          status="active"
        />
      </div>
    )
  }
}
