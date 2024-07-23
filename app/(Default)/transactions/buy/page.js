import { cookies, headers } from "next/headers";
import Transaction from "./transaction";
import TransactionWithButton from "./transactionWithButton";

export default async function Cust() {
  const myTransactionsAsCust = await getMyTransactionsAsCust();
  // return JSON.stringify(myTransactionsAsSeller);
  return (
    <div>
      <h1>已购二手商品：</h1>
      {myTransactionsAsCust.map((transaction) => {
        if (transaction.status == 0) {
          return (
            <div>
              <TransactionWithButton {...transaction} />
            </div>
          )
        } else {
          return null
        }
      })}

      <h1>历史订单</h1>
      {myTransactionsAsCust.map((transaction) => {
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

async function getMyTransactionsAsCust() {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const response = await fetch(new URL('/api/transactions/cust', requestUrl), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: cookies().toString(),
    },
    cache: 'no-cache'
  })

  return await response.json();
}
