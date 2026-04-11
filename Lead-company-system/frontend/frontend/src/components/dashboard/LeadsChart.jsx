import { Card, Empty } from "antd";
import { Column, Pie } from "@ant-design/charts";
import { useMemo } from "react";

function LeadsChart({ stats, filters }) {
  const columnData = useMemo(() => {
    if (Array.isArray(stats.leadsTrend) && stats.leadsTrend.length > 0) {
      return stats.leadsTrend.map((item) => ({
        label: item.label || item.month || item.date || "N/A",
        value: item.value || item.count || 0
      }));
    }

    return [
      { label: "Jan", value: 30 },
      { label: "Feb", value: 45 },
      { label: "Mar", value: 52 },
      { label: "Apr", value: 61 },
      { label: "May", value: 40 },
      { label: "Jun", value: 75 }
    ];
  }, [stats.leadsTrend]);

  const pieData = useMemo(() => {
    return [
      { type: "New", value: stats.newLeads || 0 },
      { type: "Pending", value: stats.pendingLeads || 0 },
      { type: "Converted", value: stats.convertedLeads || 0 }
    ];
  }, [stats]);

  const columnConfig = {
    data: columnData,
    xField: "label",
    yField: "value",
    label: {
      position: "top"
    },
    xAxis: {
      title: {
        text: filters.period?.toUpperCase() || "MONTHLY"
      }
    },
    yAxis: {
      title: {
        text: "Leads"
      }
    },
    height: 320,
    autoFit: true
  };

  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    innerRadius: 0.55,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{percentage}"
    },
    legend: {
      position: "bottom"
    },
    height: 320,
    autoFit: true
  };

  const totalPie = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card
        className="rounded-2xl shadow-sm"
        title="Leads Overview"
        extra={<span className="text-sm text-gray-500">{filters.period}</span>}
      >
        {columnData.length > 0 ? (
          <Column {...columnConfig} />
        ) : (
          <Empty description="No chart data available" />
        )}
      </Card>

      <Card
        className="rounded-2xl shadow-sm"
        title="Lead Status Distribution"
      >
        {totalPie > 0 ? (
          <Pie {...pieConfig} />
        ) : (
          <Empty description="No lead status data available" />
        )}
      </Card>
    </div>
  );
}

export default LeadsChart;