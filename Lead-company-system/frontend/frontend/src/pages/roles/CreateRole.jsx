import { Form, Input, Button, Select, Card, message } from "antd";
import { useEffect, useState } from "react";
import API from "../../api/axios";

const { Option } = Select;

function CreateRole() {

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {

    try {

      const res = await API.get("/permissions");

      setPermissions(res.data || []);

    } catch {

      message.error("Failed to load permissions");

    }

  };

  const onFinish = async (values) => {

    try {

      await API.post("/roles", values);

      message.success("Role created successfully");

    } catch (error) {

      message.error(error.response?.data?.message || "Error");

    }

  };

  return (

    <Card
      title="Create Role"
      style={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      <Form layout="vertical" onFinish={onFinish}>

        <Form.Item
          name="name"
          label="Role Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Example: SALES_MANAGER"/>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input placeholder="Role description"/>
        </Form.Item>

        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true }]}
        >

          <Select mode="multiple" placeholder="Select permissions">

            {permissions.map((perm) => (

              <Option key={perm._id} value={perm.name}>
                {perm.name}
              </Option>

            ))}

          </Select>

        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create Role
        </Button>

      </Form>

    </Card>

  );

}

export default CreateRole;