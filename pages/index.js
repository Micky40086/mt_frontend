import React, { useCookies } from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

const Home = (props) => {
  const setFooCookie = (id) => {
    const currentCarCookies = Cookies.get("car")
    let newCarCookies = currentCarCookies != "undefined" ? JSON.parse(currentCarCookies) : {}
    
    if (newCarCookies[id]) {
      newCarCookies[id] += 1
    } else {
      newCarCookies[id] = 1
    }

    Cookies.set("car", JSON.stringify(newCarCookies))
  }
  
  return (
    <div>
      <div className="header">
        <h1>商品列表</h1>
        <Link href="/cart">
          <a>前往購物車</a>
        </Link>
      </div>    
      <div className='container'>
        <div className='row'>
          {props.products.map(product => (
            <div key={product.id} className='card'>
              <Link href="/product/[id]" as={`/product/${product.id}`}>
                <a>
                  <h3>{product.name}</h3>
                </a>
              </Link>
              <p>價格: {product.price}</p>
              <button className="carBtn" onClick={() => setFooCookie(product.id.toString())}>加到購物車</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px;
        }
        .container {
          padding: 0 50px;
        }
        .container .row {
          display: flex;
          justify-content: space-around;
        }
        .container .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 1px solid black;
          padding: 10px 20px;
        }
        .container .carBtn {
          display: block;
          margin: 1em 0;
        }
      `}</style>
    </div>
  )
}

Home.getInitialProps = async function(ctx) {
  const res = await fetch('http://localhost:3000/products');
  const data = await res.json();

  return {
    products: data
  };
};

export default Home
