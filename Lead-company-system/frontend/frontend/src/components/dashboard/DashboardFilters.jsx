import { Card, Select } from "antd";

const periodOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" }
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "New", value: "New" },
  { label: "Pending", value: "Pending" },
  { label: "Won", value: "Won" },
  { label: "Lost", value: "Lost" }
];

function DashboardFilters({
  filters,
  setFilters,
  teams = [],
  teamsLoading = false
}) {
  const teamOptions = [
    { label: "All Teams", value: "all" },
    ...teams.map((team) => ({
      label: team.name,
      value: team._id
    }))
  ];

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            Dashboard Filters
          </h3>
          <p className="text-sm text-gray-500">
            Filter dashboard data by period, team, and lead status
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Select
            value={filters.period}
            options={periodOptions}
            onChange={(value) => handleChange("period", value)}
            className="min-w-[180px]"
            placeholder="Select period"
          />

          <Select
            value={filters.team}
            options={teamOptions}
            onChange={(value) => handleChange("team", value)}
            className="min-w-[180px]"
            placeholder="Select team"
            loading={teamsLoading}
            showSearch
            optionFilterProp="label"
          />

          <Select
            value={filters.status}
            options={statusOptions}
            onChange={(value) => handleChange("status", value)}
            className="min-w-[180px]"
            placeholder="Select status"
          />
        </div>
      </div>
    </Card>
  );
}

export default DashboardFilters;