import { ProductContext } from "@/context/product-context";
import React, { useContext, useEffect } from "react";
import { Drawer } from "antd";

export default function CartDrawer() {
  const { isCartDrawerVisible, setIsCartDrawerVisible , getCartByUser } =
    useContext(ProductContext);


useEffect(()=>{
    getCartByUser()
})
  return (
    <Drawer
      title="My Cart"
      onClose={() => {
        setIsCartDrawerVisible(false);
      }}
      open={isCartDrawerVisible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
