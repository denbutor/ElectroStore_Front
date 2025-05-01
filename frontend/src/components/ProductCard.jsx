import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        addToCart(product.id, quantity)
            .then(() => showToast("Product added to cart", "success"))
            .catch(() => showToast("Error adding to cart", "error"));
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} className="product-link">
                <img src={product.image_url} alt={product.name} className="product-image" />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price} $</p>
            </Link>
            <div className="quantity-controls">
                <button className="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button className="button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="button" onClick={handleAdd}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
