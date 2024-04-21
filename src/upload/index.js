import { Form, Divider, Input, InputNumber, Button, Upload, message } from "antd";
import './index.css';
import { useState } from "react";
import { API_URL } from '../config/constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();
  const onSubmit = (values) => {
    console.log(values); //서버로 업로드 요청하도록 처리
    axios.post(`${API_URL}/products`, {
      name: values.name,
      description: values.description,
      price: parseInt(values.price),
      seller: values.seller,
      imageUrl: imageUrl
    }).then((result) => {
      console.log(result);
      history.replace('/');
    }).catch((error) => {
      console.error(error);
      message.error(`에러가 발생했어. ${error.message}`);
    });
  }

  const onChangeImage = (info) => {
    if (info.file.status === 'uploading') { return; }
    if (info.file.status === 'done') {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="upload-container">
      <Form name="상품업로드" onFinish={onSubmit} >
        <Form.Item
          name="upload"
          label={<div
            className="upload-label">상품사진</div>}>

          <Upload
            name='image'
            // action='http://localhost:8080/image'
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage} >
            {
              imageUrl ? <img id="upload-image" src={`${API_URL}/${imageUrl}`} alt=" " /> : (<div id="upload-image-placeholder">
                <img src="/images/icons/camera.png" alt="camera_image" />
                <span>이미지를 업로드 해주세요</span>
              </div>)
            }
          </Upload>

        </Form.Item>
        <Divider />
        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자명</div>}
          rules={[{ required: true, message: "판매자 이름을 입력해 주세요" }]}
        >
          <Input className="upload-name" size="large" placeholder="이름을 입력하세요" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력해 주세요" }]}
        >
          <Input className="upload-name" size="large" placeholder="상품 이름을 입력하세요" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해 주세요" }]}
        >
          <InputNumber
            defaultValue={0}
            className="upload-price" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품소개</div>}
          rules={[{ required: true, message: "상품 소개내용을 입력해 주세요" }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품소개를 적어주세요." />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            등록하기
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default UploadPage;