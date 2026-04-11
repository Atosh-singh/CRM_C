import { Drawer, Descriptions } from "antd";

function LeadDetailsDrawer({ open, onClose, lead }) {
  return (
    <Drawer
      title="Lead Details"
      placement="right"
      width={450}
      open={open}
      onClose={onClose}
    >
      {lead && (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Name">
            {lead.name || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Phone">
            {lead.phone || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {lead.email || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Interest">
            {lead.interest || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Source">
            {lead.source || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Location">
            {lead.locationData || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            {lead.status || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Car">
            {lead.car?.name || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Assigned To">
            {lead.assignedTo?.name || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Team">
            {lead.team?.name || "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Lead ID">
            {lead._id || "-"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
}

export default LeadDetailsDrawer;