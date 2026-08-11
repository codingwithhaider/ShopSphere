import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Heart,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productApi";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            try {
                const data = await getProducts();

                // Only show a few products on the homepage
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error(
                    "Unable to load featured products:",
                    error
                );
            }
        };

        loadFeaturedProducts();
    }, []);

    const categories = [
        {
            name: "Beauty",
            description: "Explore beauty essentials.",
            icon: "✨",
        },
        {
            name: "Fragrances",
            description: "Discover your signature scent.",
            icon: "🌸",
        },
        {
            name: "Furniture",
            description: "Upgrade your living space.",
            icon: "🛋️",
        },
        {
            name: "Groceries",
            description: "Everyday essentials in one place.",
            icon: "🛒",
        },
    ];

    const benefits = [
        {
            icon: ShoppingBag,
            title: "Easy Shopping",
            description:
                "Browse products and add your favorites to your cart with ease.",
        },
        {
            icon: Heart,
            title: "Save Favorites",
            description:
                "Keep the products you love in your personal wishlist.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Experience",
            description:
                "Enjoy a clean, simple and reliable shopping experience.",
        },
    ];

    return (
        <main className="bg-gray-950">

            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden border-b border-gray-800">

                {/* Background Glow */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">

                    {/* Hero Content */}
                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-400">
                            <Sparkles size={14} />
                            Modern Shopping Experience
                        </div>

                        <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Discover products{" "}
                            <span className="text-cyan-400">
                                you'll love.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
                            Explore a curated collection of quality
                            products, discover new favorites, and enjoy
                            a simple shopping experience with ShopSphere.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">

                            <Link
                                to="/products"
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-95"
                            >
                                Shop Now
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                to="/products"
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-400 active:scale-95"
                            >
                                Explore Products
                            </Link>

                        </div>

                        {/* Trust Points */}
                        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">

                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-cyan-400"
                                />
                                Quality Products
                            </span>

                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-cyan-400"
                                />
                                Easy Shopping
                            </span>

                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-cyan-400"
                                />
                                Secure Experience
                            </span>

                        </div>

                    </div>

                    {/* Hero Visual */}
                    <div className="relative">

                        <div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" />

                        <div className="relative rounded-3xl border border-gray-800 bg-gray-900/80 p-4 shadow-2xl backdrop-blur sm:p-6">

                            <div className="grid grid-cols-2 gap-3 sm:gap-4">

                                <div className="group cursor-pointer rounded-2xl border border-gray-800 bg-gray-800/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                                    <div className="text-4xl transition duration-300 group-hover:scale-110">
                                        ⌚
                                    </div>

                                    <p className="mt-4 font-semibold text-white">
                                        Accessories
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Everyday essentials
                                    </p>
                                </div>

                                <div className="group cursor-pointer rounded-2xl border border-gray-800 bg-gray-800/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                                    <div className="text-4xl transition duration-300 group-hover:scale-110">
                                        💻
                                    </div>

                                    <p className="mt-4 font-semibold text-white">
                                        Electronics
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Smart technology
                                    </p>
                                </div>

                                <div className="group cursor-pointer rounded-2xl border border-gray-800 bg-gray-800/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                                    <div className="text-4xl transition duration-300 group-hover:scale-110">
                                        👟
                                    </div>

                                    <p className="mt-4 font-semibold text-white">
                                        Fashion
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Modern styles
                                    </p>
                                </div>

                                <div className="group cursor-pointer rounded-2xl bg-cyan-400 p-6 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300">
                                    <div className="text-4xl transition duration-300 group-hover:scale-110">
                                        🛍️
                                    </div>

                                    <p className="mt-4 font-semibold text-gray-950">
                                        ShopSphere
                                    </p>

                                    <p className="mt-1 text-xs text-gray-800">
                                        Everything you need
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ================= CATEGORIES ================= */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                            Explore
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            Shop by Category
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Find what you're looking for faster.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                    >
                        View All
                        <ArrowRight size={16} />
                    </Link>

                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to="/products"
                            className="group cursor-pointer rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-gray-900/80"
                        >

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-2xl transition duration-300 group-hover:bg-cyan-400/10 group-hover:scale-105">
                                {category.icon}
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-white">
                                {category.name}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {category.description}
                            </p>

                            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition group-hover:gap-2">
                                Explore
                                <ArrowRight size={15} />
                            </span>

                        </Link>
                    ))}

                </div>

            </section>

            {/* ================= FEATURED PRODUCTS ================= */}
            {products.length > 0 && (
                <section className="border-y border-gray-800 bg-gray-900/30">

                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                                    Featured
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-white">
                                    Popular Products
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    A few picks from our collection.
                                </p>
                            </div>

                            <Link
                                to="/products"
                                className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                            >
                                View All Products
                                <ArrowRight size={16} />
                            </Link>

                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}

                        </div>

                    </div>

                </section>
            )}

            {/* ================= WHY SHOPSPHERE ================= */}
            <section className="border-b border-gray-800">

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="mb-10 text-center">

                        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                            Why ShopSphere
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            Shopping made simple
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-gray-500">
                            Everything you need for a smooth and
                            enjoyable shopping experience.
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <div
                                    key={benefit.title}
                                    className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-gray-950">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-5 font-semibold text-white">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {benefit.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* ================= CTA ================= */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gray-900 px-6 py-16 text-center sm:px-10">

                    <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div className="relative">

                        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                            Start Shopping
                        </p>

                        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
                            Find your next favorite product.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-gray-500">
                            Browse our collection and discover
                            something new today.
                        </p>

                        <Link
                            to="/products"
                            className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cyan-400 px-7 py-3 font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-95"
                        >
                            Browse Products
                            <ArrowRight size={17} />
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;