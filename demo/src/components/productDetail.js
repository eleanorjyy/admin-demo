import React from 'react';
import {Modal,Button,Table} from 'antd';
import Pmodal from './Pmodal.js';
import { Component } from 'react';
import $ from 'jquery'; 
import productActions from '../actions/productActions';
import ProductStore from '../stores/productStore';
import Avatar from "./Images.js";


/*
 
 */

class Detail extends Component {
    constructor(props) {//   构造函数
        super(props);
        this.state = {
            dataSource:[
                { key: 1,  pid:1,name: 'xxxx', num:222,price:2222},
                { key: 2,  pid:2,name: 'ssss', num:100,price:2222},
                
            ],
            pbox:this.props.pbid,
            index : '',
            Imagecount:0,
            PersonCount :0,
            selectedRowKeys:[],
            selectedRows:[],
            record : 'abc'
        };
        this.onDelete = this.onDelete.bind(this);//绑定this,声明该方法需要绑定this, 直接在onClick中调用
        this.appendPerson = this.appendPerson.bind(this);
        this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
        this.handleSelectedImage = this.handleSelectedImage.bind(this);
        this.columns = [
            { title: 'pid', dataIndex: 'pid', key: 'pid' ,width:'8%'},
            { title: '货品名', dataIndex: 'name', key: 'name' ,width:'8%'},
            { title: '数量', dataIndex: 'num', key: 'num' ,width:'15%'},
            {title:'价格',dataIndex: 'price', key: 'price' ,width:'15%'},
            {title: '货品图片',
                  key: 'pimg',
                  dataIndex: 'pimg',
                  render: pimg => (
                    <Avatar boxid={this.state.pbox} callback={this.handleSelectedImage} />
                  )
            }
            

            
            

        ];
    }
    componentDidMount(event){
        console.log("show");

        console.log("product box id"+this.state.pbox);
        let pbid = this.state.pbox;

        $.get("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/getAllBoxes",
            function(res){
                
                productActions.createDetail(pbid,res.ea_boxes[pbid].products);
                
        }).done(({res}) => {
            var newdetail = ProductStore.getAllproducts();
            console.log("product detail"+JSON.stringify(newdetail));
            let count = this.state.Imagecount

            count = count +1
            console.log("each image count:"+count);
            this.setState({
                dataSource:newdetail,
                Imagecount:count


            });
            

        });


    }
    appendPerson(event){//得到子元素传过来的值
        let array = [];
        let count = 0;
        this.state.dataSource.forEach(function (element) {
            Object.keys(element).some(function (key) {
                if (key === 'id') {
                    count++;
                    array[count] = element.pid
                }
            })
        })
        var bid = (this.state.pbox+1);
        let sortData =array.sort();//对遍历得到的数组进行排序
        let MaxData = sortData[(this.state.dataSource.length)-1]//取最后一位下标的值
        event.key=bid+"-"+(MaxData+1);
        //event.id = MaxData+1;
        this.setState({
              dataSource:[...this.state.dataSource,event]
          })
        
        console.log(event);
        //{pid: "4444", name: "ssss2", num: "3333", price: "22", key: 5, 
        var images = ProductStore.addImageToP();
        console.log(JSON.stringify(images[images.length-1]));
        var imageid = images[images.length-1].image;
        var newproduct = {
            bid:bid,
            //pid:event.pid,
            name:event.name,
            num:event.num,
            image:imageid,
            price:event.price,
            status:"0",
        };
        var productinfo = newproduct;
        console.log("inset peoduct"+JSON.stringify(newproduct));
        // var update_box = ProductStore.getBoxById(bid);
        // //{"key":1,"pid":1,"pn":"b1","rest":10}
        // console.log("box info"+JSON.stringify(update_box));
        // var Imageinfo = ProductStore.getImageById(bid);
        // console.log("box info"+JSON.stringify(Imageinfo));
        //console.log("event ",JSON.stringify(event));
        // if(Imageinfo != null){
        //     var boxinfo = {"bid":update_box.bid,
        //                 "name": update_box.pn,
        //                 "price":update_box.price,
        //                 "image":"",
        //                 "num":update_box.rest,
        //                 "threshold":update_box.threshold,
        //                 "status":"1",
        //                 "products":[newproduct]};
        // }else{
        //     alert("please add a img of the edited box!");
        // }
        // console.log("add new product",JSON.stringify(boxinfo));
        $.post("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/insertProd"
            ,newproduct,function(newproduct,status){
                var pid = newproduct.pid;
                console.log("insert perod status "+status +"data "+pid);
                productActions.updateProduct(pid,productinfo);


        }).done(({newproduct}) => {
            
            var newproducts = ProductStore.getAllproducts();
            console.log("new products"+JSON.stringify(newproducts));
            
            this.setState({
                dataSource:newproducts
            });
            

        });

        
    }
    onDelete(index){
            console.log(index)
            const dataSource = [...this.state.dataSource];
            dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
            this.setState({ dataSource });
    }

    handleSelectedImage(){
        var selectedbox = this.state.selectedRows;
        console.log(JSON.stringify(selectedbox[0].pid));
        var pid = selectedbox[0].pid;
    }
 
    handleSelectedDelete(){
        // if(this.state.selectedRowKeys.length>0){
        //     console.log(...this.state.selectedRowKeys)
        //     const dataSource = [...this.state.dataSource]
        //     dataSource.splice(this.state.selectedRows,this.state.selectedRows.length)
        //     this.setState({ dataSource });
        // }
        // else{
 
        // }
        if(this.state.selectedRowKeys.length>0){
            //console.log(...this.state.selectedRowKeys)
            const dataSource = [...this.state.dataSource]
            //console.log("dataSource"+JSON.stringify(dataSource));
            //console.log("selected key: "+JSON.stringify(this.state.selectedRows));
            //{"key":1,"pid":1,"pn":"b1","rest":10,"price":"1.99","threshold":5,"bid":0}
            var selectedbox = this.state.selectedRows;
            var deletedprodcuts = [];
            var data = this.state.dataSource;
            for (var i=0;i<selectedbox.length;i++){
              //console.log("selected"+JSON.stringify(selectedbox[i]));
              var pid = selectedbox[i].pid;
              var deleteproduct= {
                bid: selectedbox[i].bid,
                pid:selectedbox[i].pid
              };
              console.log("delete prod"+JSON.stringify(deleteproduct));
              $.post("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/deleteProd",
                deleteproduct,
                function(deleteproduct,status){
                    console.log("delete prod"+status);
                }
              );

              deletedprodcuts.push(deletedprodcuts);
              
              for(var x=0;x<data.length;x++){
                //console.log("data loop" +JSON.stringify(data[x]));
                if (pid === data[x].pid){
                    console.log("delete if");
                    data[x].status = "1";
                    data.splice(x, 1);

                    //console.log(JSON.stringify(data));
                }
              }
              
            }
            this.setState({dataSource:data});
    }
}

  render() {
    //联动选择框

       const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({//将选中的id和对象存入state
                        selectedRowKeys:selectedRowKeys,
                        selectedRows:selectedRows
                })
                console.log(selectedRows,selectedRowKeys)
            },
            onSelect: (record, selected, selectedRows) => {
                //console.log( record, ` selected :${selected}`,`selectedRows:${selectedRows}`);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                //console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        }
        return (
         <div className="detail" id={this.props.pbid} >

              
              <div id="add_delete">
                            <Button type="primary" className="selectedDelete" onClick={this.handleSelectedDelete}>删除所选</Button>
                            <Pmodal className="add_product_btn" callback={this.appendPerson}/>
              </div>
              <div id="div-right">
                    
                    <Table columns={this.columns}
                       dataSource={this.state.dataSource}
                       className="table"
                       rowSelection={rowSelection}
                       />
 
                </div>
            </div>
        );
    }
}

class LocalizedModal extends React.Component {
  
  constructor(props){
        super(props);
        this.state={
            visible:false,
            box:this.props.boxid,

           
        }
        this.handlePopup = this.handlePopup.bind(this);
        this.handleOkOrCancel = this.handleOkOrCancel.bind(this);
    }
    handlePopup() {
        this.setState({
            visible: true
        });
    }
    handleOkOrCancel(){
        this.setState({
            visible: false
        });
    }

    state = { visible: false }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }

    hideModal = () => {
        this.setState({
        visible: false,
        });
    }

      render(){
        console.log("modal box id"+this.state.box);
        return(
        <div id={this.props.boxid}>
        <Button type="primary"  onClick={this.showModal}>礼盒详情</Button>
        
        <Modal visible={this.state.visible}
                    onOk={this.handleOkOrCancel} onCancel={this.handleOkOrCancel}>
                    
                    <Detail pbid={this.state.box} boxinfo={this.state.boxinfo}/>
        </Modal>
            </div>
        );
    }
 
}


 
export default LocalizedModal;
