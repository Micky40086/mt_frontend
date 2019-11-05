import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Finish = (props) => {
  const router = useRouter()

  return (
    <div>
      <h1>訂單完成</h1>

      <div className="container">
        <p>您的訂單編號是 {router.query.orderId}</p>
        <p>若有疑問請<Link href="/">
            <a>聯絡我們</a>
          </Link>
        </p>
      </div>
      <style jsx>{`
        .container {
          padding: 0 50px;
        }
      `}</style>
    </div>
    
  )
}

export default Finish
