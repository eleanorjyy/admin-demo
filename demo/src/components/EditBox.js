import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
 
class EditBox extends React.Component{//在es6中定义一个AddUser类
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
                <Button type="primary" onClick={this.handleAdd}>修改礼盒</Button>
            <Modal title="修改礼盒" visible={this.state.visible} onCancel={this.handleOk} onOk={this.handleOk}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label = "boxid"  hasFeedback>
                        {getFieldDecorator('bid', {
                            rules:[{
                                required:true,message:'请输入礼盒id！'
                            }]
                        })(
                            <Input placeholder="请输入礼盒id！"/>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label = "礼盒名"  hasFeedback>
                        {getFieldDecorator('pn', {
                            rules:[{
                                required:true,message:'请输入礼盒名！'
                            }]
                        })(
                            <Input placeholder="请输入礼盒名！"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="礼盒价格" hasFeedback>
                        {getFieldDecorator('price',{
                            rules:[{required:true,message:'礼盒价格'}]
                        })(
                            <Input placeholder="请输入礼盒价格！"/>
                        )}
                    </FormItem>
                    
                    
                    <FormItem {...formItemLayout} label="礼盒库存" hasFeedback>
                        {getFieldDecorator('rest',{
                            rules:[{required:true,message:'礼盒数量'}]
                        })(
                            <Input placeholder="请输入礼盒数量！"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="礼盒预留" hasFeedback>
                        {getFieldDecorator('threshold',{
                            rules:[{required:true,message:'礼盒预留数量'}]
                        })(
                            <Input placeholder="请输入礼盒预留数量！"/>
                        )}
                    </FormItem>
                    
                    <FormItem {...tailFormItemLayout} style={{padding:10}}>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                        <Button type="primary" size="large" onClick={this.handleClear}>重置</Button>
                    </FormItem>
                     </Form>
            </Modal>
            </div>
        );
    }
}

EditBox = Form.create()(EditBox); //解决了getFieldDecorator无法定义;
 
export default EditBox;





