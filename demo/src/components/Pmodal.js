import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd';
import './Pform.css';
import Avatar from "./Images.js";

const FormItem = Form.Item;
const Option = Select.Option;
 
class  addProduct extends React.Component{//在es6中定义一个AddUser类
     constructor(props){//构造函数
         super(props);
         this.state = {
             visible:false
         };
         this.handleAdd = this.handleAdd.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOk = this.handleOk.bind(this)
         this.handleClear = this.handleClear.bind(this)
     }
    handleAdd() {
        this.setState({
            visible: true
        });
    }
    handleSubmit(e){//提交表单
        e.preventDefault();
         this.props.form.validateFieldsAndScroll((err,values)=>{
             if(!err){
                 //console.log('接收的值：',values);
                 this.setState({
                     visible:false
                 })
                 this.props.form.resetFields();//清空提交的表单
                 //当值传递到父元素后，通过回调函数触发appendPerson方法将参数values带到父元素
                 this.props.callback(values);
             }
         })
    }
 
    handleClear(){
        this.props.form.resetFields();
    }
 
    handleOk() {
        this.setState({
            visible: false
            });
    }
    render(){
 
     const {getFieldDecorator} = this.props.form;
     const formItemLayout = {
         labelCol:{span : 6},
         wrapperCol:{span: 14}
     };
     const tailFormItemLayout = {
         wrapperCol: {
             span: 14,
             offset: 8
         }
     };
        return(
            <div>
                <Button className="add_product_btnp" onClick={this.handleAdd}>添加货品</Button>
            <Modal title="新建货品" visible={this.state.visible} onCancel={this.handleOk} onOk={this.handleOk}>
                <Form onSubmit={this.handleSubmit}>

                    
                    <FormItem {...formItemLayout} label = "货品名"  hasFeedback>
                        {getFieldDecorator('name', {
                            rules:[{
                                required:true,message:'请输入货品名！'
                            }]
                        })(
                            <Input placeholder="请输入货品名！"/>
                            )}
                        </FormItem>
                    
                    
                    <FormItem {...formItemLayout} label="数量" hasFeedback>
                        {getFieldDecorator('num',{
                            rules:[{required:true,message:'数量'}]
                        })(
                            <Input placeholder="请输入数量！"/>
                        )}
                    </FormItem>
                    
                    <FormItem {...formItemLayout} label="价格" hasFeedback>
                        {getFieldDecorator('price',{
                            rules:[{required:true,message:'请输入价格'}]
                        })(
                            <Input type="textarea" rows={3} placeholder="请输入价格!"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="图片" hasFeedback>
                        {getFieldDecorator('pimg',{
                            
                        })(
                            <Avatar />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{padding:10}}>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                        <Button type="primary" size="large" onClick={this.handleClear}>重置</Button>
                    </FormItem>
                     </Form>
            </Modal>
            </div>
        )
    }
}

addProduct = Form.create()(addProduct); //解决了getFieldDecorator无法定义;
 
export default addProduct;





