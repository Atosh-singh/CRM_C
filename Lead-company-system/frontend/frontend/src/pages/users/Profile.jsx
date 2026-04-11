import { Card, Avatar, Typography, Tag, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 flex justify-center">
      <Card
        style={{ width: 500, borderRadius: 16 }}
        actions={[
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <Avatar size={100} src={user?.image} icon={<UserOutlined />} />

          <Title level={3} style={{ marginTop: 16 }}>
            {user?.name}
          </Title>

          <Text type="secondary">{user?.email}</Text>

          <div style={{ marginTop: 10 }}>
            <Tag color="blue">{user?.role?.name || user?.role}</Tag>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Team:</strong> {user?.team?.name || "N/A"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Profile;