import { Button, Space, Card } from "antd";

export function Label() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold">Danh mục</h2>
      <p className=" font-light mb-5">Sắp xếp các nhiệm vụ của bạn theo danh mục</p>

      <Space size={[20, 20]} wrap>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key="length"
            title="Card title"
            variant="borderless"
            style={{ width: 400 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        ))}
      </Space>
    </div>
  );
}
