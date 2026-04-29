import { useEffect, useMemo, useState } from "react";
import { Modal, Descriptions, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../redux/slices/roleSlice";

import { fetchPermissions } from "../../redux/slices/permissionSlice";

import PageToolbar from "../../components/PageToolbar";
import RoleForm from "../../components/roles/RoleForm";
import RoleTable from "../../components/roles/RoleTable";
import AppDrawer from "../../components/common/AppDrawer";

function Roles() {
  const dispatch = useDispatch();

  const { roles, loading } = useSelector((state) => state.roles);
  const { permissions = [] } = useSelector((state) => state.permissions);

  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerRole, setDrawerRole] = useState(null);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRoles(roles || []);
  }, [roles]);

  // 🔥 Optimized permission map (FAST lookup)
  const permissionMap = useMemo(() => {
    const map = {};
    permissions.forEach((p) => {
      map[p._id] = p.name;
      map[p.name] = p.name;
    });
    return map;
  }, [permissions]);

  const permissionNameToId = useMemo(() => {
    const map = {};
    permissions.forEach((p) => {
      map[p.name] = p._id;
    });
    return map;
  }, [permissions]);

  const resolvePermissionName = (value) => {
    return permissionMap[value] || value;
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();

    const filtered = (roles || []).filter((role) =>
      role.name?.toLowerCase().includes(searchValue)
    );

    setFilteredRoles(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRole(id)).unwrap();
      message.success("Role deleted");
    } catch (err) {
      message.error(err || "Delete failed");
    }
  };

  // 🔥 CLEAN SUBMIT LOGIC
  const handleSubmit = async (values) => {
    try {
      let payload = {};
      const currentRole = editingRole || drawerRole;

      if (currentRole) {
        // NAME
        if (values.name !== currentRole.name) {
          payload.name = values.name.trim();
        }

        // DESCRIPTION
        if (values.description !== currentRole.description) {
          payload.description = values.description || "";
        }

        // PERMISSIONS (optimized)
        const oldPermIds = (currentRole.permissions || [])
          .map((name) => permissionNameToId[name])
          .filter(Boolean);

        const newPerms = values.permissions || [];

        const isPermissionsChanged =
          oldPermIds.length !== newPerms.length ||
          oldPermIds.some((id) => !newPerms.includes(id));

        if (isPermissionsChanged) {
          payload.permissions = newPerms;
        }

        if (Object.keys(payload).length === 0) {
          message.info("No changes detected");
          return;
        }

        await dispatch(
          updateRole({
            id: currentRole._id,
            roleData: payload,
          })
        ).unwrap();

        message.success("Role updated");

      } else {
        // CREATE
        await dispatch(
          createRole({
            name: values.name.trim(),
            description: values.description || "",
            permissions: values.permissions || [],
          })
        ).unwrap();

        message.success("Role created");
      }

      // RESET STATES
      setFormOpen(false);
      setEditingRole(null);
      setDrawerRole(null);

    } catch (err) {
      message.error(err || "Action failed");
    }
  };

  // ---------------- UI HANDLERS ----------------

  const handleRowClick = (record) => {
    setSelectedRole(record);
    setDetailsOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingRole(null);
    setFormOpen(true);
  };

  const handleOpenEditModal = (role) => {
    setEditingRole({ ...role });
    setFormOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormOpen(false);
    setEditingRole(null);
  };

  const handleOpenDrawerCreate = () => {
    setDrawerRole(null);
    setDrawerOpen(true);
  };

  const handleOpenDrawerEdit = (role) => {
    setDrawerRole({ ...role });
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerRole(null);
  };

  return (
    <div>
      <PageToolbar
        title="Roles"
        showSearch
        onSearch={handleSearch}
        actions={[
          {
            label: "Add Role",
            type: "primary",
            onClick: handleOpenDrawerCreate,
          },
        ]}
      />

      <RoleTable
        data={filteredRoles}
        loading={loading}
        onRowClick={handleRowClick}
        onEdit={handleOpenDrawerEdit}
        onDelete={handleDelete}
        resolvePermissionName={resolvePermissionName}
      />

      {/* DETAILS MODAL */}
      <Modal
        title="Role Details"
        open={detailsOpen}
        onCancel={() => setDetailsOpen(false)}
        footer={null}
      >
        {selectedRole && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Role Name">
              {selectedRole.name}
            </Descriptions.Item>

            <Descriptions.Item label="Description">
              {selectedRole.description || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Permissions">
              {selectedRole.permissions?.length ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selectedRole.permissions.map((perm, i) => (
                    <Tag key={`${perm}-${i}`}>
                      {resolvePermissionName(perm)}
                    </Tag>
                  ))}
                </div>
              ) : (
                "-"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              {selectedRole.enabled ? "Enabled" : "Disabled"}
            </Descriptions.Item>

            <Descriptions.Item label="Role ID">
              {selectedRole._id}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* MODAL FORM */}
      <Modal
        title={editingRole ? "Edit Role" : "Create Role"}
        open={formOpen}
        onCancel={handleCloseFormModal}
        footer={null}
        destroyOnClose
      >
        <RoleForm
          initialValues={editingRole}
          permissions={permissions}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* DRAWER FORM */}
      <AppDrawer
        title={drawerRole ? "Edit Role" : "Create Role"}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <RoleForm
          initialValues={drawerRole}
          permissions={permissions}
          onSubmit={async (values) => {
            await handleSubmit(values);
            handleCloseDrawer();
          }}
        />
      </AppDrawer>
    </div>
  );
}

export default Roles;