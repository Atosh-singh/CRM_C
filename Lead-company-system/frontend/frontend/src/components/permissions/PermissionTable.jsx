import { Table, Button, Switch, Tag, message } from "antd";
import { useDispatch } from "react-redux";
import { updatePermission } from "../../redux/slices/permissionSlice";

function PermissionTable({
  data,
  loading,
  onRowClick,
  onEdit,
  onDelete,
  onRestore
}) {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Permission",
      dataIndex: "name",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => text || "-"
    },
    {
      title: "Status",
      dataIndex: "enabled",
      render: (enabled, record) => (
        <Switch
          checked={enabled}
          disabled={record.removed}
          onChange={async (checked) => {
            try {
              await dispatch(
                updatePermission({
                  id: record._id,
                  permissionData: { enabled: checked }
                })
              ).unwrap();

              message.success("Status updated");
            } catch {
              message.error("Update failed");
            }
          }}
        />
      )
    },
    {
      title: "State",
      render: (_, record) => (
        <Tag color={record.removed ? "red" : "green"}>
          {record.removed ? "Deleted" : "Active"}
        </Tag>
      )
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          {!record.removed && (
            <>
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
            </>
          )}

          {record.removed && (
            <Button
              type="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onRestore(record._id);
              }}
            >
              Restore
            </Button>
          )}
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

      // 🔥 BEST PRACTICE FIX (no accidental modal open)
      onRow={(record) => ({
        onClick: (e) => {
          const isControlClick =
            e.target.closest("button") ||
            e.target.closest(".ant-switch");

          if (isControlClick) return;

          onRowClick(record);
        }
      })}
    />
  );
}

export default PermissionTable;