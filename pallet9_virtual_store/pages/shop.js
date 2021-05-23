import React from "react";
import Head from "next/head";
import Link from "next/link";
import { fromImageToUrl, API_URL } from "../utils/urls";

import shopStyles from "../styles/Shop.module.css";
const shop = ({products}) => {
  return (
    <>
      <div className={shopStyles.container}>
        <Head>
          <title>Shop</title>
        </Head>
        <h1>Here's shop page</h1>

        {products.map((product) => (
          <div key={product.name} className={shopStyles.product}>
            <Link href={`/products/${product.slug}`}>
              <a>
                <div className={shopStyles.product_container}>
                  <div className={shopStyles.product_img}>
                    <img src={fromImageToUrl(product.image)} />
                  </div>
                  <div className={shopStyles.product_col}>
                    {product.name}  ${product.price}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
    // fetch the products
    const product_res = await fetch(`${API_URL}/products/`)
    const products = await product_res.json()
    // return the products as props
    return {props: {products}}

}
export default shop;
