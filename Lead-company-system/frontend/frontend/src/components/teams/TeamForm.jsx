import { Form, Input, Button, Select, InputNumber } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function TeamForm({ initialValues, onSubmit }) {
  const [form] = Form.useForm();

  // 🔥 Assuming you already have these in redux
  const users = useSelector((state) => state.users?.users || []);
const carTypes = useSelector((state) => state.carTypes?.carTypes || []);

console.log("Users:", users);
  console.log("CarTypes:", carTypes);


  useEffect(() => {
    if (!initialValues) return;

    form.setFieldsValue({
      name: initialValues.name,
      description: initialValues.description,
      carTypes: initialValues.carTypes?.map((c) => c._id),
      lead: initialValues.lead?._id,
      assignmentType: initialValues.assignmentType,
      maxLeadsPerUser: initialValues.maxLeadsPerUser,
      priority: initialValues.priority,
    });
  }, [initialValues, form]);

  const handleFinish = (values) => {

      console.log("FORM VALUES:", values); // ✅ ADD THIS
    onSubmit({
      name: values.name.trim(),
      description: values.description || "",
      carTypes: values.carTypes,
      lead: values.lead || null,
      assignmentType: values.assignmentType,
      maxLeadsPerUser: values.maxLeadsPerUser,
      priority: values.priority,
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      
      {/* NAME */}
      <Form.Item
        label="Team Name"
        name="name"
        rules={[{ required: true, message: "Enter team name" }]}
      >
        <Input placeholder="Enter team name" />
      </Form.Item>

      {/* DESCRIPTION */}
      <Form.Item label="Description" name="description">
        <TextArea rows={2} />
      </Form.Item>

      {/* CAR TYPES 🔥 REQUIRED */}
      <Form.Item
        label="Car Types"
        name="carTypes"
        rules={[{ required: true, message: "Select car types" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select car types"
          options={carTypes?.map((c) => ({
            label: c.name,
            value: c._id,
          }))}
        />
      </Form.Item>

      {/* TEAM LEAD */}
      <Form.Item label="Team Lead" name="lead">
        <Select
          allowClear
          placeholder="Select team lead"
          options={users?.map((u) => ({
            label: u.name,
            value: u._id,
          }))}
        />
      </Form.Item>

      {/* ASSIGNMENT TYPE */}
      <Form.Item label="Assignment Type" name="assignmentType">
        <Select
          options={[
            { label: "Round Robin", value: "ROUND_ROBIN" },
            { label: "Load Balanced", value: "LOAD_BALANCED" },
            { label: "Manual", value: "MANUAL" },
          ]}
        />
      </Form.Item>

      {/* MAX LEADS */}
      <Form.Item label="Max Leads Per User" name="maxLeadsPerUser">
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      {/* PRIORITY */}
      <Form.Item label="Priority" name="priority">
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {initialValues ? "Update Team" : "Create Team"}
      </Button>
    </Form>
  );
}

export default TeamForm;