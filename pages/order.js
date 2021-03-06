import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

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

  const callCreateOrderApi = async () => {
    const res = await fetch('http://localhost:3000/orders', {
      method: 'post',
      body:    JSON.stringify({order: {}, products: router.query.products}),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status === 201) {
      const resJson = await res.json()

      Router.push({
        pathname: '/finish',
        query: { orderId: resJson.uid }
      })

      Cookies.set("car", "")
    } else {
      alert("新增訂單失敗")
    }
  }
  
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
        <button className="submitBtn" onClick={() => callCreateOrderApi()}>Create Order</button>
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

Order.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/products');
  const data = await res.json();

  return {
    products: data
  }
};

export default Order
