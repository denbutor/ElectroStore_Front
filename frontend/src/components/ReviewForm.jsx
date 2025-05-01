import { useState } from "react";

const ReviewForm = ({ onSubmit, initialData = {}, buttonText = "Submit" }) => {
    const [rating, setRating] = useState(initialData.rating || 5);
    const [comment, setComment] = useState(initialData.comment || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="input">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
            <textarea
                className="input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                rows={3}
                required
            />
            <button className="button" type="submit">{buttonText}</button>
        </form>
    );
};

export default ReviewForm;