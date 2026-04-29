import { useEffect, useState } from "react";
import { Modal, Descriptions, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  restorePermission,
} from "../../redux/slices/permissionSlice";

import PageToolbar from "../../components/PageToolbar";
import PermissionForm from "../../components/permissions/PermissionForm";
import PermissionTable from "../../components/permissions/PermissionTable";
import AppDrawer from "../../components/common/AppDrawer";

function Permissions() {
  const dispatch = useDispatch();
  const { permissions, loading } = useSelector((state) => state.permissions);

  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPermission, setDrawerPermission] = useState(null);

  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  // useEffect(() => {
  //   setFilteredPermissions(permissions || []);
  // }, [permissions]);

  useEffect(() => {
    const filtered = (permissions || []).filter((p) =>
      showDeleted ? p.removed : !p.removed,
    );
    setFilteredPermissions(filtered);
  }, [permissions, showDeleted]);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();

    const filtered = (permissions || []).filter((permission) =>
      permission.name?.toLowerCase().includes(searchValue),
    );

    setFilteredPermissions(filtered);
  };

  const handleRestore = async (id) => {
    try {
      await dispatch(restorePermission(id)).unwrap();
      message.success("Permission restored");
    } catch (err) {
      message.error(err || "Restore failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePermission(id)).unwrap();
      message.success("Permission deleted");
    } catch (err) {
      message.error(err || "Delete failed");
    }
  };

  // 🔥 SAME SMART LOGIC AS ROLES
  const handleSubmit = async (values) => {
    try {
      const currentPermission = editingPermission || drawerPermission;
      let payload = {};

      if (currentPermission) {
        // NAME CHECK
        if (values.name !== currentPermission.name) {
          payload.name = values.name.trim();
        }

        // DESCRIPTION CHECK
        if (values.description !== currentPermission.description) {
          payload.description = values.description || "";
        }

        // ❌ NOTHING CHANGED
        if (Object.keys(payload).length === 0) {
          message.info("No changes detected");
          return;
        }

        await dispatch(
          updatePermission({
            id: currentPermission._id,
            permissionData: payload,
          }),
        ).unwrap();

        message.success("Permission updated");
      } else {
        // CREATE
        await dispatch(
          createPermission({
            name: values.name.trim(),
            description: values.description || "",
          }),
        ).unwrap();

        message.success("Permission created");
      }

      // RESET STATES
      setFormOpen(false);
      setEditingPermission(null);
      setDrawerPermission(null);
    } catch (err) {
      message.error(err || "Action failed");
    }
  };

  // ---------------- UI HANDLERS ----------------

  const handleRowClick = (record) => {
    setSelectedPermission(record);
    setDetailsOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingPermission(null);
    setFormOpen(true);
  };

  const handleOpenEditModal = (permission) => {
    setEditingPermission({ ...permission });
    setFormOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormOpen(false);
    setEditingPermission(null);
  };

  const handleOpenDrawerCreate = () => {
    setDrawerPermission(null);
    setDrawerOpen(true);
  };

  const handleOpenDrawerEdit = (permission) => {
    setDrawerPermission({ ...permission });
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerPermission(null);
  };

  return (
    <div>
      <PageToolbar
        title="Permissions"
        showSearch
        onSearch={handleSearch}
        actions={[
          {
            label: "Add Permission",
            type: "primary",
            onClick: handleOpenDrawerCreate,
          },
          {
            label: showDeleted ? "Show Active" : "Show Trash",
            onClick: () => setShowDeleted(!showDeleted),
          },
        ]}
      />

      <PermissionTable
        data={filteredPermissions}
        loading={loading}
        onRowClick={handleRowClick}
        onEdit={handleOpenDrawerEdit}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />

      {/* DETAILS MODAL */}
      <Modal
        title="Permission Details"
        open={detailsOpen}
        onCancel={() => setDetailsOpen(false)}
        footer={null}
      >
        {selectedPermission && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Permission Name">
              {selectedPermission.name}
            </Descriptions.Item>

            <Descriptions.Item label="Description">
              {selectedPermission.description || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Permission ID">
              {selectedPermission._id}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* MODAL FORM */}
      <Modal
        title={editingPermission ? "Edit Permission" : "Create Permission"}
        open={formOpen}
        onCancel={handleCloseFormModal}
        footer={null}
        destroyOnClose
      >
        <PermissionForm
          initialValues={editingPermission}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* DRAWER FORM */}
      <AppDrawer
        title={drawerPermission ? "Edit Permission" : "Create Permission"}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <PermissionForm
          initialValues={drawerPermission}
          onSubmit={async (values) => {
            await handleSubmit(values);
            handleCloseDrawer();
          }}
        />
      </AppDrawer>
    </div>
  );
}

export default Permissions;
