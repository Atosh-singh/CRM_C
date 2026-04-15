import { Card, message } from "antd";
import RoleForm from "../../components/roles/RoleForm";
import { useDispatch } from "react-redux";
import { createRole } from "../../redux/slices/roleSlice";
import { useNavigate } from "react-router-dom";

function CreateRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await dispatch(createRole(values)).unwrap();
      message.success("Role created successfully");
      navigate("/roles");
    } catch (err) {
      message.error(err || "Error creating role");
    }
  };

  return (
    <Card title="Create Role">
      <RoleForm onSubmit={onFinish} />
    </Card>
  );
}

export default CreateRole;