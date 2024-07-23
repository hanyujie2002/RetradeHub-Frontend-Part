import Link from "next/link"

export default function Product(product) {
  return (
    <div style={{ textAlign: "center" }}>
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: "black" }}>
        <div style={{ width: 100, height: 100, display: 'flex', margin: 'auto' }}><img src={'/img/' + product.id + '.jpg'} style={{ maxWidth: '100%', margin: 'auto' }}></img></div>
        <div style={{ margin: '20px' }}>{product.description}</div>
        <div>{product.price} 元</div>
      </Link>
    </div>
  )
}
