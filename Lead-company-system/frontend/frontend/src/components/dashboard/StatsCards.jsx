import { Card, Col, Row, Statistic } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  InboxOutlined,
  RiseOutlined
} from "@ant-design/icons";

function SingleStatCard({ title, value, icon, valueStyle, suffix }) {
  return (
    <Card className="rounded-2xl border-0 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <Statistic
            title={title}
            value={value}
            suffix={suffix}

            // ✅ FIXED (new API)
            styles={{
              content: valueStyle || {}
            }}
          />
        </div>

        <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}

function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: <UserOutlined />,
      valueStyle: { color: "#1677ff" }
    },
    {
      title: "Today's Leads",
      value: stats.todayLeads,
      icon: <CalendarOutlined />,
      valueStyle: { color: "#13c2c2" }
    },
    {
      title: "This Month",
      value: stats.monthLeads,
      icon: <BarChartOutlined />,
      valueStyle: { color: "#722ed1" }
    },
    {
      title: "Won Leads",
      value: stats.wonLeads,
      icon: <CheckCircleOutlined />,
      valueStyle: { color: "#52c41a" }
    },
    {
      title: "Lost Leads",
      value: stats.lostLeads,
      icon: <CloseCircleOutlined />,
      valueStyle: { color: "#ff4d4f" }
    },
    {
      title: "Pending Leads",
      value: stats.pendingLeads,
      icon: <ClockCircleOutlined />,
      valueStyle: { color: "#faad14" }
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: <InboxOutlined />,
      valueStyle: { color: "#2f54eb" }
    },
    {
      title: "Conversion Rate",
      value: stats.conversionRate,
      suffix: "%",
      icon: <RiseOutlined />,
      valueStyle: { color: "#389e0d" }
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={card.title}>
          <SingleStatCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            valueStyle={card.valueStyle}
            suffix={card.suffix}
          />
        </Col>
      ))}
    </Row>
  );
}

export default StatsCards;