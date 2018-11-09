import React, { Component } from 'react';
import './ProductForm.css';
import { Input,Upload, Icon, message, Table, Divider, Tag, Button, Modal } from 'antd';
import BoxT from './boxTable.js';
import LocalizedModal from './productDetail.js';
import Pmodal from './Pmodal.js';
import EditBox from './EditBox.js';
import $ from 'jquery'; 
import 'antd/dist/antd.css';
import UpdateBox from './UpdateBox.js';
import productActions from '../actions/productActions';
import ProductStore from '../stores/productStore';
//var fs = require('file-system');




//upload img
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);

}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
    imagebox:this.props.boxid,
    //imageid,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file);
      var img = info.file.response.id;
      
      //this.setState({imageid:img});
        if (img != null){
          console.log(img);
          var boxid = this.state.imagebox;
          productActions.addImage(boxid,img);
          ProductStore.addImageToBox();
      }//end

      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
        
    }
  }

  render() {
    
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text" id={this.props.boxid}>Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    
    // if(image!=null){
    //   console.log("image box id "+this.state.imagebox);
    //   var boxid = this.state.imagebox;
    //   productActions.addImage(boxid,imageUrl);
    //   ProductStore.addImageToBox();
    //   //var ea_image = ProductStore.getImageById(boxid);
    // }

    return (
      <Upload className="uploadimg"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/uploadImg"
        //action=""
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

class ProductForm extends Component {
	constructor(props) {
        super(props);
        this.state = {
            dataSource:[
                { key: 1, pid:1, pn: 'xxxx', rest:222,price:9999,threshold:9999},
                { key: 2, pid:2, pn: 'ssss', rest:100,price:9999,threshold:9999},
                
            ],
            box:this.props.boxid,
            selectedbox:'',
            first:false,
            showImage:false,
            index : '',
            count :0,
            selectedRowKeys:[],
            selectedRows:[],
            record : 'abc'
        };
        this.onDelete = this.onDelete.bind(this);//绑定this,声明该方法需要绑定this, 直接在onClick中调用
        this.appendPerson = this.appendPerson.bind(this);
        this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
        this.handleSelectedUpdate = this.handleSelectedUpdate.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
       	
          this.columns =[
            { title: 'bid', dataIndex: 'bid', key: 'bid' ,width:'1fr'},
            { title: '货品名', dataIndex: 'pn', key: 'pn' ,width:'1fr'},
            { title: '库存', dataIndex: 'rest', key: 'rest' ,width:'1fr'},
            {title:'价格',dataIndex:'price',key:'price',width:'1fr'},
            {title:'预留',dataIndex:"threshold",key:"threshold",width:'1fr'}
     		
            

        ];
	}

  componentDidMount(event){
    console.log(this.state.box);
    let boxid = this.state.box;
    //$.ajaxSettings.async = false;
    $.get("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/getAllBoxes",
      function(res){

        productActions.createProduct(boxid,res.ea_boxes[boxid]);
        console.log("get info"+JSON.stringify(res.ea_boxes[boxid]));
        if (res.ea_boxes[boxid] != null){
          //add image
          productActions.addImage(boxid,res.ea_boxes[boxid].image);
          ProductStore.addImageToBox();
        };

    }).done(({res}) => {

        var newbox = [];
        newbox.push(ProductStore.getBoxById(boxid));
        //console.log("all"+JSON.stringify(ProductStore.getAllbox()));
        console.log("creat");
        //console.log("newbox rest  "+newbox.rest);
        this.setState({
            first:true,
            dataSource:newbox
        });
        console.log("set state"+JSON.stringify(newbox));

    });

    //console.log("data scource"+ this.state.dataSource);
    
    

  }
	appendPerson(event){//得到子元素传过来的值

        let array = [];
        let count = 0;
        this.state.dataSource.forEach(function (element) {
            Object.keys(element).some(function (key) {
                if (key === 'bid') {
                    count++;
                    array[count] = element.bid
                }
            })
        })
        let sortData =array.sort();//对遍历得到的数组进行排序
        let MaxData = sortData[(this.state.dataSource.length)-1]//取最后一位下标的值
        var tIndex = MaxData+1;
        //event.key=event.bid+"-"+tIndex;
        //event. = MaxData+1;

        
        var img = ProductStore.getImageById(this.state.box);
        console.log(img);

        
        if (img.length != 1){

          var upbox = {
            "name": event.pn,
            "price": event.price,
            "image": img.image,
            "num": event.rest,
            "threshold": event.threshold,
            "status": 1
          };
          $.post("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/addBox"
          ,upbox,function(upbox,status){
            console.log(status+"back data"+JSON.stringify(upbox.bid));
            productActions.updataBox(upbox.bid);
          }).done(({upbox}) => {
              if(ProductStore.addboxid() != null){
                var add_boxs = ProductStore.addboxid();
                event.bid = add_boxs[add_boxs.length-1];
                console.log(add_boxs[add_boxs.length-1]);
                console.log(event);
              }
              var selectedid = event.bid;
              this.setState({
                  first:true,
                  selectedbox:selectedid,
                  dataSource:[...this.state.dataSource,event]
              })
          })
        //console.log("update box  "+JSON.stringify(event));
        }else{


          alert("请上传图片");}
          console.log("add box"+JSON.stringify(upbox));
        
 
    }
    onDelete(index){
            console.log(index)
            const dataSource = [...this.state.dataSource];
            dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
            this.setState({ dataSource });
    }

    handleSelectedUpdate(event){
      //console.log("selected update"+JSON.stringify(this.state.selectedRows));
      //console.log("update event!"+ JSON.stringify(event));
      var img = ProductStore.getImageById(this.state.box).image;
            
      
      var boxinfo = this.state.selectedRows[0];

      if(boxinfo != null){
        var key = boxinfo.key;
        boxinfo.pn=event.name;
        boxinfo.rest = event.num;
        boxinfo.price = event.price;
        boxinfo.threshold = event.threshold;
        //{"key":1,"pid":1,"pn":"ssss2","rest":"2222","price":"11","threshold":"1","bid":0}
        console.log("box info"+JSON.stringify(boxinfo));
        var updateb = {"bid": boxinfo.bid,
                      "name": boxinfo.pn,
                      "price": boxinfo.price,
                      "image": img,
                      "num": boxinfo.rest,
                      "threshold": boxinfo.threshold,
                      "status": 1};
      
      console.log("update box"+JSON.stringify(updateb));

      $.post("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/updateBox",
                updateb,
                function(updateb,status){
                  console.log("box update status:"+ status);
              });

        var data = this.state.dataSource;
        
        for (var i=0;i<data.length;i++){

          if (key === data[i].key){
                    //console.log("delete if");
                    data[i] = boxinfo;

                    console.log(JSON.stringify(data));
                }

        }
        //console.log("update bid"+JSON.stringify(updateb.bid));
        this.setState({dataSource:data,selectedbox:updateb.bid});
        }else{

        alert("请勾选修改的礼盒");
      }

    }
    handleChangeImage(){
      
      this.setState({
        first:false,
        showImage:true
      })
    }
 
    handleSelectedDelete(){

        var img = ProductStore.getImageById(this.state.box);

            
        console.log("delete!");
        if(this.state.selectedRowKeys.length>0){
            //console.log(...this.state.selectedRowKeys)
            const dataSource = [...this.state.dataSource]
            //console.log("dataSource"+JSON.stringify(dataSource));
            //console.log("selected key: "+JSON.stringify(this.state.selectedRows));
            //{"key":1,"pid":1,"pn":"b1","rest":10,"price":"1.99","threshold":5,"bid":0}
            var selectedbox = this.state.selectedRows;
            var deletedboxs = [];
            var data = this.state.dataSource;
            
            for (var i=0;i<selectedbox.length;i++){
              console.log(JSON.stringify(selectedbox[i]));
              var key = selectedbox[i].key;
              if(img.length === 1){
                var deletedbox = {
                  bid: selectedbox[i].bid,
                  name: selectedbox[i].pn,
                  price: selectedbox[i].price,
                  image:img.image,
                  num: selectedbox[i].rest,
                  threshold: selectedbox[i].threshold,
                  status: 1,
                }
              }else{
                var deletedbox = {
                  bid: selectedbox[i].bid,
                  name: selectedbox[i].pn,
                  price: selectedbox[i].price,
                  image:'',
                  num: selectedbox[i].rest,
                  threshold: selectedbox[i].threshold,
                  status: 1,
                }
              }
              deletedboxs.push(deletedbox);
              console.log(JSON.stringify(deletedbox));
              $.post("https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/updateBox",
                deletedbox,
                function(deletedbox,status){
                  console.log("box delete status:"+ status);
              });
              for(var x=0;x<data.length;x++){
                //console.log("data loop" +JSON.stringify(data[x]));
                if (key === data[x].key){
                    //console.log("delete if");
                    data[x].status = 1;
                    data.splice(x, 1);

                    console.log(JSON.stringify(data));
                }
              }
              
            }
            this.setState({dataSource:data});
            

            
            
          
            // for(var i=0;i<this.state.selectedRowKeys.length;i++){
            //   var getindex = this.state.selectedRowKeys[i].split("-");
            //   console.log(getindex);

            //   //dataSource.splice(i,1);
            // }

            

        }
        else{
            
            alert("选择要删除的礼盒")
        }
    }

  render() {
  	//联动选择框
       console.log("box id"+this.state.box);
       console.log(this.state.dataSource);
       const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                
                if(selectedRows[0] != null){
                  var sbox = selectedRows[0].bid;
                }else{
                  var sbox = null;
                }

                this.setState({//将选中的id和对象存入state
                        selectedRowKeys:selectedRowKeys,
                        selectedRows:selectedRows,
                        //selectedbox:selectedRows[0].bid
                        selectedbox:sbox
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
      
      var boxid = this.state.box;
      console.log("376 boxid to get image "+boxid);

     
        var Imageinbox = ProductStore.getImageById(boxid);
      
      console.log(Imageinbox);
      var show;
      
      if(this.state.first === true){
        if(Imageinbox != undefined){
          console.log("preload");
          
            show = <img src={Imageinbox.image}/>
            this.state.first = false;
        }else{
          console.log("need upload");
          show = <Avatar boxid={boxid} />;

        }
      }else{

        console.log("no data,need upload!");
        if(this.state.showImage === true){
          
            //alert("请勾选礼盒并上传图片");
      
          
          show = <Avatar boxid={boxid} />;
          this.state.first= false;
          
        }else{
          show = <img src={Imageinbox.image}/>
        }
        
      }
      console.log("selected box"+this.state.selectedbox);

    return (
      <div className = "product">
    	 <div className="ProductForm" id={this.props.boxid} >
              <div id="div_left" onClick={this.handleChangeImage}>
 				         {show}
              </div>

              <div id="add_delete">

                    
                    
                    
          					<BoxT className="add_product_btn" callback={this.appendPerson}/>
                    <UpdateBox className="selectedUpdate" callback={this.handleSelectedUpdate}/>
                    <div className="productModal" id={boxid}>
			            		<LocalizedModal boxid={boxid} selectedbox={this.state.selectedbox} />
			            	</div>
                    <Button type="danger" className="selectedDelete" onClick={this.handleSelectedDelete}>删除所选</Button>
              </div>
              <div id="div-right">
                  	
                	<Table columns={this.columns}
                       dataSource={this.state.dataSource}
                       className="table"
                       rowSelection={rowSelection}
                       />
 
            	</div>
              
            	
            </div>
            <div className="space">
            </div>
       </div>     
            
        );
    }
}


      

export default ProductForm;
