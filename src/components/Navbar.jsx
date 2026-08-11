import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Heart,
    Menu,
    ShoppingBag,
    ShoppingCart,
    X,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { cartCount } = useCart();

    const {
        wishlistItems,
    } = useWishlist();

    const wishlistCount = wishlistItems.length;

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        `relative transition-colors duration-200 ${
            isActive
                ? "text-cyan-400"
                : "text-gray-300 hover:text-cyan-400"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="group flex cursor-pointer items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-gray-950 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-300">
                        <ShoppingBag size={19} />
                    </div>

                    <span className="text-xl font-bold tracking-tight text-white">
                        Shop
                        <span className="text-cyan-400">
                            Sphere
                        </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

                    <NavLink
                        to="/"
                        className={navLinkClass}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={navLinkClass}
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/wishlist"
                        className="relative flex cursor-pointer items-center gap-2 text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        <Heart size={16} />

                        Wishlist

                        {wishlistCount > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                {wishlistCount}
                            </span>
                        )}
                    </NavLink>

                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">

                    {/* Wishlist Icon - Desktop */}
                    <Link
                        to="/wishlist"
                        className="relative hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-800 text-gray-300 transition duration-200 hover:border-red-500/40 hover:bg-red-500/5 hover:text-red-400 sm:flex"
                        aria-label="Wishlist"
                    >
                        <Heart
                            size={19}
                            fill="none"
                        />

                        {wishlistCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 text-sm font-medium text-gray-300 transition duration-200 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:text-cyan-400 sm:px-4"
                    >
                        <ShoppingCart size={18} />

                        <span className="hidden sm:inline">
                            Cart
                        </span>

                        {cartCount > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-gray-950">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen(
                                !mobileMenuOpen
                            )
                        }
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-800 text-gray-300 transition hover:border-gray-600 hover:text-white md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>

                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="border-t border-gray-800 bg-gray-950 md:hidden">

                    <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

                        <div className="flex flex-col gap-1">

                            <NavLink
                                to="/"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `cursor-pointer rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-cyan-400/10 text-cyan-400"
                                            : "text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/products"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `cursor-pointer rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-cyan-400/10 text-cyan-400"
                                            : "text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
                                    }`
                                }
                            >
                                Products
                            </NavLink>

                            <NavLink
                                to="/wishlist"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-red-500/10 text-red-400"
                                            : "text-gray-300 hover:bg-gray-900 hover:text-red-400"
                                    }`
                                }
                            >
                                <span className="flex items-center gap-2">
                                    <Heart size={17} />
                                    Wishlist
                                </span>

                                {wishlistCount > 0 && (
                                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </NavLink>

                            <NavLink
                                to="/cart"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-cyan-400/10 text-cyan-400"
                                            : "text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
                                    }`
                                }
                            >
                                <span className="flex items-center gap-2">
                                    <ShoppingCart size={17} />
                                    Cart
                                </span>

                                {cartCount > 0 && (
                                    <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-gray-950">
                                        {cartCount}
                                    </span>
                                )}
                            </NavLink>

                        </div>

                    </nav>

                </div>
            )}

        </header>
    );
}

export default Navbar;