import Image from "next/image";
import Link from "next/link"
import { cookies, headers } from "next/headers";
import Product from './product'
import styles from './root.module.css'


export default async function HomePage() {
  const productsAndUser = await getProductsAndUser();
  const products = productsAndUser[0];
  const user = productsAndUser[1];
  const userId = user.id;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>二手商品</h1>
      <div className={styles.products}>
        {products.map((product) => {
          if (product.sellerId != userId) {
            return (
              <div className={styles.product}>
                <Product {...product}/>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

async function getProductsAndUser() {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const productsPromise = await fetch(new URL('/api/products/', requestUrl), {
    cache: 'no-cache'
  })

  const userPromise = await fetch(new URL('/api/users/me', requestUrl), {
    headers: { Cookie: cookies().toString() }
  })

  const productsData = await productsPromise.json();
  const userData = await userPromise.json();
  return [productsData, userData];
}
