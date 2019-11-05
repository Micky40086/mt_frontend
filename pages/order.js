import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'

const Order = (props) => {
  const router = useRouter()
  const [productKeys, setProductKeys] = useState([])
  const [productValues, setProductValues] = useState([])
  const [sum, setSum] = useState(0)

  useEffect(() => {
    let products = router.query.products
    products = products ? JSON.parse(products) : {}
    setProductKeys(Object.keys(products))
    setProductValues(Object.values(products))
    return () => {}
  }, [])

  useEffect(() => {
    if (productKeys.length > 0) {
      let tmpSum = 0
      productKeys.forEach((item, index) => {
        const tmpProduct = props.products.find(product => item === product.id.toString())
        tmpSum += tmpProduct.price * productValues[index]
      })
      setSum(tmpSum)
    }
    return () => {}
  }, [productKeys])
  
  return (
    <div>
      <h1>訂單確認頁</h1>

      <div className="container">
        <div className="itemGroup">
          <div>商品名稱</div>
          <div>數量</div>
          <div>價格</div>
          <div>總價</div>
        </div>
        <form>
        {productKeys.map((item, index) => {
          const currentProduct = props.products.find(product => item === product.id.toString())
          return (
            <div key={currentProduct.id} className="itemGroup">
              <div>{currentProduct.name}</div>
              <div>{productValues[index]}</div>
              <div>{currentProduct.price}</div>
              <div className="itemSum">{currentProduct.price * productValues[index]}</div>
            </div>
          )}
        )}
        <p className="sumText">合計: {sum}</p>
        </form>
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
          text-decoration: none;
        }
        .sumText {
          text-align: right;
        }
      `}</style>
    </div>
    
  )
}

Order.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/products');
  const data = await res.json();

  return {
    products: data
  }
};

export default Order
