import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import API from "../../api/axios";

const AnalyticsDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/analytics/dashboard").then(res => {
      setData(res.data);
    });
  }, []);

  const s = data.summary || {};

  return (
    <div style={{ padding: 20 }}>

      <h2>Revenue Analytics</h2>

      <Row gutter={16}>
        <Col span={6}><Card title="Leads">{s.totalLeads}</Card></Col>
        <Col span={6}><Card title="Converted">{s.converted}</Card></Col>
        <Col span={6}><Card title="Revenue">₹ {s.totalRevenue}</Card></Col>
        <Col span={6}><Card title="ROI">{s.roi?.toFixed(2)}%</Card></Col>
      </Row>

      <br />

      <Row gutter={16}>
        <Col span={12}><Card title="CPL">₹ {s.cpl?.toFixed(2)}</Card></Col>
        <Col span={12}><Card title="CPA">₹ {s.cpa?.toFixed(2)}</Card></Col>
      </Row>

      <br />

      <h3>Campaign Performance</h3>

      {data.campaigns?.map((c, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <b>{c._id || "Unknown Campaign"}</b>
          <p>Leads: {c.leads}</p>
          <p>Converted: {c.converted}</p>
          <p>Revenue: ₹ {c.revenue}</p>
          <p>Cost: ₹ {c.cost}</p>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsDashboard;