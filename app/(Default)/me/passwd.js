'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Passwd() {
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const enterEdit = async (e) => {
    setEditing(true)
  }

  const cancelSubmit = async (e) => {
    setPassword('')
    setConfirmPassword('')
    setEditing(false)
  }

  const handleSubmit = async (e) => {
    const response = await fetch(`/api/users/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      // userName = newusername;
      // setNewUsername('');
      setPassword('')
      setConfirmPassword('')
      setEditing(false);
    } else {
      // Handle error response from the server
      // ...
    }
  }

  return (
    <div>
      {
        editing ?
          <div>
            请输入密码：
            <input
              className={"form-control"}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            >
            </input>
            <br />
            再次输入密码：
            <input
              className={"form-control"}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
            </input>
            {
              (password == '') ?
                <></>
                :
                <span>
                  <br />
                  {
                    (password == confirmPassword) ?
                      <span style={{ color: "darkgreen" }}>两个密码相同</span>
                      :
                      <span style={{ color: "orange" }}>两个密码不同</span>
                  }
                </span>
            }
            <br />
            <button
              className={"btn btn-outline-primary"}
              onClick={handleSubmit}
              disabled={!((password != '') && (password == confirmPassword))}
            >
              确认
            </button>
            <button
              className={"btn btn-outline-primary"}
              onClick={cancelSubmit}
            >
              取消
            </button>
          </div>
          :
          <div>
            密码：
            <button
              className={"btn btn-outline-primary"}
              onClick={enterEdit}
            >
              修改密码
            </button>
          </div>
      }
    </div>
  )
}
