import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import Pagecomponent from './Pagecomponent.js';
import data from './tsconfig.json';
import orderdata from './boxdata.json';
import './card.css';
import './order.css'

class CardHeader extends React.Component {
  render() {
    // const { image } = this.props;
    // var style = { 
    //     backgroundImage: 'url(' + image + ')',
    // };

    return (
      <header className="card-header">
        <h4 className="card-header--title">{this.props.orderId}</h4>
      </header>
    )
  }
}

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        isDeal:false,
        
        };
        //alert(this.state.isDeal);

    }


    
    // getInitialState(){

 //    return {isDeal:false};

 //  }


 componentDidMount(){
    this.setState({isDeal:!(this.state.isDeal)


    });



  }




  render(){
    var msg;
      if (this.state.isDeal){
        msg = "未处理"


      }else{
        msg = "处理"
        
      }


    
   {
    return (

        <button className="button button-primary" onClick={this.componentDidMount.bind(this)}>
        <i className="fa fa-chevron-right"></i> {this.props.msg}
        </button>

    )
  }
}
}

class Complete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        iscomplete:false,
        
        };
        //alert(this.state.iscomplete);

    }


    
    // getInitialState(){

 //    return {isDeal:false};

 //  }


 componentDidMount(){
    
    this.setState({
        iscomplete:!(this.state.iscomplete)



    });


  }




  render(){
    // var cmsg;
    //   if (this.state.iscomplete){
    //     cmsg = "未完成"
    //   }else{
    //     cmsg = "完成"
    //   }

    
   {
    return (

        <button className="button button-primary" onClick={this.componentDidMount.bind(this)}>
        <i className="fa fa-chevron-right"></i> {this.props.cmsg}
        </button>

    )
  }
}
}




class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <p className="date">March 20 2018</p>
        
        <h2>{this.props.title}</h2>
        <div className="card-content">
            <label>联系方式</label>
            <p className="body-content">{this.props.userinfo}</p>
            <label>地址</label>
            <p className="body-content">{this.props.addr}</p>
            <label>tracking number</label>
            <p className="body-content">{this.props.track}</p>
            <label>订单号</label>
            <p className="body-content">{this.props.order}</p>
        </div>
        

      </div>
    )
  }
}

class Orderbox extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Orderdata:[],
            count:0,
        
        };
        

    }
    
    componentDidMount(){

        let count = this.state.count;
        
        this.setState({
            count:count+1,
            userdata:orderdata[count].name,
            Orderdata:orderdata[count].dealed,
            CompleteData:orderdata[count].complete,
            
            
    })


    

}


    render(){
        
        const userorders=[]
        for(let orderd of orderdata){
            var msg1;
            var cmsg1;
            if (orderd.complete==="true"){
                cmsg1 = "未完成"
            }else{
                cmsg1 = "完成"
            }
            if (orderd.dealed==="true"){
                msg1 = "处理"

                userorders.push(
                <div className="card">
                <CardHeader orderId={orderd.id}/>
                <CardBody title={orderd.name} userinfo={orderd.name} addr={orderd.addr} track={orderd.tracknum} order={orderd.id} />
                <Button msg={msg1}/>
                <Complete cmsg={cmsg1}/>
                </div>


            )
            }else{
                msg1 = "未处理"
            }
            
            
        }
        return (
        
          <div className="cards" onClick={this.componentDidMount.bind(this)}>
            {userorders}
          </div>
          



        )
  
    }
}

class Deal extends Component {

    constructor() {
        super()
        this.state = {
            orders:[],
            dataList:[],
            count:0,
            pageConfig: {
                totalPage: data.length //总页码
            }
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)


                     
        
    }

    
    getCurrentPage(currentPage) {
        let orders = this.state.orders;
        
        orders.push(<Orderbox/>)
        
        this.setState({
            // orders:orders,
            dataList:data[currentPage-1].name

        })
    }
    // createOrder(){
    //     return <Orderbox />;
    // }
    // createOrders(orders){
    //     return orders.map(this.createOrder);
    // }
    render() {
        

        
        return (
            <div ClassName="pages">
                <div className="or">
                    {this.state.orders}
                </div>
                {this.state.dataList}

                <Pagecomponent pageConfig={this.state.pageConfig}
                               pageCallbackFn={this.getCurrentPage}/>
            </div>

        )
    }
}




export default Deal;