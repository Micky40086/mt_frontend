import React from 'react'
import Link from 'next/link'

const Contact = (props) => {
  const callApi = () => {

  }

  return (
    <div>
      <div className="header">
        <h1>聯絡我們</h1>
        <Link href="/">
          <a>回首頁</a>
        </Link>
      </div>
      <div className="container">
        <form onSubmit={(e) => callApi}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="Name" required />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
          <label htmlFor="content">Content</label>
          <textarea id="content" type="text" name="content" required />
          <button className="submitBtn" type="submit">Submit</button>
        </form>
      </div>
      <style jsx>{`
        .container {
          padding: 0 50px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px;
        }
        label, input {
          display: block;
        }
        .submitBtn {
          display: block;
          background-color: green;
          padding: 5px 10px;
          color: white;
        }
      `}</style>
    </div>
    
  )
}

export default Contact
