import { useEffect, useState } from "react";
import { Table, Modal, Descriptions, message } from "antd";
import API from "../../api/axios";

function Users() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const res = await API.get("/users");

      console.log("Users:", res.data);

      setUsers(res.data || []);

    } catch (error) {

      message.error("Failed to load users");

    }

  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Role",
      render: (record) => record.role?.name || "-"
    },
    {
      title: "Team",
      render: (record) => record.team?.name || "-"
    }
  ];

  const handleRowClick = (record) => {

    setSelectedUser(record);
    setOpen(true);

  };

  return (
    <div>

      <h2 style={{marginBottom:20}}>Users</h2>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record)
        })}
      />

      <Modal
        title="User Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >

        {selectedUser && (

          <Descriptions column={1} bordered>

            <Descriptions.Item label="Name">
              {selectedUser.name}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {selectedUser.email}
            </Descriptions.Item>

            <Descriptions.Item label="Role">
              {selectedUser.role?.name}
            </Descriptions.Item>

            <Descriptions.Item label="Team">
              {selectedUser.team?.name}
            </Descriptions.Item>

            <Descriptions.Item label="User ID">
              {selectedUser._id}
            </Descriptions.Item>

          </Descriptions>

        )}

      </Modal>

    </div>
  );
}

export default Users;