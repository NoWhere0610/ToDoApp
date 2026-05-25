import { type Dispatch, type SetStateAction } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

message.config({
  maxCount: 1,
});

export default function Login({ setToken }: LoginProps) {
  const onFinish = async (values: any) => {
    try {
      const response = await fetch("http://localhost:5069/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      } else {
        message.error("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Đăng Nhập</h2>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="mr-5"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="text-center text-sm text-gray-600 mt-4 flex justify-center">
            <p className='mr-2'>Chưa có tài khoản?</p>
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
