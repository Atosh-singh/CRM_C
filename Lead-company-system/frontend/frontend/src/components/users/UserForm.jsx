import { Form, Input, Button, Select } from "antd";
import { useEffect } from "react";

const { Option } = Select;

function UserForm({
  initialValues,
  roles = [],
  teams = [],
  onSubmit,
  loading = false,
  showPassword = true
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      password: "",
      role:
        initialValues?.role?._id ||
        initialValues?.role ||
        undefined,
      team:
        initialValues?.team?._id ||
        initialValues?.team ||
        undefined
    });
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const payload = { ...values };

    if (!showPassword) {
      delete payload.password;
    }

    if (!payload.team) {
      delete payload.team;
    }

    onSubmit(payload);

    if (!initialValues) {
      form.resetFields();
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
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
          { type: "email", message: "Enter valid email" }
        ]}
      >
        <Input placeholder="Enter email" autoComplete="username" />
      </Form.Item>

      {showPassword && (
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter password" },
            { min: 6, message: "Password must be at least 6 characters" }
          ]}
        >
          <Input.Password
            placeholder="Enter password"
            autoComplete="new-password"
          />
        </Form.Item>
      )}

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
        {initialValues ? "Update User" : "Create User"}
      </Button>
    </Form>
  );
}

export default UserForm;