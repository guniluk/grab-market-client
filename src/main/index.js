import './index.css';     // 스타일 적용을 위해 import
import axios from 'axios';   //네트워크 통신을 위해 import
import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const url = 'https://e4e407a6-4841-4d90-ba77-5feab04e474f.mock.pstmn.io/products';
  const [products, setProducts] = React.useState([]);
  //porducts는 배열이므로 빈 배열을 초기상태로 넣어줌
  // comments

  React.useEffect(function () {
    axios.get(url).then(function (result) {
      // console.log(result);
      const products = result.data.products;
      setProducts(products);
    }).catch(function (error) {
      console.error(`error발생: ${error}`);
    });
  }, []);
  //한번만 통신을 통해 불러올 수 있도록 useEffect 사용하면서 빈배열 적용


  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" alt="로고이미지" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="배너" />
        </div>
        <h1>판매되는 상품들</h1>

        <div id="product-list">
          {
            products.map(function (product, index) {
              return (
                <div className="product-card">
                  <Link className="product-link" to={`/products/${index}`}>
                    <div>
                      <img className="product-img" src={product.imgUrl} alt="농구공1" />
                    </div>
                    <div className="product-contents">
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">{product.price}원</span>
                      <div className="product-seller">
                        <img className="product-avatar" src={product.seller[0]} alt="아바타그림" />
                        <span>{product.seller[1]}</span>
                      </div>
                    </div>
                  </Link>
                </div>)
            })
          }
        </div>

      </div>
      <div id="footer"></div>
    </div>
  )
};

export default MainPage;