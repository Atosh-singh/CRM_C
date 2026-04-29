import { Form, Input, Button } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

function PermissionForm({ initialValues, onSubmit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: initialValues?.name || "",
      description: initialValues?.description || ""
    });
  }, [initialValues, form]);

 const handleFinish = (values) => {
  onSubmit({
    name: values.name.trim(),
    description: values.description || ""
  });
  form.resetFields();
};

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label="Permission Name"
        name="name"
        rules={[{ required: true, message: "Enter permission name" }]}
      >
        <Input placeholder="Example: CREATE_LEAD" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea rows={3} placeholder="Enter permission description" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {initialValues ? "Update Permission" : "Create Permission"}
      </Button>
    </Form>
  );
}

export default PermissionForm;