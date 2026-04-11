import { Form, Input, Button } from "antd";
import { useEffect } from "react";

function TeamForm({ initialValues, onSubmit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: initialValues?.name || ""
    });
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label="Team Name"
        name="name"
        rules={[{ required: true, message: "Enter team name" }]}
      >
        <Input placeholder="Enter team name" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {initialValues ? "Update Team" : "Create Team"}
      </Button>
    </Form>
  );
}

export default TeamForm;