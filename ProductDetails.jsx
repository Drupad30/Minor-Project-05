import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div>
        <h2>Product Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />

      <div className="details-info">
        <h1>{product.name}</h1>
        <p>Category: {product.category}</p>
        <h2>₹{product.price}</h2>
        <p>{product.description}</p>

        <button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>

        <br /><br />
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default ProductDetails;