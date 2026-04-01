import { useState } from "react";
import { Card, Input, Button, Avatar, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const EditProfile = () => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.image);

  const handleImageChange = ({ file }) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

    const res = await API.put("/users/me", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      console.log("USER:", user);
      console.log("UPDATED USER:", res.data);
      message.success("Profile updated successfully");
    } catch (err) {
      message.error("Update failed");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card title="Edit Profile" style={{ width: 500, borderRadius: 16 }}>
        
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Avatar size={100} src={preview} icon={<UserOutlined />} />
        </div>

        <Upload
          beforeUpload={() => false}
          showUploadList={false}
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />} block>
            Upload Image
          </Button>
        </Upload>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={{ marginTop: 20 }}
        />

        <Button
          type="primary"
          block
          style={{ marginTop: 20 }}
          onClick={handleSubmit}
        >
          Update Profile
        </Button>
      </Card>
    </div>
  );
};

export default EditProfile;