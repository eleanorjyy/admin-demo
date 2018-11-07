import React from 'react';
import {Modal,Button,Table} from 'antd';
import Pmodal from './Pmodal.js';
import { Component } from 'react';
import $ from 'jquery'; 
import productActions from '../actions/productActions';
import ProductStore from '../stores/productStore';
import Avatar from "./Images.js";
import './productDetail.css';
import './boxtable.css';

/*
 
 */

class Detail extends Component {
    constructor(props) {//   构造函数
        super(props);
        this.state = {
            dataSource:[
                { key: 1,  pid:1,name: 'xxxx', num:222,price:2222,image:''},
                { key: 2,  pid:2,name: 'ssss', num:100,price:2222,image:''},
                
            ],
            first:true,
            pbox:this.props.pbid,
            selectb:this.props.selectedb,
            boxid:'',
            productId:'',
            index : '',
            showImage:'',
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
            { title: 'pid', dataIndex: 'pid', key: 'pid' ,width:'15%'},
            { title: '货品名', dataIndex: 'name', key: 'name' ,width:'20%'},
            { title: '数量', dataIndex: 'num', key: 'num' ,width:'15%'},
            {title:'价格',dataIndex: 'price', key: 'price' ,width:'15%'},
            {title: '货品图片',
                  key: 'image',
                  dataIndex: 'image',
                  render: (text,record) => (
                     <img src={record.image} />//this.state.showImage
                   )
            }
            

            
            

        ];
        console.log("product selectbox id"+this.state.selectb);

    }
    componentDidMount(event){
        console.log("show");


        console.log("product box id"+this.state.pbox);
        let pbid = this.state.pbox;
        let selectedboxid = this.state.selectedb;


        $.get("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/getAllBoxes",
            function(res){
                //console.log("res.ea_boxes[pbid].products"+JSON.stringify(res.ea_boxes[pbid].products));
                if(res.ea_boxes[pbid] != null){
                    
                        productActions.createDetail(pbid,res.ea_boxes[pbid].products);
                        for(var x=0;x<res.ea_boxes[pbid].products.length;x++){
                            productActions.addpImage(res.ea_boxes[pbid].products[x].pid,res.ea_boxes[pbid].products[x].image);

                        }
                    
                }

                
        }).done(({res}) => {
            var newdetail = ProductStore.getAllproducts();
            console.log("product detail"+JSON.stringify(newdetail));
            var images = ProductStore.addImageToP();
            console.log("all images"+JSON.stringify(images));
            var imagesd =[];
            for (var x=0;x<images.length;images++){
                imagesd.push(images[x].image);
                // this.setState({
                //     showImage:images[x].image
                // });

            }
            var index = newdetail.length-1
            newdetail.image = imagesd;
            console.log("newtail"+(newdetail));
            //let count = this.state.Imagecount
            //ADD IMAGE URL
            //count = count +1
            //console.log("each image count:"+count);
            this.setState({
                dataSource:newdetail,
                

                //showImage:"https://www.cmapi.ca/cm_miniprogram/dev/storage/image/sweetful_box004627.png"
                //Imagecount:count



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
        // this.setState({
        //       dataSource:[...this.state.dataSource,event]
        //   })
        
        console.log(event);
        //{pid: "4444", name: "ssss2", num: "3333", price: "22", key: 5, 
        var images = ProductStore.addImageToP();
        console.log(JSON.stringify(images[images.length-1]));
        var imageid = images[images.length-1].image;
        let selectedbox = this.state.selectb;
        var newproduct = {
            bid:selectedbox,
            //pid:event.pid,
            name:event.name,
            num:event.num,
            image:imageid,
            price:event.price,
            status:"0",
        };
        var productinfo = newproduct;
        console.log("insert peoduct"+JSON.stringify(newproduct));
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
                var imageUrl = newproduct.imageUrl;
                console.log("insert perod status "+status +"pid"+pid+"data "+imageUrl);
                productActions.updateProduct(pid,productinfo);
                // productActions.addImageToP(pid,newproduct.imageUrl);
                productActions.addpImage(pid,imageUrl)
                
                //productImage.image = imageUrl;





        }).done(({newproduct}) => {
            
            var newproducts = ProductStore.getAllproducts();
            console.log("new products"+JSON.stringify(newproducts));
            console.log("create image");
            var productImage = ProductStore.getImageAddr(newproducts.pid).image;
            console.log(JSON.stringify("image  "+productImage));
            //var productImage = ProductStore.addImageToP();
            //console.log(JSON.stringify(productImage));
            //newproducts.pimg = productImage;
            var index = newproducts.length-1;
            console.log("new index"+index);
            newproducts[index].image = productImage;
            console.log("product image show:"+JSON.stringify(newproducts.image) );
            this.setState({
                dataSource:newproducts,
                //productId:newproducts[0].pid,
                //showImage:productImage,

            });
            
            

        });

        
    }
    onDelete(index){
            console.log(index)
            const dataSource = [...this.state.dataSource];
            dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
            this.setState({ dataSource });
    }

    handleSelectedImage(event){
        console.log("callback!");
        var selectedbox = this.state.selectedRows;
        console.log(JSON.stringify(selectedbox[0].pid));
        var pid = selectedbox[0].pid;
        console.log("pid!!!!"+pid);
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
            var allproducts = ProductStore.getAllproducts();
            //console.log(allproducts);
            for (var i=0;i<selectedbox.length;i++){
              //console.log("selected"+JSON.stringify(selectedbox[i]));
              var pid = selectedbox[i].pid;
              var deleteproduct= {
                bid: selectedbox[i].bid,
                pid:selectedbox[i].pid
              };
              console.log("delete prod"+JSON.stringify(deleteproduct));
              // if(allproducts[i].pid === pid){
              //   allproducts[i].status = 1;
              // }

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
                console.log(selectedRows,selectedRowKeys);
                
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

        console.log("product pid"+this.state.productId);
        // var show = <Avatar boxid={this.state.pbox} pid={this.state.selectedRows[0]} />;
        // this.state.dataSource[]
        console.log(this.state.dataSource);
        console.log("set image"+JSON.stringify(this.state.dataSource));
        //console.log("set image"+JSON.stringify(this.state.dataSource.image));

        return (
         <div className="detail" id={this.props.pbid} >

              
              <div id="add_delete">

                            <Button type="primary" className="selectedDeletep" onClick={this.handleSelectedDelete}>删除所选</Button>

                            <Pmodal className="add_product_btnp" callback={this.appendPerson}/>

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
            selectedbox:this.props.selectedbox,

           
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
        console.log("selectedbox"+this.props.selectedbox);
        return(
        <div id={this.props.boxid}>
        <Button className="detail-btn" onClick={this.showModal}> 礼盒详情 </Button>
        
        <Modal visible={this.state.visible}
                    onOk={this.handleOkOrCancel} onCancel={this.handleOkOrCancel}>
                    
                    <Detail pbid={this.state.box} boxinfo={this.state.boxinfo} selectedb={this.props.selectedbox}/>
        </Modal>
            </div>
        );
    }
 
}


 
export default LocalizedModal;
