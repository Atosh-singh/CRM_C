import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  message,
  Spin,
  Upload,
  Modal
} from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import API from "../../api/axios";
import PermissionGuard from "../../components/PermissionGuard";

const { Option } = Select;

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editModal, setEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // 🔥 Fetch Cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await API.get("/cars");
      setCars(res.data.data || res.data);
    } catch (err) {
      message.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 🔥 Add Car
const onFinish = async (values) => {
  try {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "image" && values.image?.file) {
        formData.append("image", values.image.file.originFileObj);
      } else {
        formData.append(key, values[key]);
      }
    });

    await API.post("/cars", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    message.success("Car added successfully");
    form.resetFields();
    fetchCars();

  } catch (error) {
    message.error(error.response?.data?.message || "Error");
  }
};
  // 🔥 Delete Car
  const handleDelete = async (id) => {
    try {
      await API.delete(`/cars/${id}`);
      message.success("Car deleted");
      fetchCars();
    } catch  {
      message.error("Delete failed");
    }
  };

  // 🔥 Open Edit
  const openEdit = (car) => {
    setSelectedCar(car);
    form.setFieldsValue(car);
    setEditModal(true);
  };

  // 🔥 Update Car
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await API.put(`/cars/${selectedCar._id}`, values);
      message.success("Car updated");
      setEditModal(false);
      fetchCars();
    } catch  {
      message.error("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cars Management</h1>

      {/* 🔥 Add Car (Protected by Permission) */}
      <PermissionGuard permission="CREATE_CAR">
        <Card title="Add New Car" className="mb-6">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="Car Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="fuelType" label="Fuel Type">
                  <Select>
                    <Option value="Petrol">Petrol</Option>
                    <Option value="Diesel">Diesel</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="transmission" label="Transmission">
                  <Select>
                    <Option value="Manual">Manual</Option>
                    <Option value="Automatic">Automatic</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="image" label="Upload Image">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Button type="primary" htmlType="submit" block>
                  Add Car
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </PermissionGuard>

      {/* 🔥 Cars List */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {cars.map((car) => (
            <Col xs={24} sm={12} md={8} lg={6} key={car._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={car.name}
                    src={`http://localhost:5000/uploads/${car.image}`}
                    className="h-40 object-cover"
                  />
                }
                actions={[
                  <EditOutlined onClick={() => openEdit(car)} />,
                  <DeleteOutlined onClick={() => handleDelete(car._id)} />
                ]}
              >
                <h2 className="font-semibold">{car.name}</h2>
                <p>₹ {car.price}</p>
                <p>{car.fuelType} • {car.transmission}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* 🔥 Edit Modal */}
      <Modal
        title="Edit Car"
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleUpdate}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Car Name">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Cars;
