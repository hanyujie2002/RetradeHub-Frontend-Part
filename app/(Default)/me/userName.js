'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserName({ userName }) {
  const [editing, setEditing] = useState(false);
  const [username, setUserName] = useState(userName);
  const [newusername, setNewUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    const response = await fetch(`/api/users/username`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'username': newusername })
    });

    if (response.ok) {
      setUserName(newusername);
      setNewUsername('')
      // userName = newusername;
      // setNewUsername('');
      setEditing(false);
    } else {
      // Handle error response from the server
      // ...
    }
  }

  const cancelSubmit = async (e) => {
    setNewUsername('')
    setEditing(false)
  }

  const enterEdit = async (e) => {
    setEditing(true)
  }

  return (
    <div>
      {
        editing ?
          <div>
            <label className={"form-label"}>
              输入你的新用户名：
              <input
                className={"form-control"}
                type="text"
                onChange={(e) => setNewUsername(e.target.value)}
              >
              </input>
            </label>

            <button 
            className={"btn btn-outline-primary"}
            onClick={handleSubmit} 
            disabled={newusername==''}>确定</button>
            <button onClick={cancelSubmit} className={"btn btn-outline-primary"}>取消</button>
          </div>
          :
          <div>
            用户名：{username}
            <button onClick={enterEdit} className={"btn btn-outline-primary"}>编辑</button>
          </div>
      }
    </div>
  );
}
