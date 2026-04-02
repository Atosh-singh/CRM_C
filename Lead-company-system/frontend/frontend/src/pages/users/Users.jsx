import { useEffect, useState } from "react";
import { Table, Modal, Descriptions, message } from "antd";
import API from "../../api/axios";
import PageToolbar from "../../components/PageToolbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ for search
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data || []);
      setFilteredUsers(res.data || []); // ✅ initialize filtered list
    } catch (error) {
      message.error("Failed to load users");
    }
  };

  // ✅ SEARCH FUNCTION
  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      user.name?.toLowerCase().includes(value.toLowerCase()) ||
      user.email?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
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

      {/* 🔥 TOOLBAR */}
      <PageToolbar
        title="Users"
        showSearch={true}
        onSearch={handleSearch}
        actions={[
          {
            label: "Add User",
            type: "primary",
            onClick: () => console.log("Navigate to create user page")
          }
        ]}
      />

      {/* 📊 TABLE */}
      <Table
        dataSource={filteredUsers} // ✅ use filtered data
        columns={columns}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record)
        })}
      />

      {/* 📦 MODAL */}
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