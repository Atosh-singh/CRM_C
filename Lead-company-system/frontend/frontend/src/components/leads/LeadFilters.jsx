import { Select } from "antd";

function LeadFilters({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
      <Select
        placeholder="Filter by status"
        allowClear
        style={{ width: 220 }}
        value={filters.status || undefined}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            status: value || "",
            page: 1
          }))
        }
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
    </div>
  );
}

export default LeadFilters;