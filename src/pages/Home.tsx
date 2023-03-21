import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { BASE_URL } from "../config";
import { IPRoduct } from "../interfaces";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<IPRoduct[] | null>(null);
  const [checkedProductIds, setCheckedProductIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/read.php`);
        if (data.data) {
          setProducts(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!e.target.checked) {
      setCheckedProductIds((prev) => prev.filter((id) => id !== id));
    } else {
      setCheckedProductIds((prev) => [...prev, id]);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.post(`${BASE_URL}/delete.php`, {
        ids: checkedProductIds,
      });
      setCheckedProductIds([]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header
        onDeleteClick={handleDeleteClick}
        productIds={checkedProductIds}
        page="products"
      />
      <div className="flex flex-wrap gap-12">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleCheck={handleCheck}
            />
          ))}
        {products && products.length == 0 && <p>No products found!</p>}
      </div>
    </div>
  );
};

export default Home;
