import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            className="cursor-pointer text-xl font-bold text-white"
                        >
                            Shop
                            <span className="text-cyan-400">
                                Sphere
                            </span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
                            ShopSphere brings quality products together
                            in one simple and convenient shopping
                            experience. Discover new favorites, save
                            what you love, and shop with ease.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Shop
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">
                            <Link
                                to="/products"
                                className="cursor-pointer text-gray-500 transition hover:text-cyan-400"
                            >
                                All Products
                            </Link>

                            <Link
                                to="/wishlist"
                                className="cursor-pointer text-gray-500 transition hover:text-cyan-400"
                            >
                                Wishlist
                            </Link>

                            <Link
                                to="/cart"
                                className="cursor-pointer text-gray-500 transition hover:text-cyan-400"
                            >
                                Cart
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Company
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">
                            <Link
                                to="/"
                                className="cursor-pointer text-gray-500 transition hover:text-cyan-400"
                            >
                                About
                            </Link>

                            <Link
                                to="/"
                                className="cursor-pointer text-gray-500 transition hover:text-cyan-400"
                            >
                                Contact
                            </Link>

                            <Link
                                to="/"
                                className="cursor-pointer text-gray-500 transition hover:text-cyan-400"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Stay Updated
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-gray-500">
                            Subscribe for the latest products,
                            offers, and ShopSphere updates.
                        </p>

                        <div className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="min-w-0 flex-1 rounded-l-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400"
                            />

                            <button
                                type="button"
                                className="cursor-pointer rounded-r-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300 active:scale-95"
                            >
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col gap-3 border-t border-gray-800 pt-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © {new Date().getFullYear()} ShopSphere.
                        All rights reserved.
                    </p>

                    <p>
                        Simple. Convenient. ShopSphere.
                    </p>

                </div>

            </div>
        </footer>
    );
}

export default Footer;