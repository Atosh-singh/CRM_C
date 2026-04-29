import { useEffect, useState } from "react";
import { Modal, Descriptions, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AppDrawer from "../../components/common/AppDrawer";

import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam
} from "../../redux/slices/teamSlice";

import { fetchUsers } from "../../redux/slices/userSlice";
import { fetchCarTypes } from "../../redux/slices/carTypeSlice";

import PageToolbar from "../../components/PageToolbar";
import TeamForm from "../../components/teams/TeamForm";
import TeamTable from "../../components/teams/TeamTable";

function Teams() {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);

  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
 
  const [drawerOpen, setDrawerOpen] = useState(false);
const [drawerTeam, setDrawerTeam] = useState(null);
const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
      dispatch(fetchUsers());       // ✅ already working
  dispatch(fetchCarTypes()); 
  }, [dispatch]);

useEffect(() => {
  const filtered = teams.filter((t) =>
    showDeleted ? t.removed : !t.removed
  );
  setFilteredTeams(filtered);
}, [teams, showDeleted]);

  const handleSearch = (value) => {
    const filtered = teams.filter((team) =>
      team.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTeams(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTeam(id)).unwrap();
      message.success("Team deleted");
    } catch (err) {
      message.error(err || "Delete failed");
    }
  };

  const handleRestore = async (id) => {
  await dispatch(restoreTeam(id));
  message.success("Team restored");
};

const handleSubmit = async (values) => {
  console.log("🔥 SUBMIT TRIGGERED:", values);

  try {
    const current = drawerTeam; // ✅ FIXED

    if (current) {
      console.log("👉 UPDATE MODE");

      await dispatch(
        updateTeam({
          id: current._id,
          teamData: values,
        })
      ).unwrap();

      message.success("Team updated");
    } else {
      console.log("👉 CREATE MODE");

      await dispatch(createTeam(values)).unwrap();

      message.success("Team created");
    }

    setDrawerOpen(false);
    setDrawerTeam(null);

    dispatch(fetchTeams());

  } catch (err) {
    console.error("❌ ERROR:", err);
    message.error(err || "Action failed");
  }
};

  const handleRowClick = (record) => {
    setSelectedTeam(record);
    setDetailsOpen(true);
  };

 

 const handleOpenDrawerCreate = () => {
  setDrawerTeam(null);

  setDrawerOpen(true);
};

const handleOpenDrawerEdit = (team) => {
  setDrawerTeam(team);   // ✅ THIS IS IMPORTANT

  setDrawerOpen(true);
};

const handleCloseDrawer = () => {
  setDrawerOpen(false);
  setDrawerTeam(null);
};

  return (
    <div>
      <PageToolbar
        title="Teams"
        showSearch={true}
        onSearch={handleSearch}
        actions={[
          {
            label: "Add Team",
            type: "primary",
            onClick: handleOpenDrawerCreate
          },
            {
    label: showDeleted ? "Show Active" : "Show Trash",
    onClick: () => setShowDeleted(!showDeleted)
  }
        ]}
      />

      <TeamTable
        data={filteredTeams}
        loading={loading}
        onRowClick={handleRowClick}
        onEdit={handleOpenDrawerEdit}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />

      <Modal
        title="Team Details"
        open={detailsOpen}
        onCancel={() => setDetailsOpen(false)}
        footer={null}
      >
        {selectedTeam && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Team Name">
              {selectedTeam.name}
            </Descriptions.Item>

            <Descriptions.Item label="Team Lead">
              {selectedTeam.lead?.name || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Total Members">
              {selectedTeam.members?.length || 0}
            </Descriptions.Item>

            <Descriptions.Item label="Team ID">
              {selectedTeam._id}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      

<AppDrawer
  title={drawerTeam ? "Edit Team" : "Create Team"}
  open={drawerOpen}
  onClose={handleCloseDrawer}
>
  <TeamForm
    initialValues={drawerTeam}
    onSubmit={async (values) => {
      await handleSubmit(values);
          console.log("📦 FORM SUBMIT CALLED");
      handleCloseDrawer();
    }}
  />
</AppDrawer>
    </div>
  );
}

export default Teams;