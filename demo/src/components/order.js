import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Table, Divider, Tag } from 'antd';
import { Input,Upload, Icon, message } from 'antd';
import { Modal } from 'antd';
import { Layout } from 'antd';
import { Menu} from 'antd';
import { Pagination } from 'antd';
import './order.css';
import Orderbox from './orderbox.js';
import Pagecontainer from './Pagecontainer.js'
import Deal from './Deal.js';
import Complete from './Complete.js';


class Navbar extends React.Component {
  state = {
    current: 'order-list',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }



  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"

      >
        <Menu.Item key="order-list">
          <Icon type="order-list" /><a href={'/order'}>订单</a>
        </Menu.Item>
        <Menu.Item key="loading">
          <Icon type="loading" /><a href={'/order/deal'}>处理中</a>
        </Menu.Item>
        <Menu.Item key="finish">
          <Icon type="loading" /><a href={'/order/complete'}>已完成</a>
        </Menu.Item>
        <Menu.Item key="schedule">
          <a href="https://www.canadapost.ca/trackweb/en" target="_blank" rel="noopener noreferrer">Canada Post</a>
        </Menu.Item>
      </Menu>
    );
  }
}



const { Header, Footer, Content } = Layout;

const Order=()=>{
    return (

        <div className="order-container">
        	<Layout>
        		<Header>
        			<ul className="nav">
		                <li><a href={'/product'}>商品</a></li>
		                <li><a href={'/order'}>订单</a></li>
            		</ul>
        		</Header>
        		<Content className="content-box">
        			<Navbar />
        			<Pagecontainer />,
        		</Content>
        	</Layout>

            
        </div>
    );
}

export default Order;




