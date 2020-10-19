
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message, Badge, Popconfirm } from 'antd'
import TableList from '@tableList'
import Drawer from '@components/draw/draw'
import {
  // fetchButtonList,
  fetchModuleDelete,
  fetchChangeModuleStatus,
} from '@apis/manage'

export default class pop extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
    this.deleteButton = this.deleteButton.bind(this)
  }

  componentWillMount() {
    // this.getList()
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // this.getList()
  }

  // 删除
  deleteButton = (id) => {
    fetchModuleDelete({ id: id }, (result) => {
      message.success(result.msg)
      this.props.updateList()
    })
  }

  showOrHide=(id, val) => {
    fetchChangeModuleStatus({ id: id, status: val }, (result) => {
      this.props.updateList()
    })
  }

  column() {
    const self = this
    const { editButton } = self.props
    const configArr = [
      {
        title: '按钮名称',
        dataIndex: 'resName',
        key: 'resName',
        width: '40%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: (text, record, index) => {
          if (text === 1) {
            return <Badge status="warning" text="未上线" />
          }
          return <Badge status="success" text="已上线" />
        },
      },
      {
        title: '操作',
        dataIndex: 'caozuo',
        key: 'caozuo',
        width: '40%',
        render: (text, record, index) => (
          <span>
            <Popconfirm
              title={`确定${record.status !== 1 ? '下线' : '上线'}该按钮?`}
              onConfirm={() => self.showOrHide(record.id, `${record.status}`)}
            >
              <a>{record.status !== 1 ? '下线' : '上线'}</a>
            </Popconfirm>
            <span className="ant-divider" />
            <a onClick={() => editButton(record)}>修改</a>
            <span className="ant-divider" />
            <Popconfirm title="删除?" onConfirm={() => self.deleteButton(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
    return configArr
  }

  footer() {
    const { addButton } = this.props
    return (
      <div>
        <Button type="primary" onClick={addButton}>新增</Button>
      </div>
    )
  }

  render() {
    const {
      visible, cancelButton, listLoading, dataSource,
    } = this.props
    // const { dataSource } = this.state
    return (
      <Drawer
        visible={visible}
        title="模块按钮权限列表"
        onCancel={cancelButton}
        footer={this.footer()}
        size="lg"
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <TableList
            rowKey="id"
            columns={this.column()}
            dataSource={dataSource}
            loading={listLoading}
          />
        </div>
      </Drawer>
    )
  }
}
