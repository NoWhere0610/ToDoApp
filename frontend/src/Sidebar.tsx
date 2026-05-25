import { Menu, Layout } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/inbox",
    label: "Hộp thư đến",
  },
  {
    key: "/today",
    label: "Hôm nay",
  },
  {
    key: "/upcoming",
    label: "Sắp tới",
  },
  {
    key: "/labels",
    label: "Danh mục",
  },
];

export const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider style={{ background: '#fff' }} width="20%">
      <h1 className="text-blue-600 font-bold m-3 text-2xl text-center">
        Không gian làm việc
      </h1>
      <Menu
        selectedKeys={[location.pathname]} 
        mode="inline"
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};