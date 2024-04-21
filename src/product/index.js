import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';
import { API_URL } from '../config/constants.js';
import dayjs from 'dayjs';
import { Button, message } from 'antd';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    axios.get(`${API_URL}/products/${id}`).then(function (result) {
      setProduct(result.data);
    }).catch(function (error) {
      console.error(`error발생: ${error}`);
    });
  };

  useEffect(function () {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const url = `https://e4e407a6-4841-4d90-ba77-5feab04e474f.mock.pstmn.io/products/${id}`;
  // const url = `https://f19dabd9-12d7-4a45-be42-b026e7a5e62a.mock.pstmn.io/products/${id}`; //lhhbyh
  // const url = `http://localhost:8080/products/${id}`;

  console.log(product);
  // product이 null일때 오류가 발생하므로 if문 사용/비동기 처리시 문제없도록 조치
  if (product === null) {
    return <h1>상품정보를 받고 있습니다....</h1>
  };

  const onClickPurchase = () => {
    axios.post(`${API_URL}/purchase/${id}`)
      .then(function (result) {
        message.info('구매가 완료되었습니다.');
        getProduct();
      }).catch((error) => {
        message.error(`Purchase시 에러발생 ${error.message}`);
        console.log(error);
      })
  }

  return (
    <div>
      <div id="image-box">
        {/* <img src={"/" + product.imageUrl} alt="img-url" /> */}
        <img src={`${API_URL}/${product.imageUrl}`} alt="img-url" />
      </div>
      <div id="profile-box">
        <img src={"/images/icons/camera.png"} alt="img-url" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="name"> {product.name}</div>
        <div id="price"> {product.price}원</div>
        <div id="createdAt">{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</div>

        <Button id='purchsase-button' size='large' type='primary' danger onClick={onClickPurchase} disabled={product.soldout === 1 ? true : false}>
          구매하기
        </Button>

        <pre id="description"> {product.description}</pre>
      </div>

    </div>
  );
}

export default ProductPage;