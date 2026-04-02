import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function PageToolbar({
  title,
  showSearch = false,
  onSearch,
  actions = []
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}
    >
      {/* LEFT SIDE → TITLE */}
      <h2 style={{ margin: 0 }}>{title}</h2>

      {/* RIGHT SIDE */}
      <Space>
        {/* ✅ Conditional Search */}
        {showSearch && (
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch?.(e.target.value)}
            style={{ width: 250 }}
          />
        )}

        {/* ✅ Dynamic Buttons */}
        {actions.map((btn, index) => (
          <Button key={index} {...btn}>
            {btn.label}
          </Button>
        ))}
      </Space>
    </div>
  );
}

export default PageToolbar;