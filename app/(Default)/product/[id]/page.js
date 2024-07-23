import { cookies, headers } from "next/headers";
import Product from "./product";


export default async function Page({ params, searchParams }) {
    const id = params.id;

    const product = await getProduct(id);

    return (
      <Product {...product} />
      // JSON.stringify(seller)
      // JSON.stringify(product)
    );
}

async function getProduct(id) {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const productPromise = await fetch(new URL(`/api/products/${id}`, requestUrl), {
  })

  const productData = await productPromise.json();
  return productData;
}
