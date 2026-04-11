import { useEffect, useState } from "react";
import { Modal, Descriptions, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../../redux/slices/userSlice";
import PageToolbar from "../../components/PageToolbar";
import UserTable from "../../components/users/UserTable";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state) => state.users);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users || []);
  }, [users]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();

    const filtered = (users || []).filter(
      (user) =>
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue)
    );

    setFilteredUsers(filtered);
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setOpen(true);
  };

  return (
    <div>
      <PageToolbar
        title="Users"
        showSearch={true}
        onSearch={handleSearch}
        actions={[
          {
            label: "Add User",
            type: "primary",
            onClick: () => navigate("/users/create")
          }
        ]}
      />

      <UserTable
        data={filteredUsers}
        loading={loading}
        onRowClick={handleRowClick}
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
              {selectedUser.role?.name || selectedUser.role || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Team">
              {selectedUser.team?.name || selectedUser.team || "-"}
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