"use client";

import axios from "axios";
// import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}
interface item {
  _id: string;
  count: number;
}

export interface Cart {
  userId: string;
  productList: Array<item>;
}

interface ProductContextType {
  loading: boolean;
  products: [];
  setLoading: (loading: boolean) => void;
  getAllProducts: () => void;
  getCartByUser: () => void;
  isCartDrawerVisible: boolean;
  setIsCartDrawerVisible: (loading: boolean) => void;
  createCart: (productId: string, count: number) => void;
}

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState();
  const [isCartDrawerVisible, setIsCartDrawerVisible] = useState(false);

  async function getAllProducts() {
    setLoading(true);
    const result = await axios.get("http://localhost:3000/api/products");
    console.log(result.data.data);
    if (result != undefined) {
      setProducts(result.data.data);
    }
    setLoading(false);
  }

  async function getCartByUser() {
    const result = await axios.get("http://localhost:3000/api/cart", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(result);
  }

  async function createCart(productId: string, count: number) {
    const itemData = {
      productId,
      count,
    };
    const result = await axios.post(
      "http://localhost:3000/api/cart",
      {
        itemData,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(result);
  }

  return (
    <ProductContext.Provider
      value={{
        loading,
        getAllProducts,
        products,
        getCartByUser,
        isCartDrawerVisible,
        setIsCartDrawerVisible,
        createCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
