import {
    Heart,
    ShoppingCart,
    Trash2,
    ArrowRight,
    Star,
    ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
    const {
        wishlistItems,
        removeFromWishlist,
    } = useWishlist();

    const { addToCart } = useCart();

    if (wishlistItems.length === 0) {
        return (
            <section className="min-h-screen bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center text-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-red-400">
                        <Heart
                            size={32}
                            fill="currentColor"
                        />
                    </div>

                    <p className="mt-6 text-sm font-medium uppercase tracking-wider text-red-400">
                        ShopSphere
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                        Your Wishlist is Empty
                    </h1>

                    <p className="mt-3 max-w-md text-gray-500">
                        Save products you love here and come back to
                        them whenever you want.
                    </p>

                    <Link
                        to="/products"
                        className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-95"
                    >
                        Explore Products
                        <ArrowRight size={17} />
                    </Link>

                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gray-950 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                            <Heart
                                size={22}
                                fill="currentColor"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-red-400">
                                ShopSphere
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                                Your Wishlist
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {wishlistItems.length}{" "}
                                {wishlistItems.length === 1
                                    ? "product"
                                    : "products"}{" "}
                                saved
                            </p>
                        </div>

                    </div>

                    <Link
                        to="/products"
                        className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-gray-800 px-4 py-2.5 text-sm font-medium text-gray-400 transition duration-200 hover:border-cyan-400/40 hover:text-cyan-400 sm:self-auto"
                    >
                        Continue Shopping
                        <ArrowRight size={15} />
                    </Link>

                </div>

                {/* Products */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {wishlistItems.map((product) => (
                        <article
                            key={product.id}
                            className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-cyan-950/20"
                        >

                            {/* Image */}
                            <div className="relative overflow-hidden bg-gray-800">

                                <Link
                                    to={`/products/${product.id}`}
                                    className="block cursor-pointer"
                                >
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                </Link>

                                {/* Wishlist Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeFromWishlist(
                                            product.id
                                        )
                                    }
                                    aria-label="Remove from wishlist"
                                    className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500/20 bg-gray-950/80 text-red-400 backdrop-blur-md transition-all duration-300 hover:border-red-400 hover:bg-red-500 hover:text-white active:scale-90"
                                >
                                    <Heart
                                        size={18}
                                        fill="currentColor"
                                    />
                                </button>

                                {/* Saved Badge */}
                                <div className="absolute bottom-3 left-3 rounded-full border border-red-500/20 bg-gray-950/80 px-3 py-1 text-xs font-medium text-red-400 backdrop-blur-md">
                                    Saved
                                </div>

                            </div>

                            {/* Content */}
                            <div className="p-5">

                                <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                                    {product.category}
                                </p>

                                <Link
                                    to={`/products/${product.id}`}
                                    className="cursor-pointer"
                                >
                                    <h2 className="mt-2 line-clamp-2 min-h-[48px] font-semibold text-white transition hover:text-cyan-400">
                                        {product.title}
                                    </h2>
                                </Link>

                                {/* Rating + Price */}
                                <div className="mt-4 flex items-center justify-between">

                                    <span className="text-xl font-bold text-white">
                                        ${product.price.toFixed(2)}
                                    </span>

                                    <span className="flex items-center gap-1 text-sm text-gray-400">
                                        <Star
                                            size={14}
                                            fill="currentColor"
                                            className="text-yellow-400"
                                        />

                                        {product.rating}
                                    </span>

                                </div>

                                {/* Actions */}
                                <div className="mt-5 flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-3 py-2.5 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-95"
                                    >
                                        <ShoppingCart size={16} />
                                        Add to Cart
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromWishlist(
                                                product.id
                                            )
                                        }
                                        aria-label="Remove product"
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-800 text-gray-500 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/5 hover:text-red-400 active:scale-90"
                                    >
                                        <Trash2 size={17} />
                                    </button>

                                </div>

                            </div>

                        </article>
                    ))}

                </div>

                {/* Bottom Trust Section */}
                <div className="mt-10 grid gap-4 border-t border-gray-800 pt-8 sm:grid-cols-2">

                    <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
                        <Heart
                            size={20}
                            className="shrink-0 text-red-400"
                            fill="currentColor"
                        />

                        <div>
                            <p className="text-sm font-medium text-white">
                                Your favorites, saved
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Easily find your favorite products later.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
                        <ShieldCheck
                            size={20}
                            className="shrink-0 text-cyan-400"
                        />

                        <div>
                            <p className="text-sm font-medium text-white">
                                Shop with confidence
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                A simple and secure shopping experience.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Wishlist;