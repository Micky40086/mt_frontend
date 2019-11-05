import React, { useState, useEffect } from 'react'
import Router from 'next/router'
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

  const changeProductValues = (value, index) => {
    let tmpArr = [...productValues]
    tmpArr.splice(index, 1, value)
    setProductValues(tmpArr)
  }

  const submitForm = () => {
    if (productValues.find(item => item < 0)) {
      alert("商品數量必須大於0")
      return
    }

    const products = {}
    productKeys.forEach((item, index) => {
      products[item] = productValues[index]
    })

    Router.push({
      pathname: '/order',
      query: { products: JSON.stringify(products) }
    })
  }
  
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
              <div>
                <input value={productValues[index]} onChange={(e) => changeProductValues(parseInt(e.target.value || 0), index)}/>
              </div>
              <div>{currentProduct.price}</div>
              <div>{currentProduct.price * productValues[index]}</div>
            </div>
          )}
        )}
        <button className="submitBtn" onClick={() => submitForm()}>Order Page</button>
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
        .submitBtn {
          background-color: green;
          padding: 5px 10px;
          color: white;
          float: right;
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
