"use client";
import { Product, ProductContext } from "@/context/product-context";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import CartDrawer from "./cart-drawer";

export default function ProductPage() {
  const { getAllProducts, products, setIsCartDrawerVisible, createCart } =
    useContext(ProductContext);
  const router = useRouter();
  const { Meta } = Card;

  useEffect(() => {
    getAllProducts();
  }, [router]);
  return (
    <div className="w-full h-screen">
      <div className="w-full text-center font-extrabold text-4xl my-10 bg-gray-200 py-10">
        <h1>Products</h1>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            setIsCartDrawerVisible(true);
          }}
        >
          Open
        </Button>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-10 grid-cols-4 mx-10">
          {products.map((product: Product) => (
            <div key={product._id} className="bg-red-100 gap-10 text-center">
              <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <ShoppingCartOutlined
                    key={product._id}
                    onClick={() => {
                      createCart(product._id, 1);
                    }}
                  />,
                ]}
              >
                <Meta title={product.name} description={product.description} />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>No Product Found</h1>
        </div>
      )}
      <CartDrawer />
    </div>
  );
}
