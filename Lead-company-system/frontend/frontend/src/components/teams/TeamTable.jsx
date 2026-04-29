import { Table, Button, Switch, Tag, message } from "antd";
import { useDispatch } from "react-redux";
import { updateTeam } from "../../redux/slices/teamSlice";

function TeamTable({
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
      title: "Team Name",
      dataIndex: "name"
    },
    {
      title: "Team Lead",
      render: (_, record) => record.lead?.name || "-"
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
          updateTeam({
            id: record._id,
            teamData: { enabled: checked },
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
          {!record.removed ? (
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
          ) : (
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
      onRow={(record) => ({
        onClick: (e) => {
          const isControl =
            e.target.closest("button") ||
            e.target.closest(".ant-switch");

          if (isControl) return;

          onRowClick(record);
        }
      })}
    />
  );
}

export default TeamTable;