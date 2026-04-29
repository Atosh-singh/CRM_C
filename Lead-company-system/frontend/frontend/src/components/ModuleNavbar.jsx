import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const moduleItems = [
  { key: "/dashboard", label: "Dashboard" },
  { key: "/leads", label: "Leads" },
  { key: "/meetings", label: "Meetings" },
  { key: "/google-meet", label: "Google Meet" },
  { key: "/ads", label: "Ads Analytics" },
  { key: "/teams", label: "Teams" },
  { key: "/roles", label: "Roles" },
  { key: "/permissions", label: "Permissions" },
];

const ModuleNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "0 16px",
      }}
    >
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={moduleItems}
        onClick={(e) => navigate(e.key)}
      />
    </div>
  );
};

export default ModuleNavbar;