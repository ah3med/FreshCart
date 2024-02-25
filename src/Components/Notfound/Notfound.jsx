import React from 'react'
import notfound from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
      <Helmet>
        <title>404 page</title>
        <meta name="description" content="404 Page" />
      </Helmet>
      <img src={notfound} alt="noFound" />

    </div>
  )
}
