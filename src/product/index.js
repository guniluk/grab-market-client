import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(function () {
    const url = `https://e4e407a6-4841-4d90-ba77-5feab04e474f.mock.pstmn.io/products/${id}`;
    axios.get(url).then(function (result) {
      setProduct(result.data);
      // console.log(result);

    }).catch(function (error) {
      console.error(`error발생: ${error}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log(product);
  // product이 null일때 오류가 발생하므로 if문 사용/비동기 처리시 문제없도록 조치
  if (product === null) {
    return <h1>상품정보를 받고 있습니다....</h1>
  };

  return (
    <div>
      <div id="image-box">
        <img src={"/" + product.imgUrl} alt="img-url" />
      </div>
      <div id="profile-box">
        <img src={"/" + product.seller[0]} alt="img-url" />
        <span>{product.seller[1]}</span>
      </div>
      <div id="content-box">
        <div id="name"> {product.name}</div>
        <div id="price"> {product.price}원</div>
        <div id="createdAt">2024년 4월 16일</div>
        <div id="description"> {product.description}</div>
      </div>


    </div>
  );
}

export default ProductPage;