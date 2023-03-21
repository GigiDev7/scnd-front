import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC<{
  page: "products" | "newProduct";
  onSaveClick?: () => void;
  onDeleteClick?: () => void;
  productIds?: string[];
}> = ({ page, onSaveClick, productIds, onDeleteClick }) => {
  return (
    <div className="flex justify-between my-16 px-2 border-b-2 border-b-black pb-5">
      <h2 className="font-semibold text-xl">
        {page == "products" ? "Product List" : "Product Add"}
      </h2>
      <div className="flex gap-5 items-center">
        {page == "products" ? (
          <>
            <Link to="/add-product">ADD</Link>
            <button
              disabled={!productIds?.length}
              onClick={onDeleteClick}
              className="border-[1px] border-black px-4 py-1 shadow-lg disabled:opacity-30"
              id="delete-product-btn"
            >
              MASS DELETE
            </button>
          </>
        ) : (
          <>
            <button
              className="border-[1px] border-black px-4 py-1 shadow-lg"
              onClick={onSaveClick}
            >
              Save
            </button>
            <Link to="/">Cancel</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
