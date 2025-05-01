import ReviewForm from "./ReviewForm";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ReviewList = ({ reviews, onDelete, onUpdate }) => {
    const { user } = useContext(AuthContext);
    const [editId, setEditId] = useState(null);

    return (
        <ul className="admin-list">
            {reviews.map((rev) => (
                <li key={rev.id} className="admin-item">
                    <h3>{rev.user?.name} — {rev.rating}★</h3>
                    {editId === rev.id ? (
                        <ReviewForm
                            initialData={rev}
                            buttonText="Update"
                            onSubmit={(data) => {
                                onUpdate(rev.id, data);
                                setEditId(null);
                            }}
                        />
                    ) : (
                        <>
                            <p>{rev.comment}</p>
                            {user?.id === rev.user_id && (
                                <>
                                    <button className="button" onClick={() => setEditId(rev.id)}>Edit</button>
                                    <button className="button" onClick={() => onDelete(rev.id)}>Delete</button>
                                </>
                            )}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ReviewList;