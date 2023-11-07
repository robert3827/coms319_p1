import React, { useState, useEffect } from "react";
import Catalog from "./Catalog";
import Cart  from "./Shop";
import Confirm from "../Confirmation"

export function App() {
  const [page, changePage] = useState("Cart");

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