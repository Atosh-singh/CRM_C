import { Form, Input, Button, Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";

// ✅ ADD THIS
import { connectSocket } from "../../socket";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      const res = await dispatch(loginUser(values));

      if (res.meta.requestStatus === "fulfilled") {

        // ✅ ADD THIS (store token for axios + socket)
        const token = res.payload?.accessToken;
        if (token) {
          localStorage.setItem("token", token);
        }

        // ✅ ADD THIS (connect socket)
        connectSocket();

        message.success("Login successful");
        navigate("/dashboard");

      } else {
        message.error(res.payload?.message || "Invalid credentials");
      }
    } catch (error) {
      message.error("Invalid credentials");
    }
  };

  return (
    <Card title="CRM Login" style={{ width: 350, margin: "100px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" required>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form>
    </Card>
  );
}

export default Login;