import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import "./Images.css";
import productActions from '../actions/productActions';
import ProductStore from '../stores/productStore';

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
    imagepid:this.props.pid,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log("box in images js"+this.state.imagebox);
      console.log("pid in images js"+this.state.imagepid);
      var img = info.file.response.id;

      
      //this.setState({imageid:img});
        if (img != null){
          console.log(img);
          var boxid = this.state.imagebox;
          var pid = this.state.imagepid;

          productActions.addpImage(pid,img);
          ProductStore.addImageToP();
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
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}action="https://www.cmapi.ca/cm_miniprogram/dev/public/index.php/api/sboxmanage/v1/uploadImg"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}
export default Avatar;