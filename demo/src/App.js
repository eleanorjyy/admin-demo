import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import './App.css';
import { Layout } from 'antd';
import { Table } from 'antd';
import ProductForm from '../src/components/ProductForm.js';
import { Link,BrowserRouter} from 'react-router-dom';
import { Router, Route, IndexRoute} from 'react-router';
import $ from 'jquery';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    var plength = 6;
    var boxlist = []
    for (var i=0;i<plength;i++){
      boxlist.push(<ProductForm boxid={i} />);
    }
    console.log(plength);

    return (
      <div className="App">
        <Layout>
          <Header>
            
              <ul className="nav">
                <li><a href={'/product'}>商品</a></li>
                <li><a href={'/order'}>订单</a></li>
            </ul>
          </Header>
          <Content>
            {boxlist}
            
            
          </Content>
          <Footer>
          Footer
          </Footer>
        </Layout>

      </div>
    );
  }
}



export default App;
