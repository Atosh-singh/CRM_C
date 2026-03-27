import { Layout, Menu, Drawer, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { menuConfig } from "../utils/menuConfig";
import { canAccess } from "../utils/authUtils";

const { Sider } = Layout;

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [authDrawer, setAuthDrawer] = useState(false);

  const generateMenu = (config) => {

    return config
      .map((item) => {

        if (item.type === "divider") return item;

        if (item.roles && !item.roles.includes(user?.role)) return null;

        if (item.permission && !canAccess(user, item.permission)) return null;

        if (item.children) {

          const children = item.children
            .filter((child) => canAccess(user, child.permission))
            .map((child) => ({
              key: child.key,
              icon: child.icon,
              label: child.label
            }));

          if (!children.length) return null;

          return {
            key: item.key,
            label: item.label,
            children
          };
        }

        return {
          key: item.key,
          icon: item.icon,
          label: item.label
        };

      })
      .filter(Boolean);

  };

  const items = generateMenu(menuConfig);

  const handleMenuClick = (e) => {

    if (e.key === "authorization") {
      setAuthDrawer(true);
      return;
    }

    navigate(e.key);

  };

  return (
    <>
      <Sider
        collapsible
        width={230}
        style={{
          background: "#f3f4f6",
          borderRight: "1px solid #e5e7eb",
          minHeight: "100vh",
        }}
      >

        <div
          style={{
            height: 60,
            fontSize: 18,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          CRM Panel
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={handleMenuClick}
          style={{
            borderRight: "none",
            background: "#f3f4f6"
          }}
        />

      </Sider>

      <Drawer
        title="Authorization Panel"
        placement="right"
        size="large"
        open={authDrawer}
        onClose={() => setAuthDrawer(false)}
      >

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          <Button onClick={() => navigate("/users")}>
            Manage Users
          </Button>

          <Button onClick={() => navigate("/users/create")}>
            Create User
          </Button>

          <Button onClick={() => navigate("/roles/create")}>
            Create Role
          </Button>

          <Button onClick={() => navigate("/permissions/create")}>
            Create Permission
          </Button>

          <Button onClick={() => navigate("/teams/create")}>
            Create Team
          </Button>

        </div>

      </Drawer>
    </>
  );
}

export default Sidebar;