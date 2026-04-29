import { Form, Input, Button, Select } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

function RoleForm({ initialValues, permissions = [], onSubmit }) {
  const [form] = Form.useForm();

  // ✅ Sync form when editing
  useEffect(() => {
    if (!initialValues) return;

    const selectedPermissions =
      initialValues.permissions?.map((permName) => {
        const match = permissions.find(p => p.name === permName);
        return match?._id;
      }) || [];

    form.setFieldsValue({
      name: initialValues.name || "",
      description: initialValues.description || "",
      permissions: selectedPermissions
    });
  }, [initialValues, permissions, form]);

  // ✅ SINGLE CLEAN HANDLE FUNCTION
 const handleFinish = (values) => {
  const payload = {
    name: values.name.trim(),
    description: values.description || "",
    permissions: values.permissions || [] // ALWAYS send IDs
  };

  onSubmit(payload);
};

  // ✅ Select options
  const permissionOptions = permissions.map((permission) => ({
    label: permission.name,
    value: permission._id
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label="Role Name"
        name="name"
        rules={[{ required: true, message: "Enter role name" }]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea rows={3} placeholder="Enter role description" />
      </Form.Item>

      <Form.Item
        label="Permissions"
        name="permissions"
        rules={[{ required: true, message: "Select at least one permission" }]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Select permissions"
          options={permissionOptions}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {initialValues ? "Update Role" : "Create Role"}
      </Button>
    </Form>
  );
}

export default RoleForm;