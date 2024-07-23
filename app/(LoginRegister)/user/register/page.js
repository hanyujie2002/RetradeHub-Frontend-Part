'use client'
import Image from "next/image";
// import styles from "../page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation on the form fields
    // ...

    // Send a POST request to your server with the form data
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, passwd }),
      });

      if (response.ok) {
        router.push('/user/login')
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
    <main className={"card"}>
      <h1 className={"card-header"}>用户注册</h1>
      <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
        <label className={"form-label"}>
          用户名：
          <input
            className={"form-control"}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
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
        <label className={"form-label"}>
          再次输入密码：
          <input
            className={"form-control"}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
          </input>
        </label>
        {
          (passwd == '') ?
            <></>
            :
            <span>
              <br />
              {
                (passwd == confirmPassword) ?
                  <span style={{ color: "darkgreen" }}>两个密码相同</span>
                  :
                  <span style={{ color: "orange" }}>两个密码不同</span>
              }
            </span>
        }
        <br/>
        <div className={"d-grid"}>
        <button
          className={"btn btn-outline-primary btn-block"}
          type="submit"
          disabled={!((passwd != '') && (passwd == confirmPassword) && (username != '') && (email != ''))}
        >

          注册
        </button>
</div>
      </form>
    </main>
  );
}
