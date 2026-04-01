"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const isEmpty = cartItems.length === 0;

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className="mb-6 md:mb-10">
          <p className="text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-brand-red font-medium">
              Home
            </Link>{" "}
            / <span className="text-brand-red font-semibold">Cart</span>
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Cart
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-500">
            {isEmpty
              ? "You have no items in your cart right now."
              : `You have ${cartItems.length} ${
                  cartItems.length === 1 ? "item" : "items"
                } in your cart.`}
          </p>
        </header>

        {isEmpty ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 flex flex-col items-center text-center gap-3">
            <p className="text-lg font-semibold text-gray-900">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-500 max-w-sm">
              Browse our latest products and add something you like.
            </p>
            <Link
              href="/shop"
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-red text-white text-sm font-bold hover:bg-[#ff1a2b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.variantKey}-${index}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 flex gap-4 md:gap-5"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                    <Image
                      src={
                        item.images?.[0] ||
                        item.imageUrl ||
                        "/no-image.svg"
                      }
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h2 className="text-sm md:text-base font-bold text-gray-900 leading-snug">
                          {item.name}
                        </h2>
                        {item.variants && (
                          <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] md:text-xs text-gray-500">
                            {item.variants.storage && (
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                {item.variants.storage}
                              </span>
                            )}
                            {item.variants.colors?.name && (
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <span
                                  className="w-2 h-2 rounded-full inline-block"
                                  style={{
                                    backgroundColor: item.variants.colors.hex,
                                  }}
                                ></span>
                                {item.variants.colors.name}
                              </span>
                            )}
                            {item.variants.region && (
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                {item.variants.region}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.variantKey)
                        }
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-2 md:mt-3">
                      <div className="flex flex-col">
                        <span className="text-sm md:text-lg font-extrabold text-gray-900">
                          ৳
                          {(item.numericPrice * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400">
                          ৳{item.numericPrice.toLocaleString()} each
                        </span>
                      </div>

                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.variantKey,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-md transition-all disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.variantKey,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-md transition-all"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 h-fit">
              <h2 className="text-sm md:text-base font-extrabold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-2 text-sm md:text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-extrabold text-gray-900">
                  ৳{cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] md:text-xs text-gray-400 mb-4">
                Shipping and final discounts are calculated at checkout.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/checkout" className="w-full">
                  <button className="w-full py-3 bg-brand-red hover:bg-[#ff1a2b] text-white font-bold rounded-xl shadow-lg shadow-brand-red/20 transition-colors text-sm">
                    Proceed to Checkout
                  </button>
                </Link>
                <Link href="/shop" className="w-full">
                  <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-xl border border-gray-200 transition-colors text-xs md:text-sm">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}


