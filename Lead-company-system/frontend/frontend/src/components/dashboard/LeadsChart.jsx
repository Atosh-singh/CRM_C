import { Card, Empty } from "antd";
import { Column, Pie, Bar } from "@ant-design/charts";
import { useMemo } from "react";

function LeadsChart({ stats, filters }) {
  const leadsTrendData = useMemo(() => {
    if (Array.isArray(stats.leadsTrend) && stats.leadsTrend.length > 0) {
      return stats.leadsTrend.map((item) => ({
        label: item.label || "N/A",
        value: item.value || 0
      }));
    }

    return [];
  }, [stats.leadsTrend]);

  const statusData = useMemo(() => {
    if (Array.isArray(stats.statusStats) && stats.statusStats.length > 0) {
      return stats.statusStats.map((item) => ({
        type: item.type || "Unknown",
        value: item.value || 0
      }));
    }

    return [];
  }, [stats.statusStats]);

  const teamData = useMemo(() => {
    if (Array.isArray(stats.teamStats) && stats.teamStats.length > 0) {
      return stats.teamStats.map((item) => ({
        teamName: item.teamName || "Unknown Team",
        total: item.total || 0
      }));
    }

    return [];
  }, [stats.teamStats]);

  const columnConfig = {
    data: leadsTrendData,
    xField: "label",
    yField: "value",
    label: {
      position: "top"
    },
    height: 300,
    autoFit: true
  };

const pieConfig = {
  data: statusData,
  angleField: "value",
  colorField: "type",
  radius: 0.9,

  // ❌ REMOVE THIS (causes crash sometimes)
  // innerRadius: 0.55,

  interactions: [{ type: "element-active" }],

  statistic: {
    title: false,
    content: {
      style: {
        fontSize: "16px",
        textAlign: "center",
        fontWeight: 600,
      },
      content: "Leads",
    },
  },

  // ✅ SAFE LABEL (NO ERROR)
  label: false,

  legend: {
    position: "bottom",
  },

  height: 300,
  autoFit: true,
};;

  const barConfig = {
    data: teamData,
    xField: "teamName",
    yField: "total",
    seriesField: "teamName",
    legend: false,
    height: 300,
    autoFit: true,
    label: {
      position: "right"
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Card
        className="rounded-2xl shadow-sm"
        title="Leads Trend"
        extra={<span className="text-sm text-gray-500">{filters.period}</span>}
      >
        {leadsTrendData.length > 0 ? (
          <Column {...columnConfig} />
        ) : (
          <Empty description="No trend data available" />
        )}
      </Card>

      <Card
        className="rounded-2xl shadow-sm"
        title="Lead Status Distribution"
      >
        {statusData.length > 0 ? (
          <Pie {...pieConfig} />
        ) : (
          <Empty description="No lead status data available" />
        )}
      </Card>

      <Card
        className="rounded-2xl shadow-sm xl:col-span-2"
        title="Team Performance"
      >
        {teamData.length > 0 ? (
          <Bar {...barConfig} />
        ) : (
          <Empty description="No team performance data available" />
        )}
      </Card>
    </div>
  );
}

export default LeadsChart;