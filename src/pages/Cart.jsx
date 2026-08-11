import {
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    ArrowRight,
    ShieldCheck,
    Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Cart() {
    const {
        cartItems,
        cartTotal,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <section className="min-h-screen bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center text-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-500">
                        <ShoppingBag size={32} />
                    </div>

                    <p className="mt-6 text-sm font-medium uppercase tracking-wider text-cyan-400">
                        ShopSphere
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                        Your Cart is Empty
                    </h1>

                    <p className="mt-3 max-w-md text-gray-500">
                        Looks like you haven't added anything to your
                        cart yet. Explore our products and find something
                        you'll love.
                    </p>

                    <Link
                        to="/products"
                        className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-95"
                    >
                        Start Shopping
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
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                            <ShoppingBag size={22} />
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                                ShopSphere
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                                Shopping Cart
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {totalItems}{" "}
                                {totalItems === 1
                                    ? "item"
                                    : "items"}{" "}
                                in your cart
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={clearCart}
                        className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-gray-800 px-4 py-2.5 text-sm text-gray-500 transition duration-200 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 sm:self-auto"
                    >
                        <Trash2 size={15} />
                        Clear Cart
                    </button>

                </div>

                {/* Main */}
                <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

                    {/* Cart Items */}
                    <div className="space-y-4">

                        {cartItems.map((item) => (
                            <article
                                key={item.id}
                                className="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition duration-300 hover:border-gray-700 sm:p-5"
                            >
                                <div className="flex gap-4">

                                    {/* Product Image */}
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="group shrink-0 overflow-hidden rounded-xl border border-gray-800 bg-gray-800"
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="h-24 w-24 object-cover transition duration-500 group-hover:scale-110 sm:h-32 sm:w-32"
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                                                {item.category}
                                            </p>

                                            <Link
                                                to={`/products/${item.id}`}
                                            >
                                                <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-white transition hover:text-cyan-400 sm:text-base">
                                                    {item.title}
                                                </h2>
                                            </Link>

                                            <p className="mt-2 text-lg font-bold text-white">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Quantity + Remove */}
                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                                            {/* Quantity */}
                                            <div className="flex items-center rounded-lg border border-gray-800 bg-gray-950">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-400 transition hover:bg-gray-900 hover:text-white active:scale-90"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={15} />
                                                </button>

                                                <span className="flex h-9 min-w-9 items-center justify-center border-x border-gray-800 px-2 text-sm font-medium text-white">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-400 transition hover:bg-gray-900 hover:text-cyan-400 active:scale-90"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={15} />
                                                </button>

                                            </div>

                                            {/* Remove */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-400"
                                            >
                                                <Trash2 size={15} />
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                                {/* Item Total */}
                                <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3 text-sm">

                                    <span className="text-gray-500">
                                        Item total
                                    </span>

                                    <span className="font-semibold text-white">
                                        $
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toFixed(2)}
                                    </span>

                                </div>

                            </article>
                        ))}

                    </div>

                    {/* Order Summary */}
                    <aside className="h-fit rounded-2xl border border-gray-800 bg-gray-900 p-6 lg:sticky lg:top-24">

                        <h2 className="text-lg font-semibold text-white">
                            Order Summary
                        </h2>

                        {/* Summary */}
                        <div className="mt-6 space-y-4">

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="font-medium text-white">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Shipping
                                </span>

                                <span className="font-medium text-green-400">
                                    Free
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Tax
                                </span>

                                <span className="text-gray-500">
                                    Calculated at checkout
                                </span>
                            </div>

                        </div>

                        <div className="my-6 border-t border-gray-800" />

                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-cyan-400">
                                ${cartTotal.toFixed(2)}
                            </span>
                        </div>

                        {/* Checkout */}
                        <button
                            type="button"
                            onClick={() =>
                                alert(
                                    "Checkout functionality coming soon!"
                                )
                            }
                            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-[0.98]"
                        >
                            Proceed to Checkout
                            <ArrowRight size={17} />
                        </button>

                        <Link
                            to="/products"
                            className="mt-4 block cursor-pointer text-center text-sm text-gray-500 transition hover:text-cyan-400"
                        >
                            Continue Shopping
                        </Link>

                        {/* Benefits */}
                        <div className="mt-6 space-y-3 border-t border-gray-800 pt-5">

                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Truck
                                    size={17}
                                    className="shrink-0 text-cyan-400"
                                />

                                <span>
                                    Free shipping on your order
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <ShieldCheck
                                    size={17}
                                    className="shrink-0 text-cyan-400"
                                />

                                <span>
                                    Secure shopping experience
                                </span>
                            </div>

                        </div>

                    </aside>

                </div>

            </div>
        </section>
    );
}

export default Cart;