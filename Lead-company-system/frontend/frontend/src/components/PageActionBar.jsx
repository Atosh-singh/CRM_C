import React from "react";
import { Button, Input, Select } from "antd";
import { useSelector } from "react-redux";

const { Search } = Input;

const PageActionBar = () => {
  const { actions, filters, onSearch } = useSelector(
    (state) => state.pageActions || {}
  );

  if (!actions?.length && !filters?.length && !onSearch) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: "10px 16px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {actions?.map((action, i) => (
          <Button
            key={i}
            type={action.type || "default"}
            icon={action.icon}
            onClick={action.onClick}
            loading={action.loading}
          >
            {action.label}
          </Button>
        ))}

        {filters?.map((f, i) => (
          <Select
            key={i}
            defaultValue={f.default}
            options={f.options}
            onChange={f.onChange}
            style={{ minWidth: 120 }}
          />
        ))}
      </div>

      {onSearch && (
        <Search
          placeholder="Search..."
          onSearch={onSearch}
          style={{ width: 220 }}
        />
      )}
    </div>
  );
};

export default PageActionBar;