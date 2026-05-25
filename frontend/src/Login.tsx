import { type Dispatch, type SetStateAction } from "react";
import { Form, Input, Button } from "antd";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

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
        alert("Đăng nhập thất bại");
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
            <div className="flex justify-center">
              <Button type="primary" htmlType="submit" size="large" block className="mr-5">
                Đăng nhập
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                href="http://localhost:5173/register"
              >Đăng ký</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
