/**
 * Created By brand On 2018/2/2
 */
import React, {Component} from 'react';
import Pagecomponent from './Pagecomponent.js';
import data from './tsconfig.json';
import Orderbox from './orderbox.js';

import odata from './boxdata.json';
import './order.css';



class Pagecontainer extends Component {
    constructor() {
        super()
        this.state = {
            orders:[],
            dataList:[],
            pageConfig: {
                totalPage: data.length //总页码
            },
            totalodata:odata.length
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)


                     
        
    }

    
    getCurrentPage(currentPage) {
        let orders = this.state.orders;
        let totalodata = this.state.totalodata;
            console.log("loop");
            //100%6
            for(var i=0;i<totalodata;i++){
                orders.push(<Orderbox count={i}/>);
                console.log("times"+i);
            }
        
        this.setState({

            orders:orders,
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
                <div className="cardlist">
                    {this.state.orders}
                </div>
               
                    {this.state.dataList}
                

                <Pagecomponent pageConfig={this.state.pageConfig}
                               pageCallbackFn={this.getCurrentPage}/>
            </div>

        )
    }
}
export default Pagecontainer