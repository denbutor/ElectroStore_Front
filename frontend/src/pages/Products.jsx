import { useEffect, useState } from "react";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        productService.getAll().then((res) => setProducts(res.data));
        categoryService.getAll().then((res) => setCategories(res.data));
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            try {
                const res = await productService.searchByName(searchTerm);
                setProducts(res.data);
            } catch {
                console.error("Failed to search products");
            }
        } else {
            const res = await productService.getAll();
            setProducts(res.data);
        }
    };

    const handleCategory = async (categoryName) => {
        setSelectedCategory(categoryName);
        try {
            const res = await categoryService.getProductsByCategoryName(categoryName);
            setProducts(res.data);
        } catch {
            console.error("Failed to load category products");
        }
    };

    const handleSort = (option) => {
        setSortOption(option);
        const sorted = [...products];
        if (option === "price-asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (option === "price-desc") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (option === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        setProducts(sorted);
    };

    return (
        <div className="page">
            <h1>Products</h1>

            <div className="search-bar">
                <input
                    className="input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Product name..."
                />
                <button className="button" onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</button>
            </div>

            <div className="search-bar">
                <select
                    className="input"
                    value={selectedCategory}
                    onChange={(e) => handleCategory(e.target.value)}
                >
                    <option value="">Chose category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="search-bar">
                <select
                    className="input"
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">Sort by...</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                    <option value="name">Name A-Z</option>
                </select>
            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;