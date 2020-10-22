import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Form, Input, Layout, Icon, message, Row, Col, Table, Select, Modal, Tag } from 'antd';

const FormItem = Form.Item;
const { Content } = Layout;
const { Option } = Select;

@Form.create({})

class packManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderColumn() {
    return [
      {
        title: "序号",
        width: '8%',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '25%',
      },
      {
        title: '权限',
        dataIndex: 'permissions',
        key: 'permissions',
        width: '25%',
        render: (text, record, index) => {
          return (
            <div>
              {
                record.permissions.map(item=>{
                  return <Tag color="processing" key={item.id}>{item.name}</Tag>
                })
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <div>
              <span>
                <a onClick={() => this.editRole(record)}>修改</a>
                <span className="ant-divider" />
              </span>
              <span>
                <a onClick={() => this.handleDelete(record)}>删除</a>
              </span>
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    
  }

  render() {
   
    return (
      <div className="page page-scrollfix page-usermanage">
        <Spin spinning={false}>
          <Layout className="page-body">
            <Content>
              出库
            </Content>
          </Layout>
        </Spin>
      </div>
    );
  }
}
export default connect((state) => state.system, { })(packManage)