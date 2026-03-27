import { Form, Input, Button, Card, message } from "antd";
import API from "../../api/axios";

function CreateTeam() {

  const onFinish = async (values) => {

    try {

      await API.post("/teams", values);

      message.success("Team created successfully");

    } catch (error) {

      message.error(error.response?.data?.message || "Error");

    }

  };

  return (

    <Card
      title="Create Team"
      style={{
        maxWidth: 500,
        margin: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      <Form layout="vertical" onFinish={onFinish}>

        <Form.Item
          name="name"
          label="Team Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Example: Sales Team"/>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Team
        </Button>

      </Form>

    </Card>

  );

}

export default CreateTeam;