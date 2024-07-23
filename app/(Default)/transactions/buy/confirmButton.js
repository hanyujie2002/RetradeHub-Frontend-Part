'use client'
import { useRouter } from "next/navigation";

export default function ConfirmButton({id}) {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/transactions/status/${id}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        router.refresh();
        
        // router.push('/');
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
    <div className={"card-footer"}>
      <button className={["btn", "btn-outline-primary"].join(" ")} onClick={handleSubmit}>收货确认</button>
    </div>
  )
}
