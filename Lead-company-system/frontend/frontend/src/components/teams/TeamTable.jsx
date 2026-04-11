import { Table, Button } from "antd";

function TeamTable({ data, loading, onRowClick, onEdit, onDelete }) {
  const columns = [
    {
      title: "Team Name",
      dataIndex: "name"
    },
    {
      title: "Team Lead",
      render: (_, record) => record.lead?.name || "-"
    },
    {
      title: "Members",
      render: (_, record) => record.members?.length || 0
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

export default TeamTable;