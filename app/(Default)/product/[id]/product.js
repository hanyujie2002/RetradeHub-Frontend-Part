import { cookies, headers } from "next/headers";
import ProductForm from "./productForm";


export default async function Product(product) {
    const sellerId = product.sellerId;
    const seller = await getUserById(sellerId);

    return (
        <div style={{ textAlign: "center" }}>
        <div style={{ width: 100, height: 100, display: 'flex', margin: 'auto' }}><img src={'/img/' + product.id + '.jpg'} style={{ maxWidth: '100%', margin: 'auto' }}></img></div>
            <div style={{ margin: '20px' }}>{product.description}</div>
            <div>{product.price} 元</div>
            <div>卖家：{seller.username}</div>

            <ProductForm {...product} />
        </div>
    )
}

async function getUserById(userId) {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const userPromise = await fetch(new URL(`/api/users/${userId}`, requestUrl), {
    cache: 'no-cache'
  })

  const userData = await userPromise.json();
  return userData;
}
