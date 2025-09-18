import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-200 rounded-md p-3 bg-white flex flex-col justify-between h-full"
      >
        {/* Image */}
        <div className="group cursor-pointer flex items-center justify-center mb-2">
          <img
            className="group-hover:scale-105 transition h-28 sm:h-32 object-contain"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Info */}
        <div className="text-gray-500/70 text-xs sm:text-sm flex flex-col gap-1">
          <p className="capitalize">{product.category}</p>
          <p className="text-gray-700 font-medium text-sm sm:text-base leading-snug break-words line-clamp-2">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 text-xs sm:text-sm">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 sm:w-3.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p>(4)</p>
          </div>

          {/* Price + Cart */}
          <div className="flex items-end justify-between mt-2 sm:mt-3">
            <p className="text-sm sm:text-lg font-semibold text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-400 text-xs sm:text-sm line-through ml-1">
                {currency}
                {product.price}
              </span>
            </p>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[68px] sm:w-[80px] h-[32px] sm:h-[34px] rounded text-xs sm:text-sm"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart" className="w-3.5 sm:w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 w-[70px] sm:w-[80px] h-[32px] sm:h-[34px] bg-primary/20 rounded">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-sm px-2"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-sm px-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
