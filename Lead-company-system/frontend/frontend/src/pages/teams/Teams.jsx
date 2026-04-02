import { useEffect, useState } from "react";
import { Table, Modal, Descriptions, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import PageToolbar from "../../components/PageToolbar";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

 const fetchTeams = async () => {
  try {
    const res = await API.get("/teams");

    console.log("Teams API Response:", res.data); // ✅ DEBUG

    // ✅ FIX: extract array properly
    const teamData = res.data.data || res.data.teams || res.data || [];

    setTeams(Array.isArray(teamData) ? teamData : []);
    setFilteredTeams(Array.isArray(teamData) ? teamData : []);

  } catch (error) {
    message.error("Failed to load teams");
  }
};

  // 🔍 SEARCH
  const handleSearch = (value) => {
    const filtered = teams.filter((team) =>
      team.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTeams(filtered);
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "name"
    },
    {
      title: "Team Lead",
      render: (record) => record.lead?.name || "-"
    },
    {
      title: "Members",
      render: (record) => record.members?.length || 0
    }
  ];

  const handleRowClick = (record) => {
    setSelectedTeam(record);
    setOpen(true);
  };

  return (
    <div>

      {/* 🔥 TOOLBAR */}
      <PageToolbar
        title="Teams"
        showSearch={true}
        onSearch={handleSearch}
        actions={[
          {
            label: "Add Team",
            type: "primary",
            onClick: () => navigate("/teams/create") // ✅ correct navigation
          }
        ]}
      />

      {/* 📊 TABLE */}
      <Table
        dataSource={filteredTeams}
        columns={columns}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record)
        })}
      />

      {/* 📦 MODAL */}
      <Modal
        title="Team Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {selectedTeam && (
          <Descriptions column={1} bordered>

            <Descriptions.Item label="Team Name">
              {selectedTeam.name}
            </Descriptions.Item>

            <Descriptions.Item label="Team Lead">
              {selectedTeam.lead?.name}
            </Descriptions.Item>

            <Descriptions.Item label="Total Members">
              {selectedTeam.members?.length}
            </Descriptions.Item>

            <Descriptions.Item label="Team ID">
              {selectedTeam._id}
            </Descriptions.Item>

          </Descriptions>
        )}
      </Modal>

    </div>
  );
}

export default Teams;