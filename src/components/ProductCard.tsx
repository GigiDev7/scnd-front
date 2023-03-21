import React from "react";
import { IPRoduct } from "../interfaces";

const ProductCard: React.FC<{
  product: IPRoduct;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}> = ({ product, handleCheck }) => {
  return (
    <div className="relative border-2 border-black w-56 h-56 flex flex-col justify-center items-center font-semibold">
      <input
        onChange={(e) => handleCheck(e, product.id)}
        className="delete-checkbox absolute left-4 top-4 w-4 h-4"
        type="checkbox"
      />
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <p>{(+product.price).toFixed(2)}$</p>
      <p>{product.attribute}</p>
    </div>
  );
};

export default ProductCard;
