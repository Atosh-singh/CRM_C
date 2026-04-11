import { Card, Col, Row, Statistic } from "antd";
import {
  CarOutlined,
  TeamOutlined,
  UserOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  DatabaseOutlined
} from "@ant-design/icons";

function SingleStatCard({ title, value, icon, valueStyle }) {
  return (
    <Card className="rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <Statistic title={title} value={value} valueStyle={valueStyle} />
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
      title: "New Leads",
      value: stats.newLeads,
      icon: <DatabaseOutlined />,
      valueStyle: { color: "#722ed1" }
    },
    {
      title: "Converted Leads",
      value: stats.convertedLeads,
      icon: <CheckCircleOutlined />,
      valueStyle: { color: "#52c41a" }
    },
    {
      title: "Pending Leads",
      value: stats.pendingLeads,
      icon: <ClockCircleOutlined />,
      valueStyle: { color: "#faad14" }
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <TeamOutlined />,
      valueStyle: { color: "#13c2c2" }
    },
    {
      title: "Total Cars",
      value: stats.totalCars,
      icon: <CarOutlined />,
      valueStyle: { color: "#eb2f96" }
    },
    {
      title: "Total Teams",
      value: stats.totalTeams,
      icon: <RiseOutlined />,
      valueStyle: { color: "#fa541c" }
    },
    {
      title: "Revenue",
      value: stats.revenue,
      icon: <DollarOutlined />,
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
          />
        </Col>
      ))}
    </Row>
  );
}

export default StatsCards;