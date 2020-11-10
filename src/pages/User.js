import React from 'react';
import _ from 'lodash';
import { Table, Space, Modal, Form, Input, Button } from 'antd';

import data from '../mock/data';

const { Column } = Table;
const { Item } = Form;
const { Search } = Input;

function User(props) {
  return (
    <>
      <Button onClick={props.showAddConfirm}>添加用户</Button>
      <Search placeholder="请输入用户名/联系方式/邮箱"  enterButton onSearch={props.onSearch}/>
      <Table dataSource={props.users}>
        <Column
          title='姓名'
          dataIndex={props.users.name}
          key={props.users.name}
          render={(text, record) => (
            <span>{record.name}</span>
          )} />
        <Column
          title='手机号码'
          dataIndex={props.users.mobile}
          key={props.users.mobile}
          render={(text, record) => (
            <span>{record.mobile}</span>
          )} />
        <Column
          title='邮箱'
          dataIndex={props.users.email}
          key={props.users.email}
          render={(text, record) => (
            <span>{record.email}</span>
          )} />
        <Column
          title='操作'
          key='action'
          render={(text, record) => (
            <Space size="middle">
              <a onClick={() => { props.showEditConfirm(record) }}>编辑</a>
              <a onClick={() => { props.showDeleteConfirm(record.id) }}>删除</a>
            </Space>
          )} />

      </Table>
      <Modal
        destroyOnClose
        title={props.isEdit ? '编辑用户' : '添加用户'}
        visible={props.isShowModal}
        footer={false}
        onCancel={props.handleModalCancel}
      >
        <Form
          name={"editUserModal"}
          onFinish={props.handleModalConfirm}
        >
          <Item labelAlign='left' name='id' initialValue={_.get(props.user, 'id')} style={{ display: 'none' }}>
            <Input />
          </Item>
          <Item
            labelAlign='left'
            name='name'
            initialValue={_.get(props.user, 'name')}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}>
            <Input placeholder='请输入用户名' />
          </Item>
          <Item
            labelAlign='left'
            name='mobile'
            initialValue={_.get(props.user, 'mobile')}
            rules={[
              {
                required: true,
                message: '请输入联系方式!',
              },
            ]}>
            <Input placeholder='请输入联系方式' />
          </Item>
          <Item
            labelAlign='left'
            name='email'
            initialValue={_.get(props.user, 'email')}
            rules={[
              {
                required: true,
                message: '请输入邮箱!',
              },
            ]}>
            <Input placeholder='请输入邮箱' />
          </Item>
          <Button type="primary" htmlType="submit" size={'middle'}>
            提交
          </Button>
        </Form>
      </Modal>
    </>
  )
}

let hoc = WrappedComponent => {
  return class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        users: [],
        isShowModal: false,
        isEdit: true,
        storeUsers:[]
      }
    }

    async componentDidMount() {
      this.setState({ users: data, storeUsers: data });
    }

    showDeleteConfirm = (id) => {
      Modal.confirm({
        title: '确认删除用户吗',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.delete(id)
        }
      });
    }

    delete = (id) => {
      let { users, storeUsers } = this.state;
      users = _.filter(users, user => user.id !== id);
      storeUsers = _.filter(storeUsers, user => user.id !== id);
      this.setState({ users, storeUsers });
    }

    showEditConfirm = (user) => {
      this.setState({ user, isShowModal: true, isEdit: true });
    }

    handleModalConfirm = (values) => {
      let { storeUsers, isEdit } = this.state;
      if (isEdit) {
        _.each(storeUsers, item => {
          if (item.id === values.id) {
            Object.assign(item, values);
          }
        })
        this.setState({ storeUsers, users: storeUsers, isShowModal: false });
        return;
      }
      values.id = _.last(storeUsers).id + 1;
      storeUsers = [...storeUsers, values];
      this.setState({ storeUsers, users: storeUsers, isShowModal: false });
    }

    handleModalCancel = () => {
      this.setState({ isShowModal: false });
    }

    showAddConfirm = () => {
      this.setState({ isEdit: false, isShowModal: true, user: [] });
    }

    onSearch = (values) => {
      let { users, storeUsers } = this.state;
      storeUsers = _.unionBy(storeUsers, 'id');
      if( values ) {
        users = _.filter(storeUsers, item => _.includes(item.name, values) || _.includes(item.email, values) || _.includes(item.mobile, values));
        this.setState({ users });
        return;
      }
      this.setState({ users: storeUsers });    
    }

    render() {
      return <WrappedComponent
        users={this.state.users}
        user={this.state.user}
        isShowModal={this.state.isShowModal}
        isEdit={this.state.isEdit}
        showDeleteConfirm={(id) => this.showDeleteConfirm(id)}
        showEditConfirm={(user) => this.showEditConfirm(user)}
        handleModalConfirm={this.handleModalConfirm}
        handleModalCancel={this.handleModalCancel}
        showAddConfirm={this.showAddConfirm}
        onSearch={this.onSearch}
      />
    }

  }
}

export default hoc(User);