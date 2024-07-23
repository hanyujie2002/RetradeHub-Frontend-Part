import styles from './transaction.module.css'
import { cookies, headers } from "next/headers";

export default async function Transaction(transaction) {
  const sellerId = transaction.sellerId;
  const seller = await getUserById(sellerId)
  const productId = transaction.productId;
  const product = await getProductById(productId)
  
  const sellerName = seller.username;
  const productDescription = product.description;
  const number = transaction.number;
  const mailLocation = transaction.mailLocation;
  const price = product.price

  return (
    <div className={[styles.transaction, "card"].join(" ")}>
      <div className={"card-header"}>
        订单编号：{transaction.id}
      </div>
      <div className={"card-body"}>
        <div>
          卖家名称：{sellerName}
        </div>
        <div>
          产品描述：{productDescription}
        </div>
        <div>
          产品单价：{price}
        </div>
        <div>
          购买数量：{number}
        </div>
        <div>
          总价：{number * price}
        </div>
        <div>
          邮寄地址：{mailLocation}
        </div>
      </div>
    </div>
  )
}

async function getUserById(userId) {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const userPromise = await fetch(new URL(`/api/users/${userId}`, requestUrl), {
  })

  const userData = await userPromise.json();
  return userData;
}

async function getProductById(id) {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const productPromise = await fetch(new URL(`/api/products/${id}`, requestUrl), {
    cache: 'no-cache'
  })

  const productData = await productPromise.json();
  return productData;
}
