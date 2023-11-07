import React, { useState, useEffect } from "react";
import Catalog from "./Catalog";
import Cart  from "./Shop";
import Confirm from "../Confirmation"

export function App() {
  const [page, changePage] = useState("Confirm");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    fetch("../selected_products.json")
      .then((response) => response.json())
      .then((json) => {
        json = json.products;
        setProducts(json);
        setCart(Object.fromEntries(json.map((product) => [product.title, 0])));
        setProductPrices(
          Object.fromEntries(
            json.map((product) => [product.title, product.price])
          )
        );
      });
  }, []);

  if (page === "Catalog") {
    return (
      <div>
        {Catalog()}
      </div>
    );
  }
  if (page === "Cart") {
    return (
      <div>
        {Cart()}
      </div>
    );
  }
  if (page === "Confirm") {
    return (
      <div>
        {Confirm()}
      </div>
    );
  }
}