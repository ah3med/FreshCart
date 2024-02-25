import React from 'react'
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import { Helmet } from 'react-helmet';

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="User Products Page" />
      </Helmet>
      <FeaturedProducts />
    </>
  )
}
