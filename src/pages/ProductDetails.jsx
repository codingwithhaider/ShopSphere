import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    Star,
} from "lucide-react";

import { getProductById } from "../services/productApi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
    const { id } = useParams();

    const { addToCart } = useCart();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProductById(id);

                setProduct(data);
            } catch (error) {
                setError("Unable to load product.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-950">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-cyan-400" />

                    <p className="mt-4 text-sm text-gray-400">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    // Error
    if (error || !product) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-950 px-4 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-gray-500">
                    <ShoppingCart size={28} />
                </div>

                <h1 className="mt-6 text-2xl font-semibold text-white">
                    Product not found
                </h1>

                <p className="mt-2 max-w-md text-gray-500">
                    We couldn't find the product you're looking for.
                </p>

                <Link
                    to="/products"
                    className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300 active:scale-95"
                >
                    <ArrowLeft size={17} />
                    Back to Products
                </Link>

            </div>
        );
    }

    const liked = isInWishlist(product.id);

    const handleWishlist = () => {
        if (liked) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <section className="min-h-screen bg-gray-950 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Back */}
                <Link
                    to="/products"
                    className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-400"
                >
                    <ArrowLeft size={16} />
                    Back to Products
                </Link>

                {/* Product */}
                <div className="mt-8 grid gap-10 lg:grid-cols-2">

                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

                        {/* Discount */}
                        {product.discountPercentage && (
                            <span className="absolute left-4 top-4 z-10 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-gray-950">
                                -{Math.round(product.discountPercentage)}%
                            </span>
                        )}

                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full max-h-[550px] min-h-[400px] w-full object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        {/* Category */}
                        <p className="text-sm font-medium uppercase tracking-[0.15em] text-cyan-400">
                            {product.category}
                        </p>

                        {/* Title */}
                        <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="mt-4 flex items-center gap-2">

                            <div className="flex items-center gap-1">
                                <Star
                                    size={17}
                                    fill="currentColor"
                                    className="text-yellow-400"
                                />

                                <span className="font-medium text-white">
                                    {product.rating}
                                </span>
                            </div>

                            <span className="text-gray-700">
                                •
                            </span>

                            <span className="text-sm text-gray-500">
                                Customer Rating
                            </span>

                        </div>

                        {/* Price */}
                        <div className="mt-6 flex items-center gap-4">

                            <span className="text-3xl font-bold text-cyan-400">
                                ${product.price}
                            </span>

                            {product.discountPercentage && (
                                <span className="text-sm text-gray-500 line-through">
                                    $
                                    {(
                                        product.price /
                                        (1 -
                                            product.discountPercentage /
                                                100)
                                    ).toFixed(2)}
                                </span>
                            )}

                        </div>

                        {/* Description */}
                        <p className="mt-6 leading-7 text-gray-400">
                            {product.description}
                        </p>

                        {/* Product Info */}
                        <div className="mt-6 grid grid-cols-2 gap-3">

                            {/* Brand */}
                            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Brand
                                </p>

                                <p className="mt-2 font-medium text-white">
                                    {product.brand || "ShopSphere"}
                                </p>
                            </div>

                            {/* Stock */}
                            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Availability
                                </p>

                                <p
                                    className={`mt-2 font-medium ${
                                        product.stock > 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {product.stock > 0
                                        ? `${product.stock} available`
                                        : "Out of Stock"}
                                </p>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            {/* Add To Cart */}
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3.5 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
                            >
                                <ShoppingCart size={18} />

                                {product.stock > 0
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                            </button>

                            {/* Wishlist */}
                            <button
                                type="button"
                                onClick={handleWishlist}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-3.5 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                                    liked
                                        ? "border-red-500/30 bg-red-500/10 text-red-400"
                                        : "border-gray-800 text-gray-300 hover:border-red-500/40 hover:text-red-400"
                                }`}
                            >
                                <Heart
                                    size={18}
                                    fill={
                                        liked
                                            ? "currentColor"
                                            : "none"
                                    }
                                />

                                {liked
                                    ? "Wishlisted"
                                    : "Wishlist"}
                            </button>

                        </div>

                        {/* Trust Info */}
                        <div className="mt-6 grid gap-3 border-t border-gray-800 pt-6 sm:grid-cols-3">

                            <div>
                                <p className="text-sm font-medium text-white">
                                    ✓ Secure Shopping
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Safe & reliable experience
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-white">
                                    ✓ Easy Returns
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Simple return process
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-white">
                                    ✓ Quality Products
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Carefully selected items
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;