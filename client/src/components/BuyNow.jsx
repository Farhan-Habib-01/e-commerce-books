import React from 'react'

import { useLocation } from "react-router-dom";

const BuyNow = () => {
  const { state } = useLocation();

  const book = state?.book;

  console.log(book);

  return (
    <div>
      <h1>{book?.bookTitle}</h1>
      <p>Price: ₹{book?.price}</p>
    </div>
  );
};

export default BuyNow;