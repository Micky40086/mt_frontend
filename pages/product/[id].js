import fetch from 'isomorphic-unfetch';

const Product = props => (
  <div>
    <h1>{props.data.name}</h1>
    <p>{props.data.price}</p>
  </div>
);

Product.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/products/${id}`);
  const data = await res.json();
  
  return { data };
};

export default Product;