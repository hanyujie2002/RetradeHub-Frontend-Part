'use client'
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


export default function RegisterUser() {
  const [email, setEmail] = useState('');
  const [passwd, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation on the form fields
    // ...

    // Send a POST request to your server with the form data
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, passwd}),
      });

      if (response.ok) {
        router.push('/');
        // Redirect to the login page
        // router.push('/login');

      } else {
        const toastEl = document.getElementById('toast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
        // Handle error response from the server
        // ...
      }
    } catch (error) {
      // Handle network or other errors
      // ...
    }
  };

  return (
    <main className={"card"}>
      <div className={"position-fixed top-0 start-50 translate-middle-x"} style={{ zIndex: 11 }}>
        <div id="toast" className={"toast"} role="alert" aria-live="assertive" aria-atomic="true">
          <div className={"toast-header"}>
            <strong class="me-auto">登录失败</strong>
            <button type="button" className={"btn-close"} data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className={"toast-body"}>
            账号或密码错误，请重新输入
          </div>
        </div>
      </div>


      <h1 className={"card-header"}>账号登录</h1>
      <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
        <label className={"form-label"}>
          电子邮箱：
          <input
            className={"form-control"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label className={"form-label"}>
          密码：
          <input
            className={"form-control"}
            type="password"
            value={passwd}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <div className={"d-grid"}>
          <button
            type="submit"
            className={"btn btn-outline-primary btn-block"}
            disabled={!((email != '') && (passwd != ''))}
          >登录
          </button>
        </div>
      </form>

      <div>
        <Link href="/user/register">没有账号？注册一个</Link>
      </div>
    </main>
  );
}
