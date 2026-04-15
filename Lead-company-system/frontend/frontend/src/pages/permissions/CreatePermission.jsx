import { Card, message } from "antd";
import PermissionForm from "../../components/permissions/PermissionForm";
import { useDispatch } from "react-redux";
import { createPermission } from "../../redux/slices/permissionSlice";
import { useNavigate } from "react-router-dom";

function CreatePermission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await dispatch(createPermission(values)).unwrap();
      message.success("Permission created");
      navigate("/permissions");
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <Card title="Create Permission">
      <PermissionForm onSubmit={onFinish} />
    </Card>
  );
}

export default CreatePermission;