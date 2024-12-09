"use client";
import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { UserContext, User } from "@/context/user-context";

export default function LognPage() {
  const { login } = useContext(UserContext);
  async function onFinish(values: User) {
    console.log(values.email);
    login(values);
  }
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 lg:flex justify-center  items-center h-full grid ">
        <h1>Login Page</h1>
      </div>
      <div className="flex w-1/2 bg-gray-100 justify-center items-center">
        <Form name="login" className="w-full mx-10" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a href="/register">Register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
