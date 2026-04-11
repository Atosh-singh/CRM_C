import { Form, Input, Button, Select } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

function RoleForm({ initialValues, permissions = [], onSubmit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    const selectedPermissions =
      initialValues?.permissions?.map((value) => {
        // supports both stored ids and stored names
        const matchedPermission = permissions.find(
          (permission) =>
            permission._id === value || permission.name === value
        );

        return matchedPermission ? matchedPermission._id : value;
      }) || [];

    form.setFieldsValue({
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      permissions: selectedPermissions
    });
  }, [initialValues, permissions, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

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
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {initialValues ? "Update Role" : "Create Role"}
      </Button>
    </Form>
  );
}

export default RoleForm;