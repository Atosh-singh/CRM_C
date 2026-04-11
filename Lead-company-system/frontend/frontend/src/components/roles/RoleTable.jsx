import { Table, Button, Tag } from "antd";

function RoleTable({
  data,
  loading,
  onRowClick,
  onEdit,
  onDelete,
  resolvePermissionName
}) {
  const columns = [
    {
      title: "Role Name",
      dataIndex: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => text || "-"
    },
    {
      title: "Permissions",
      render: (_, record) => {
        const permissions = record.permissions || [];

        if (!permissions.length) return "-";

        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {permissions.slice(0, 3).map((permission, index) => (
              <Tag key={`${permission}-${index}`}>
                {resolvePermissionName(permission)}
              </Tag>
            ))}

            {permissions.length > 3 && (
              <Tag>+{permissions.length - 3} more</Tag>
            )}
          </div>
        );
      }
    },
    {
      title: "Status",
      render: (_, record) => (
        <Tag color={record.enabled ? "green" : "red"}>
          {record.enabled ? "Enabled" : "Disabled"}
        </Tag>
      )
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(record);
            }}
          >
            Edit
          </Button>

          <Button
            danger
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(record._id);
            }}
          >
            Delete
          </Button>
        </div>
      )
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

export default RoleTable;