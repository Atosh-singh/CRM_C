import { useEffect, useState } from "react";
import { message } from "antd";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import usePageActions from "../../hooks/usePageActions";
import { useNavigate } from "react-router-dom";

import {
  fetchLeads,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
} from "../../redux/slices/leadSlice";

import PageToolbar from "../../components/PageToolbar";
import LeadTable from "../../components/leads/LeadTable";
import LeadFilters from "../../components/leads/LeadFilters";
import LeadFormModal from "../../components/leads/LeadFormModal";
import DeleteLeadModal from "../../components/leads/DeleteLeadModal";
import LeadDetailsDrawer from "../../components/leads/LeadDetailsDrawer";
import AppDrawer from "../../components/common/AppDrawer";
import LeadForm from "../../components/leads/LeadForm";

function Leads() {
  const dispatch = useDispatch();

  const {
    leads,
    pagination,
    loading,
    createLoading,
    updateLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.leads);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
     status: "",
  });

  const [statusTab, setStatusTab] = useState("all");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLeads(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleCreateClick = () => {
    setEditingLead(null);
    setDrawerOpen(true);
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (lead) => {
    setSelectedLead(lead);
    setDeleteOpen(true);
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setDetailsOpen(true);
  };

  const handleSubmitLead = async (values) => {
    try {
      if (editingLead) {
        await dispatch(
          updateLead({ id: editingLead._id, leadData: values }),
        ).unwrap();
        message.success("Lead updated successfully");
      } else {
        await dispatch(createLead(values)).unwrap();
        message.success("Lead created successfully");
      }

      // ✅ FIX
      dispatch(fetchLeads(filters));

      setDrawerOpen(false);
      setEditingLead(null);
    } catch (err) {
      message.error(err || "Action failed");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteLead(selectedLead._id)).unwrap();
      message.success("Lead deleted successfully");
      setDeleteOpen(false);
      setSelectedLead(null);
    } catch (err) {
      message.error(err || "Delete failed");
    }
  };

  const handleStatusChange = async (lead, status) => {
    try {
      await dispatch(updateLeadStatus({ id: lead._id, status })).unwrap();
      message.success("Lead status updated");
    } catch (err) {
      message.error(err || "Failed to update status");
    }
  };

  // 🔥 PAGE ACTION BAR 
usePageActions({
  actions: [
   
    {
      label: "Export",
      onClick: () => {
        console.log("Export Leads");
        message.info("Export feature coming soon");
      },
    },
  ],

  filters: [
    {
      default: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
        { label: "Pending", value: "pending" },
      ],
      onChange: (val) => {
        setFilters((prev) => ({
          ...prev,
          status: val,
          page: 1,
        }));
      },
    },
  ],
});


const handleTabChange = (key) => {
  setStatusTab(key);

  setFilters((prev) => ({
    ...prev,
    status: key === "all" ? "" : key, // backend filter
    page: 1,
  }));
};
 

  return (
    <div>
<Tabs
  defaultActiveKey="all"
  activeKey={statusTab}
  onChange={handleTabChange}
  items={[
    { key: "all", label: "All Leads" },
    { key: "won", label: "Won" },
    { key: "lost", label: "Lost" },
    { key: "pending", label: "Pending" },
  ]}
  style={{
    marginBottom: 16,
    background: "#fff",
    padding: "8px 16px",
    borderRadius: "10px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
  }}
/>

      <PageToolbar
        title="Leads"
        showSearch={true}
        onSearch={(value) =>
          setFilters((prev) => ({
            ...prev,
            search: value,
            page: 1,
          }))
        }
        actions={[
          {
            label: "Add Lead",
            type: "primary",
            onClick: handleCreateClick,
          },
        ]}
      />

      <LeadFilters filters={filters} setFilters={setFilters} />

      <LeadTable
        leads={leads}
        pagination={pagination}
        loading={loading}
        setFilters={setFilters}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
      />

      <DeleteLeadModal
        open={deleteOpen}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedLead(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        lead={selectedLead}
      />

      <LeadDetailsDrawer
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
      />

      <AppDrawer
        title={editingLead ? "Edit Lead" : "Create Lead"}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingLead(null);
        }}
      >
        <LeadForm
          initialValues={editingLead}
          onSubmit={handleSubmitLead}
          loading={createLoading || updateLoading}
        />
      </AppDrawer>
    </div>
  );
}

export default Leads;
