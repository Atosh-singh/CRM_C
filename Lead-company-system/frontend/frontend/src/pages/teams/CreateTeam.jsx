import { Card, message } from "antd";
import TeamForm from "../../components/teams/TeamForm";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/slices/teamSlice";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await dispatch(createTeam(values)).unwrap();
      message.success("Team created");
      navigate("/teams");
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <Card title="Create Team">
      <TeamForm onSubmit={onFinish} />
    </Card>
  );
}

export default CreateTeam;