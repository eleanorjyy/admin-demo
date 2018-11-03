import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import Pagecomponent from './Pagecomponent.js';
import data from './tsconfig.json';
import orderdata from './boxdata.json';
import './card.css';
import './order.css';

import userActions from '../actions/userActions';
import AuthorStore from'../stores/authorStore';

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

// class Button extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//         isDeal:false,
        
//         };
//         //alert(this.state.isDeal);

//     }


    
//     // getInitialState(){

//  //    return {isDeal:false};

//  //  }


//  componentDidMount(){
//     this.setState({isDeal:!(this.state.isDeal)


//     });



//   }




//   render(){
//     var msg;
//       if (this.state.isDeal){
//         msg = "未处理"


//       }else{
//         msg = "处理"
        
//       }



    
//    {
//     return (

//         <button className="button button-primary" onClick={this.componentDidMount.bind(this)}>
//         <i className="fa fa-chevron-right"></i> {this.props.msg}
//         </button>

//     )
//   }
// }
// }

// class Complete extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//         iscomplete:false,
        
//         };
//         //alert(this.state.iscomplete);

//     }


    
//     // getInitialState(){

//  //    return {isDeal:false};

//  //  }


//  handleClick(e) {

//     this.setState({ 
//         iscomplete: !this.state.iscomplete
//     });
//   }




//   render(){
//     // var cmsg;
//     //   if (this.state.iscomplete===false){
//     //     cmsg = "未完成"
//     //   }else{
//     //     cmsg = "完成"
//     //   }

    
//    {
//     return (

//         <button className="button button-primary" onClick={this.handleClick.bind(this)}>
//         <i className="fa fa-chevron-right"></i> {this.props.cmsg}
//         </button>

//     )
//   }
// }
// }






class CardBody extends React.Component {
  render() {
    return (
        <div className="card" id={this.props.card}>
          <CardHeader orderId={this.props.orderid}/>
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
        </div>
    )
  }
}

const Cardlist = (props) =>{

    return(
    
        <div className="cardlist" >
            {props.cradsData.map((card,i) => <CardBody key={i} card={this.props.box} cardid={i} orderid={card.id} 
                title={card.name} userinfo={card.info} addr={card.addr} track={card.tracknum} order={card.id} 
                msg={card.dealed} cmsg={card.complete}/>)}
                
        
        </div>
    )
}

class Orderbox extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            indexo:this.props.count,
            isDeal:orderdata[this.props.count].dealed,
            iscomplete:orderdata[this.props.count].complete,
            isbox:false,
            box:{}
            

        
        };
        //console.log("card"+this.state.indexo+""+"isDeal"+this.state.isDeal);
        
        
        
        
    }

    componentWillMount(){
        var cardid = this.state.box.id;
        if(cardid){
            this.setState({
                box:AuthorStore.getBoxById(cardid)
            });
            console.log(cardid);
        }
        

    }
    
    setdealState(event){
        event.preventDefault();
        let cardid = this.state.box.id;

        let dealstate = !(this.state.isDeal);
        console.log("card:"+cardid+"before:"+this.state.isDeal);
        this.setState({
            isDeal:dealstate,
            
        })

    }

    setcomState(event){
        event.preventDefault();
        let cardid = this.state.box.id;
        
        let completestate = !(this.state.iscomplete);
        //console.log("card:"+cardid+"comp:"+this.state.iscomplete);
        this.setState({
            iscomplete:completestate,
            
        })
    }
    
    componentDidMount(event){
        let cardid = this.state.indexo; 
        // if(this.state.isbox){
        //     userActions.updatebox(this.state.box);
        //     console.log("update");
            

        // }
        userActions.createBox(cardid);
        var newbox = AuthorStore.getBoxById(cardid);

        this.setState({
            box:newbox
        })
        console.log("creat");

    }
    
    
    Savebox(event){

        //event.preventDefault();
        let cardid = this.state.indexo; 
        // if(this.state.isbox){
        //     userActions.updatebox(this.state.box);
        //     console.log("update");
            

        // }
        userActions.createBox(cardid);
        console.log("creat");
        


    }


    


    render(){
        console.log("render");        
        console.log("newbox:"+this.state.box.addr);
        //var card = orderdata[this.state.indexo];
        var msg;
        
        if(this.state.isDeal === "true" || this.state.isDeal ===true){
            
            msg="处理";
            console.log("true card:"+this.state.box.id+""+"isDeal:"+this.state.isDeal);
        }else{
            msg="未处理";
            console.log(" flase card:"+this.state.box.id+""+"isDeal:"+this.state.isDeal);
        }
        
        var cmsg;
        if(this.state.iscomplete === "true" || this.state.iscomplete ===true){
            cmsg="完成";
        }else{
            cmsg="未完成";
        }        

        return (
        
          <div className="cards" id={this.props.count} onClick={this.componentDidMount.bind(this)}>
            <CardBody card={this.state.box} cardid={this.state.box.id} orderid={this.state.box.id} 
                title={this.state.box.name} userinfo={this.state.box.phone} addr={this.state.box.addr} track={this.state.box.tracking} order={this.state.box.id}
            />
             <button onClick={this.setdealState.bind(this)}>{msg}</button>
             <button onClick={this.setcomState.bind(this)} >{cmsg}</button>
           </div>
          



        )
  
    }
}





export default Orderbox;