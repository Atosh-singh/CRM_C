import {  Avatar, Badge, Dropdown, Space, Typography } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
 
  SettingOutlined,
  ProfileOutlined
} from "@ant-design/icons";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import logo from "../assets/LOGO.png"

const { Text } = Typography;

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Dropdown Menu (Enhanced)
  const items = [
    {
      key: "user-info",
      label: (
        <div style={{ lineHeight: 1.4 }}>
          <div style={{ fontWeight: 600 }}>{user?.name}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user?.email}
          </Text>
        </div>
      )
    },
    { type: "divider" },

    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "View Profile",
      onClick: () => navigate("/profile")  
    },
    {
      key: "edit",
      icon: <SettingOutlined />,
      label: "Edit Profile",
      onClick: () => navigate("/edit-profile")
    },

    { type: "divider" },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
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
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}
  >
    {/* ✅ LEFT SIDE - LOGO ONLY */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={logo}
        alt="Company Logo"
        style={{
          height: 40,
          cursor: "pointer"
        }}
        onClick={() => navigate("/dashboard")} // ✅ redirect to dashboard
      />
    </div>

      {/* 🔔 Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        
        {/* Notifications */}
        <Badge count={3} size="small">
          <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </Badge>

        {/* 👤 Profile */}
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <Space
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: 8,
              transition: "0.2s",
            }}
            className="hover-bg"
          >
            <Avatar
              size={40}
              src={user?.image} // ✅ Cloudinary image
              icon={<UserOutlined />}
            />

            <div style={{ lineHeight: 1 }}>
              <div style={{ fontWeight: 500 }}>{user?.name}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {user?.role?.name || user?.role}
              </Text>
            </div>
          </Space>
        </Dropdown>

      </div>
    </div>
  );
}

export default Navbar;