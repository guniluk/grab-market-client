import './index.css';        // 스타일 적용
import axios from 'axios';   //네트워크 통신
import React from 'react';
import { Link } from 'react-router-dom';  //페이지간 이동
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import { API_URL } from '../config/constants.js';
import { Carousel } from 'antd';

dayjs.extend(relativeTime);

function MainPage() {
  // const url = 'https://e4e407a6-4841-4d90-ba77-5feab04e474f.mock.pstmn.io/products';
  // const url = `https://f19dabd9-12d7-4a45-be42-b026e7a5e62a.mock.pstmn.io/products/${id}`; //lhhbyh
  // const url = 'http://localhost:8080/products';

  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  //컴포넌트 UI 자동 update(rendering).products는 배열이므로 빈 배열을 초기상태로 세팅

  React.useEffect(function () {
    axios.get(`${API_URL}/products`).then(function (result) {
      //console.log(result);
      const products = result.data.products;
      setProducts(products);
    }).catch(function (error) {
      console.error(`error발생: ${error}`);
    });

    axios.get(`${API_URL}/banners`).then((result) => {
      const banners = result.data.banners;
      setBanners(banners);
    }).catch((error) => {
      console.error(`error발생: ${error}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  //netwotk 통신: axios(.get:불러오기 .post:업로드)
  //한번만 통신을 통해 불러올 수 있도록 useEffect 사용하면서 빈배열 적용


  return (
    <div >
      <Carousel autoplay autoplaySpeed={3000}>
        {
          banners.map((banner, index) => {
            return (
              <Link to={banner.href} key={index} >
                <div id="banner" >
                  <img src={`${API_URL}/${banner.imageUrl}`} alt="배너" />
                </div>
              </Link>
            )
          })
        }
      </Carousel>

      <h1 id="product-headline">판매되는 상품들</h1>

      <div id="product-list">
        {
          products.map(function (product, index) {
            return (
              <div className="product-card" key={index}>
                {
                  product.soldout === 1 && <div className='product-blur' />
                }

                <Link className="product-link" to={`/products/${product.id}`}>
                  <div>
                    <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                  </div>
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}원</span>
                    <div className='product-footer'>
                      <div className="product-seller">
                        <img className="product-avatar" src="/images/icons/camera.png" alt="아바타그림" />
                        <span>{product.seller}</span>
                      </div>
                      <span className='product-date'>{dayjs(product.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </Link>
              </div>)
          })
        }
      </div>
    </div>
  )
};

export default MainPage;