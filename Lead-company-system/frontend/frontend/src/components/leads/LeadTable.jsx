import { Table, Button, Select } from "antd";

function LeadTable({
  leads,
  pagination,
  loading,
  setFilters,
  onView,
  onEdit,
  onDelete,
  onStatusChange
}) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value) => value || "-"
    },
    {
      title: "Car",
      render: (_, record) => record.car?.name || "-"
    },
    {
      title: "Assigned To",
      render: (_, record) => record.assignedTo?.name || "-"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 140 }}
          onChange={(value) => onStatusChange(record, value)}
          options={[
            { value: "New", label: "New" },
            { value: "Assigned", label: "Assigned" },
            { value: "Contacted", label: "Contacted" },
            { value: "Interested", label: "Interested" },
            { value: "FollowUp", label: "Follow Up" },
            { value: "TestDrive", label: "Test Drive" },
            { value: "Won", label: "Won" },
            { value: "Lost", label: "Lost" },
            { value: "Closed", label: "Closed" }
          ]}
        />
      )
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="link" onClick={() => onView(record)}>
            View
          </Button>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => onDelete(record)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  const handleTableChange = (tablePagination) => {
    setFilters((prev) => ({
      ...prev,
      page: tablePagination.current,
      limit: tablePagination.pageSize
    }));
  };

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={leads}
      loading={loading}
      pagination={{
        current: pagination?.page || 1,
        total: pagination?.total || 0,
        pageSize: pagination?.limit || 10
      }}
      onChange={handleTableChange}
    />
  );
}

export default LeadTable;