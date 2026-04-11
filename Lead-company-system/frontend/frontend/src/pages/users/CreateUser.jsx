import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createUser, clearUserError } from "../../redux/slices/userSlice";
import { fetchRoles } from "../../redux/slices/roleSlice";
import { fetchTeams } from "../../redux/slices/teamSlice";

import UserForm from "../../components/users/UserForm";

function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createLoading, error } = useSelector((state) => state.users);
  const { roles } = useSelector((state) => state.roles);
  const { teams } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearUserError());
    }
  }, [error, dispatch]);

  const onFinish = async (values) => {
    try {
      await dispatch(createUser(values)).unwrap();
      message.success("User created successfully");
      navigate("/users");
    } catch (error) {
      message.error(error || "Error creating user");
    }
  };

  return (
    <Card
      title="Create User"
      style={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
      }}
    >
      <UserForm
        roles={roles || []}
        teams={teams || []}
        onSubmit={onFinish}
        loading={createLoading}
        showPassword={true}
      />
    </Card>
  );
}

export default CreateUser;