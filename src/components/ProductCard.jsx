import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { useCart } from "../context/CartContext";
import {
  useWishlist,
} from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const liked = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();

    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-cyan-950/20">

      {/* Image */}
      <div className="relative overflow-hidden bg-gray-800">

        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            liked
              ? "border-red-500/30 bg-red-500/10 text-red-400"
              : "border-gray-700 bg-gray-950/70 text-gray-300 hover:border-red-400/50 hover:text-red-400"
          }`}
        >
          <Heart
            size={18}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        {/* Discount */}
        {product.discountPercentage && (
          <span className="absolute left-3 top-3 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-gray-950">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
          {product.category}
        </p>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h2 className="mt-2 line-clamp-1 text-base font-semibold text-white transition-colors hover:text-cyan-400">
            {product.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1">
          <Star
            size={15}
            fill="currentColor"
            className="text-yellow-400"
          />

          <span className="text-sm text-gray-400">
            {product.rating}
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-5 flex items-center justify-between gap-3">

          <span className="text-xl font-bold text-white">
            ${product.price}
          </span>

          <button
            type="button"
            onClick={handleCart}
            className="flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-cyan-300 active:scale-95"
          >
            <ShoppingCart size={16} />
            Add
          </button>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;