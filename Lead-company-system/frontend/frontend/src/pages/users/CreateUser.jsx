import { Form, Input, Button, Select, Card, message } from "antd";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Option } = Select;

function CreateUser() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchTeams();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles");
      setRoles(res.data || []);
    } catch {
      message.error("Failed to load roles");
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await API.get("/teams");
      setTeams(res.data.data || []);
    } catch {
      message.error("Failed to load teams");
    }
  };

  const onFinish = async (values) => {
    console.log("Submitted User Data:", values);
    console.log("Name:", values.name);
    console.log("Password:", values.password);

    try {
      setLoading(true);

      await API.post("/users", values);

      message.success("User created successfully");

      navigate("/users");
    } catch (error) {
      message.error(error.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Create User"
      style={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            placeholder="Enter password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select placeholder="Select role">
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="team" label="Team">
          <Select placeholder="Select team" allowClear>
            {teams.map((team) => (
              <Option key={team._id} value={team._id}>
                {team.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Create User
        </Button>
      </Form>
    </Card>
  );
}

export default CreateUser;
