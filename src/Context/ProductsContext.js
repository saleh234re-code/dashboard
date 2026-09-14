import axios from "axios";
import { createContext } from "react";
import { useState, useEffect } from "react";
export const productsContext = createContext([]);
export default function ProductContext({ children }) {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response =await axios.get("https://fakestoreapi.com/products");
      setproduct(response.data);
    };

    getProducts();
  }, []);

  return (
    <div>
      <productsContext.Provider value={{ product, setproduct }}>
        {children}
      </productsContext.Provider>
    </div>
  );
}
