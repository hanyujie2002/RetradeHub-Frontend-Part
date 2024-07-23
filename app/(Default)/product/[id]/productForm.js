'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


export default function ProductForm(product) {
  const [number, setNumber] = useState(1);
  const [mailLocation, setMailLocation] = useState('');
  const productId = product.id;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation on the form fields
    // ...

    // Send a POST request to your server with the form data
    try {
      const response = await fetch(`/api/transactions/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailLocation, number }),
        cache: 'no-cache'
      });

      if (response.ok) {
        router.push('/');
        // Redirect to the login page
        // router.push('/login');

      } else {
        // Handle error response from the server
        // ...
      }
    } catch (error) {
      // Handle network or other errors
      // ...
    }
  };

  return (
    <main>
      <div>总价格：{number * product.price}</div>
      <form onSubmit={handleSubmit}>
        <label>
          购买数量：
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            min={1}
            step={1}
          />
        </label>
        <br />
        <label>
          邮寄地址：
          <input
            type="text"
            value={mailLocation}
            onChange={(e) => setMailLocation(e.target.value)}
          />
        </label>
        <br />
        <button 
        type="submit"
         className={["btn", "btn-outline-primary"].join(" ")}
        disabled={!((number != '') && (mailLocation != ''))} 
         >购买</button>
      </form>
    </main>
  );
}
