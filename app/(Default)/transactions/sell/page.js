import { cookies, headers } from "next/headers";
import Transaction from "./transaction";

export default async function Sell() {
  const myTransactionsAsSeller = await getMyTransactionsAsSeller();
  // return JSON.stringify(myTransactionsAsSeller);
  return (
    <div>
      <h1>待发货/接收：</h1>
      {myTransactionsAsSeller.map((transaction) => {
        if (transaction.status == 0) {
          return (
            <Transaction {...transaction} />
          )
        } else {
          return null
        }
      })}

      <h1>买家已收货</h1>
      {myTransactionsAsSeller.map((transaction) => {
        if (transaction.status == 1) {
          return (
            <Transaction {...transaction} />
          )
        } else {
          return null
        }
      })}
    </div>
  );
}

async function getMyTransactionsAsSeller() {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const response = await fetch(new URL('/api/transactions/seller', requestUrl), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: cookies().toString(),
    },
    cache: 'no-cache'
  })

  return await response.json();
}
