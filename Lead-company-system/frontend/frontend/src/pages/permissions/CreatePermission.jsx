import { Form, Input, Button, Card, message } from "antd";
import API from "../../api/axios";

function CreatePermission() {

  const onFinish = async (values) => {

    try {

      await API.post("/permissions", values);

      message.success("Permission created successfully");

    } catch (error) {

      message.error(error.response?.data?.message || "Error");

    }

  };

  return (

    <Card
      title="Create Permission"
      style={{
        maxWidth: 500,
        margin: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      <Form layout="vertical" onFinish={onFinish}>

        <Form.Item
          name="name"
          label="Permission Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Example: CREATE_LEAD" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Permission
        </Button>

      </Form>

    </Card>

  );
}

export default CreatePermission;