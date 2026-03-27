import { Input, Avatar, Badge, Dropdown } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined
} from "@ant-design/icons";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [
    {
      key: "profile",
      label: (
        <div>
          <div style={{ fontWeight: 600 }}>{user?.name}</div>
          <div style={{ fontSize: 12 }}>{user?.role}</div>
        </div>
      )
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout
    }
  ];

  return (
    <div
      style={{
        height: 64,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      }}
    >

      {/* Search */}
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search leads..."
        style={{
          width: 300,
          borderRadius: 6
        }}
      />

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

        <Badge count={3}>
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <div style={{ cursor: "pointer", display: "flex", gap: 10 }}>
            <Avatar icon={<UserOutlined />} />
            <span>{user?.name}</span>
          </div>
        </Dropdown>

      </div>
    </div>
  );
}

export default Navbar;