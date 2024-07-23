'use client'
import { useContext, useState } from "react";
import styles from "./layout.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Menu() {
  const [isShown, setIsShown] = useState(false);
  const router = useRouter();
  const signout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache'
      });

      if (response.ok) {
        router.push('/user/login');
      }
    } catch (error) {

    }
  }

  return (
    <div className={[styles.avatar, "dropdown"].join(" ")}>
      <div data-bs-toggle="dropdown">
        <i className={"fa fa-user-circle fa-fw"} style={{ fontSize: "48px", cursor: "pointer" }}></i>
      </div>

      <div className={[styles.menu, "dropdown-menu", "dropdown-menu-end"].join(" ")}>
        <div><a className={"dropdown-item"} href="/me">个人信息</a></div>
        <div><hr className={"dropdown-divider"} /></div>
        <div><a className={"dropdown-item"} href="/transactions/buy">已购物品</a></div>
        <div><a className={"dropdown-item"} href="/transactions/sell">订单管理</a></div>
        <div><hr className={"dropdown-divider"} /></div>
        <div><button className={"dropdown-item"} onClick={signout}>登出账户</button></div>
      </div>
    </div>
  )
}
