import React from "react";
import Head from "next/head";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import { useRouter } from "next/router";

import Link from "next/link";
const Product = ({ product }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} alt="product image" />
      <p> Price: ${product.price}</p>
      <p>{product.content}</p>
      {/* <Link href="/checkout"> */}
      <button
        onClick={() => {
          router.push({
            pathname: "/checkout",
            query: {data: String(product.slug)},
          });
        }}
      >
        buy
      </button>
      {/* </Link> */}
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  // retrieve product that match with the slug param
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const product_found = await product_res.json();

  // return the product
  return {
    props: { product: product_found[0] }, //API filter returns an array
  };
}

export async function getStaticPaths() {
  //retrieve all possible products
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();
  //return them
  return {
    paths: products.map((product) => ({
      params: {
        slug: String(product.slug),
      },
    })),
    fallback: false, // 404 if params not matched
  };
}
export default Product;
