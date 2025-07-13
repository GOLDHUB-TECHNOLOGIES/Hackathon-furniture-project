import React, { useState } from "react";
import { PRODUCTS } from "./product";
import Cart from "../assets/iconCart.png";

const productpage = () => {
  const [cartItems, setCartItems] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  });

  const addToCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] + 1 }));

    console.log(cartItems);
  };

  const subFromCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] - 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: (cartItems[id] = 0) }));
  };

  const totalAmount = () => {
    let amount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let productInfo = PRODUCTS.find(
          (product) => product.id === Number(key)
        );
        amount += Math.floor(cartItems[key] + productInfo.price);
      }
    }

    return amount;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-20 p-10 pr-96">
      {PRODUCTS.map((product) => (
        <div key={product.id}>
          <img
            className="w-40 h-40 object-contain"
            src={product.productImage}
            alt={product.productName}
          />
          <p>{product.productName}</p>
          <p>${product.price}</p>
          <button
            onClick={() => addToCart(product.id)}
            className="border-2 drop-shadow-2xl p-2 rounded hover:bg-green-300"
          >
            Add To Cart
          </button>
        </div>
      ))}

      <div className=" bg-red-600 fixed p-4 right-0 top-0 h-screen w-80 overflow-y-scroll">
        <div className="flex flex-wrap gap-3 justify-center">
          <img className="w-30 h-20" src={Cart} alt="my cart" />
          <h1 className="mt-7 font-bold text-2xl text-white">Your Cart</h1>
        </div>
        <div>
          <p className="text-3xl font-bold mt-5 text-white">
            Total: ${totalAmount()}
          </p>
        </div>
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      className="w-20 h-20 my-4"
                      src={product.productImage}
                      alt=""
                    />
                    X{" "}
                    <p className="text-2xl font-bol pl-2">
                      {cartItems[product.id]}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 font-bold">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-white bg-blue-700 hover:bg-white hover:text-blue-700 p-2 rounded"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="text-white text-2xl hover:bg-white hover:text-green-700 hover: p-1 hover:rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => subFromCart(product.id)}
                      className="text-black text-2xl hover:bg-white hover:text-red-500 hover:p-1 hover:rounded"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className=" flex items-center space-x-4 italic">
                  <p>{product.productName}</p>
                  <p>${product.price}</p>
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

export default productpage;
