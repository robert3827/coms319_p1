import React, { useState, useEffect } from "react";
import Catalog from "./Catalog";
import Cart  from "./Shop";

export function App() {
  const [page, changePage] = useState("Browse");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    fetch("../selected_products.json")
      .then((response) => response.json())
      .then((json) => {
        json = json.products;
        setProducts(json);
        setCart(Object.fromEntries(json.map((product) => [product.name, 0])));
        setProductPrices(
          Object.fromEntries(
            json.map((product) => [product.name, product.price])
          )
        );
      });
  }, []);

  function removeFromCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: Math.max(0, cart[productName] - 1),
    }));
  }
  function addToCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: cart[productName] + 1,
    }));
  }
  function resetCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: 0,
    }));
  }

  return (
    <div className="h-screen" style={{ backgroundColor: "darkslategrey" }}>
      <Catalog
        isActive={page === "Catalog"}
        changePage={changePage}
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        productPrices={productPrices}
        products={products}
      />
      <Cart
        isActive={page === "Cart"}
        changePage={changePage}
        addToCart={addToCart}
        resetCart={resetCart}
        cart={cart}
        productPrices={productPrices}
      />
    </div>
  );
}