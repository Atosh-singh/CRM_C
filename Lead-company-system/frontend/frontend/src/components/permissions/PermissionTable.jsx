import { Table, Button } from "antd";

function PermissionTable({ data, loading, onRowClick, onEdit, onDelete }) {
  const columns = [
    {
      title: "Permission Name",
      dataIndex: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => text || "-"
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

export default PermissionTable;