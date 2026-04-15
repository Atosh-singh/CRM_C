import { Table } from "antd";

function UserTable({ data, loading, onRowClick, onlineUsers = [] }) {
  const columns = [
    {
      title: "Name",
      render: (_, record) => {
        const isOnline = onlineUsers.includes(record._id);

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            
            {/* 🟢 BLINK DOT */}
            {isOnline && (
              <span
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#52c41a",
                  borderRadius: "50%",
                  animation: "pulse 1.5s infinite"
                }}
              />
            )}

            <span>{record.name}</span>
          </div>
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Role",
      render: (_, record) => record.role?.name || record.role || "-"
    },
    {
      title: "Team",
      render: (_, record) => record.team?.name || record.team || "-"
    }
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="_id"
      loading={loading}
      onRow={(record) => ({
        onClick: () => onRowClick(record)
      })}
    />
  );
}

export default UserTable;