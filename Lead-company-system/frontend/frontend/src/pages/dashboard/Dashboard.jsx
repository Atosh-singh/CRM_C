import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Spin, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDashboardStats,
  clearDashboardError
} from "../../redux/slices/dashboardSlice";
import { fetchTeams } from "../../redux/slices/teamSlice";

import DashboardFilters from "../../components/dashboard/DashboardFilters";
import StatsCards from "../../components/dashboard/StatsCards";
import LeadsChart from "../../components/dashboard/LeadsChart";

const { Title, Text } = Typography;

function Dashboard() {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.dashboard);
  const { teams, loading: teamsLoading } = useSelector((state) => state.teams);

  const [filters, setFilters] = useState({
    period: "monthly",
    team: "all",
    status: "all"
  });

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDashboardStats(filters));
  }, [dispatch, filters]);

  const normalizedStats = useMemo(() => {
    const data = stats || {};
    const overview = data.overview || {};
    const charts = data.charts || {};

    return {
      totalLeads: overview.totalLeads || 0,
      todayLeads: overview.todayLeads || 0,
      monthLeads: overview.monthLeads || 0,
      wonLeads: overview.wonLeads || 0,
      lostLeads: overview.lostLeads || 0,
      newLeads: overview.newLeads || 0,
      pendingLeads: overview.pendingLeads || 0,
      convertedLeads: overview.convertedLeads || 0,
      conversionRate: overview.conversionRate || 0,
      leadsTrend: Array.isArray(charts.leadsTrend) ? charts.leadsTrend : [],
      teamStats: Array.isArray(charts.teamStats) ? charts.teamStats : [],
      userStats: Array.isArray(charts.userStats) ? charts.userStats : [],
      statusStats: Array.isArray(charts.statusStats) ? charts.statusStats : [],
      recentActivities: Array.isArray(data.recentActivities)
        ? data.recentActivities
        : []
    };
  }, [stats]);

  const handleRefresh = () => {
    dispatch(clearDashboardError());
    dispatch(fetchTeams());
    dispatch(fetchDashboardStats(filters));
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
              Monitor leads, team performance, and overall CRM activity.
            </Text>
          </div>

          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading || teamsLoading}
          >
            Refresh
          </Button>
        </div>

        <div className="mb-6">
          <DashboardFilters
            filters={filters}
            setFilters={setFilters}
            teams={teams}
            teamsLoading={teamsLoading}
          />
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
                    Latest lead-related updates
                  </p>
                </div>

                <div className="space-y-4">
                  {normalizedStats.recentActivities.length > 0 ? (
                    normalizedStats.recentActivities
                      .slice(0, 6)
                      .map((item, index) => (
                        <div
                          key={item._id || index}
                          className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {item.title || "Activity update"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.time
                              ? new Date(item.time).toLocaleString()
                              : "Recently"}
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