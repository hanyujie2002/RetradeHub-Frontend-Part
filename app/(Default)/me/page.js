import { cookies, headers } from "next/headers";
import UserName from './userName'
import Passwd from "./passwd";

export default async function Profile() {
  const currentUser = await getCurrentUser();

  return (
    <div className={"card"} style={{height: "100%"}}>
      <h1 className={"card-header"}>我的个人信息</h1>
      <div style={{ margin: "auto" }}>
        <UserName userName={currentUser.username} />
        <Passwd />
      </div>
    </div>
  )
}

async function getCurrentUser() {
  const headersList = headers();
  const host = headersList.get("host");
  const requestUrl = `http://${host}`

  const response = await fetch(new URL('/api/users/me', requestUrl), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: cookies().toString(),
    }
  })

  return await response.json();
}
