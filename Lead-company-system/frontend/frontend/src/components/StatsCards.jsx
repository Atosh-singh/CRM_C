import { Card, Row, Col } from "antd";

function StatsCards() {

  const stats = [
    { title: "Total Leads", value: 320 },
    { title: "New Leads", value: 45 },
    { title: "Won Deals", value: 18 },
    { title: "Lost Deals", value: 6 }
  ];

  return (
    <Row gutter={16}>

      {stats.map((item, index) => (
        <Col span={6} key={index}>

          <Card
            style={{
              borderRadius: 10,
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
            }}
          >

            <h3 style={{ marginBottom: 8 }}>{item.title}</h3>

            <p style={{ fontSize: 24, fontWeight: 600 }}>
              {item.value}
            </p>

          </Card>

        </Col>
      ))}

    </Row>
  );
}

export default StatsCards;