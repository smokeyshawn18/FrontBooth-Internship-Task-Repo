import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "/posts",
    icon: <InfoCircleOutlined />,
    label: <Link to="/posts">Posts</Link>,
  },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          MyApp
        </Link>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          className="border-none bg-transparent min-w-[200px] justify-end"
        />
      </div>
    </header>
  );
}
