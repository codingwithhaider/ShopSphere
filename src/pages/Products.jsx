import { useEffect, useMemo, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    X,
    ArrowUpDown,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productApi";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const categories = useMemo(() => {
        return [
            "all",
            ...new Set(
                products.map((product) => product.category)
            ),
        ];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (search.trim()) {
            const searchTerm = search.toLowerCase();

            result = result.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(searchTerm)
            );
        }

        // Category
        if (category !== "all") {
            result = result.filter(
                (product) =>
                    product.category === category
            );
        }

        // Sorting
        if (sort === "price-low") {
            result.sort(
                (a, b) => a.price - b.price
            );
        }

        if (sort === "price-high") {
            result.sort(
                (a, b) => b.price - a.price
            );
        }

        if (sort === "rating") {
            result.sort(
                (a, b) => b.rating - a.rating
            );
        }

        return result;
    }, [products, search, category, sort]);

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setSort("default");
    };

    const hasFilters =
        search ||
        category !== "all" ||
        sort !== "default";

    // Loading
    if (loading) {
        return (
            <section className="min-h-screen bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">

                    <div className="text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-cyan-400" />

                        <p className="mt-4 text-sm text-gray-400">
                            Loading products...
                        </p>
                    </div>

                </div>
            </section>
        );
    }

    // Error
    if (error) {
        return (
            <section className="min-h-screen bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">

                    <div className="max-w-md rounded-2xl border border-red-500/20 bg-gray-900 p-8 text-center">

                        <h1 className="text-xl font-semibold text-white">
                            Something went wrong
                        </h1>

                        <p className="mt-3 text-sm text-red-400">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                window.location.reload()
                            }
                            className="mt-6 cursor-pointer rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300 active:scale-95"
                        >
                            Try Again
                        </button>

                    </div>

                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gray-950 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.15em] text-cyan-400">
                            ShopSphere Store
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                            Explore Products
                        </h1>

                        <p className="mt-2 max-w-xl text-gray-400">
                            Discover products that match your
                            style and find something you'll love.
                        </p>
                    </div>

                    {/* Product Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <SlidersHorizontal size={16} />

                        <span>
                            {products.length} total products
                        </span>
                    </div>

                </div>

                {/* Filters */}
                <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-5">

                    <div className="mb-5 flex items-center justify-between">

                        <div className="flex items-center gap-2">
                            <SlidersHorizontal
                                size={18}
                                className="text-cyan-400"
                            />

                            <h2 className="font-semibold text-white">
                                Filter & Sort
                            </h2>
                        </div>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-400"
                            >
                                <X size={15} />
                                Clear
                            </button>
                        )}

                    </div>

                    <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">

                        {/* Search */}
                        <div>
                            <label
                                htmlFor="search"
                                className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                                Search
                            </label>

                            <div className="relative">

                                <Search
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                                />

                                <input
                                    id="search"
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search products..."
                                    className="w-full rounded-lg border border-gray-800 bg-gray-950 py-3 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSearch("")
                                        }
                                        className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-gray-500 transition hover:text-white"
                                    >
                                        <X size={17} />
                                    </button>
                                )}

                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                                Category
                            </label>

                            <select
                                id="category"
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="w-full cursor-pointer rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm capitalize text-white outline-none transition focus:border-cyan-400"
                            >
                                {categories.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item === "all"
                                            ? "All Categories"
                                            : item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label
                                htmlFor="sort"
                                className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                                Sort By
                            </label>

                            <div className="relative">

                                <ArrowUpDown
                                    size={16}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                                />

                                <select
                                    id="sort"
                                    value={sort}
                                    onChange={(e) =>
                                        setSort(
                                            e.target.value
                                        )
                                    }
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-800 bg-gray-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-400"
                                >
                                    <option value="default">
                                        Default
                                    </option>

                                    <option value="price-low">
                                        Price: Low to High
                                    </option>

                                    <option value="price-high">
                                        Price: High to Low
                                    </option>

                                    <option value="rating">
                                        Highest Rated
                                    </option>
                                </select>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Results Header */}
                <div className="mb-5 flex items-center justify-between">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-300">
                            {filteredProducts.length}
                        </span>{" "}
                        products
                    </p>

                    {hasFilters && (
                        <p className="text-xs text-cyan-400">
                            Filters active
                        </p>
                    )}

                </div>

                {/* Products */}
                {filteredProducts.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {filteredProducts.map(
                            (product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            )
                        )}

                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-20 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                            <Search size={24} />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-white">
                            No products found
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            We couldn't find any products
                            matching your search or filters.
                        </p>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-6 cursor-pointer rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300 active:scale-95"
                            >
                                Clear Filters
                            </button>
                        )}

                    </div>
                )}

            </div>
        </section>
    );
}

export default Products;