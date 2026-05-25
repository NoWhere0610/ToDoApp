import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";

message.config({
  maxCount: 1
})

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch("http://localhost:5069/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password 
        }),
      });

      if (response.ok) {
        message.success("Đăng ký tài khoản thành công!");
        navigate("/login");
      } else {
        const errorData = await response.text();
        message.error(errorData || "Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi kết nối API đăng ký:", error);
      message.error("Không thể kết nối đến máy chủ!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Đăng Ký Tài Khoản</h2>        
        <Form
          form={form}
          name="register_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input size="large" placeholder="Nhập họ và tên của bạn" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <Input size="large" placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải chứa ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password size="large" placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng ký
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-600 mt-4 flex justify-center">
            <p className='mr-2'>Đã có tài khoản?</p>
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}