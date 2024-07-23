'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterUser() {
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Perform validation on the form fields
		// ...

		// Send a POST request to your server with the form data
		try {
			const response = await fetch('/api/products/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ description, price }),
				cache: 'no-cache'
			});

			if (response.ok) {
				router.push('/')
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
		<div className={"card"} style={{height:"100%"}}>
			<h1 className={"card-header"}>上传新的二手商品</h1>
			<form onSubmit={handleSubmit} style={{ margin: "auto" }}>
				<label className={["form-label"]}>
					产品描述：
					<input
						className={"form-control"}
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<br />
				<label className={"form-label"}>
					价格：
					<input
						className={"form-control"}
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</label>
				<br />
				<div className={"d-grid"}>
					<button
						type="submit"
						className={["btn", "btn-outline-primary"].join(" ")}
						disabled={!((description != '') && (price != ''))}
					>
						确认
					</button>
				</div>
			</form>
		</div>
	);
}
