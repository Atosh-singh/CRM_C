import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Spin, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboardStats, clearDashboardError } from "../../redux/slices/dashboardSlice";
import DashboardFilters from "../../components/dashboard/DashboardFilters";
import StatsCards from "../../components/dashboard/StatsCard";
import LeadsChart from "../../components/dashboard/LeadsChart";

const { Title, Text } = Typography;

function Dashboard() {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.dashboard);

  const [filters, setFilters] = useState({
    period: "monthly",
    team: "all",
    status: "all"
  });

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const normalizedStats = useMemo(() => {
    const data = stats || {};

    return {
      totalLeads: data.totalLeads || 0,
      newLeads: data.newLeads || 0,
      convertedLeads: data.convertedLeads || 0,
      pendingLeads: data.pendingLeads || 0,
      totalUsers: data.totalUsers || 0,
      totalCars: data.totalCars || 0,
      totalTeams: data.totalTeams || 0,
      revenue: data.revenue || 0,
      leadsTrend: Array.isArray(data.leadsTrend) ? data.leadsTrend : [],
      recentActivities: Array.isArray(data.recentActivities) ? data.recentActivities : []
    };
  }, [stats]);

  const handleRefresh = () => {
    dispatch(clearDashboardError());
    dispatch(fetchDashboardStats());
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Title level={2} className="!mb-1">
              CRM Dashboard
            </Title>
            <Text type="secondary">
              Monitor leads, users, cars, and overall business activity.
            </Text>
          </div>

          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            Refresh
          </Button>
        </div>

        <div className="mb-6">
          <DashboardFilters filters={filters} setFilters={setFilters} />
        </div>

        {error && (
          <div className="mb-6">
            <Alert
              message="Dashboard Error"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => dispatch(clearDashboardError())}
            />
          </div>
        )}

        {loading && !stats ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white shadow-sm">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <StatsCards stats={normalizedStats} />

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <LeadsChart stats={normalizedStats} filters={filters} />
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Recent Activity
                  </h3>
                  <p className="text-sm text-gray-500">
                    Latest updates from your CRM system
                  </p>
                </div>

                <div className="space-y-4">
                  {normalizedStats.recentActivities.length > 0 ? (
                    normalizedStats.recentActivities.slice(0, 6).map((item, index) => (
                      <div
                        key={item._id || index}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {item.title || item.message || "Activity update"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.time || item.createdAt || "Recently"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                      No recent activity available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;