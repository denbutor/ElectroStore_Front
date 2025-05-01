import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import productService from "../services/productService";
import reviewService from "../services/reviewService";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { addToCart } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        productService.getById(id).then(res => setProduct(res.data));
        reviewService.getReviewsByProduct(id).then(res => setReviews(res.data));
    }, [id]);

    const handleCreateReview = async (data) => {
        try {
            await reviewService.createReview({ ...data, product_id: id });
            const updated = await reviewService.getReviewsByProduct(id);
            setReviews(updated.data);
            showToast("Review added", "success");
        } catch {
            showToast("Failed to add review", "error");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await reviewService.deleteReview(reviewId);
            const updated = await reviewService.getReviewsByProduct(id);
            setReviews(updated.data);
            showToast("Review deleted", "success");
        } catch {
            showToast("Failed to delete review", "error");
        }
    };

    const handleUpdateReview = async (reviewId, data) => {
        try {
            await reviewService.updateReview(reviewId, data);
            const updated = await reviewService.getReviewsByProduct(id);
            setReviews(updated.data);
            showToast("Review updated", "success");
        } catch {
            showToast("Failed to update review", "error");
        }
    };

    if (!product) return <div className="page"><p>Loading...</p></div>;

    return (
        <div className="page">
            <div className="product-detail">
                <img className="product-detail-image" src={product.image_url} alt={product.name} />
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h2>{product.price} $</h2>
                    <button className="button" onClick={() => {
                        addToCart(product.id, 1);
                        showToast("Added to cart", "success");
                    }}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <h2>Reviews</h2>
            <ReviewForm onSubmit={handleCreateReview} />
            <ReviewList reviews={reviews} onDelete={handleDeleteReview} onUpdate={handleUpdateReview} />
        </div>
    );
};

export default ProductDetail;
