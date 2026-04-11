import { Table } from "antd";

function UserTable({ data, loading, onRowClick }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name"
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