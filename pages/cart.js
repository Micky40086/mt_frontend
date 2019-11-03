import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

const Cart = (props) => {
  const [productKeys, setProductKeys] = useState([])
  const [productValues, setProductValues] = useState([])

  useEffect(() => {
    let currentCarCookies = Cookies.get("car")
    currentCarCookies = currentCarCookies ? JSON.parse(currentCarCookies) : {}
    setProductKeys(Object.keys(currentCarCookies))
    setProductValues(Object.values(currentCarCookies))
    return () => {}
  }, [])
  
  return (
    <div>
      <h1>購物車</h1>

      <div className="container">
        <div className="itemGroup">
          <div>商品名稱</div>
          <div>數量</div>
          <div>價格</div>
          <div>總價</div>
        </div>
        {productKeys.map((item, index) => {
          const currentProduct = props.products.find(product => item === product.id.toString())
          return (
            <div key={currentProduct.id} className="itemGroup">
              <div>{currentProduct.name}</div>
              <div>{productValues[index]}</div>
              <div>{currentProduct.price}</div>
              <div>{currentProduct.price * productValues[index]}</div>
            </div>
          )}
        )}
      </div>
      <style jsx>{`
        .container {
          padding: 0 50px;
        }
        .container div {
          display: flex;
          width: 100%;
          justify-content: space-around;
          padding: 5px 0;
        }
      `}</style>
    </div>
    
  )
}

Cart.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/products');
  const data = await res.json();

  return {
    products: data
  }
};

export default Cart
