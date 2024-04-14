import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  console.log(id);
  return <h3>상품 상세페이지: {id} 상품</h3>;
}

export default ProductPage;