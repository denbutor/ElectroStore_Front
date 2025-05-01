import { useState, useEffect } from "react";
import axios from "axios";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image_url: "",
        category_id: "",
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/`);
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product.id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            category_id: product.category_id,
        });
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (id) => {
        try {
            await axios.patch(
                `${API_URL}/products/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    return (
        <div className="page">
            <h1>Admin: Manage Products</h1>
            <ul className="admin-list">
                {products.map((product) => (
                    <li key={product.id} className="admin-item">
                        {editingProduct === product.id ? (
                            <div className="form">
                                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input" />
                                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input" />
                                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="input" />
                                <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} className="input" />
                                <input type="number" name="category_id" placeholder="Category ID" value={formData.category_id} onChange={handleChange} className="input" />
                                <button className="button" onClick={() => handleSave(product.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{product.name}</h3>
                                <p>{product.price} $</p>
                                <button className="button" onClick={() => startEdit(product)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProducts;
