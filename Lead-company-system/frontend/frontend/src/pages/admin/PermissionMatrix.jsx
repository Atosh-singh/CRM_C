import { Table, Checkbox, Tooltip, Tag, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRoles } from "../../redux/slices/roleSlice";
import { fetchPermissions } from "../../redux/slices/permissionSlice";

function PermissionMatrix() {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.roles);
  const { permissions } = useSelector((state) => state.permissions);

  const [matrix, setMatrix] = useState({});

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  // 🧠 INIT MATRIX
  useEffect(() => {
    const initial = {};

    roles.forEach((role) => {
      initial[role._id] = role.permissions || [];
    });

    setMatrix(initial);
  }, [roles]);

  // 🔥 TOGGLE SINGLE
  const handleToggle = (roleId, permName) => {
    setMatrix((prev) => {
      const current = prev[roleId] || [];

      const updated = current.includes(permName)
        ? current.filter((p) => p !== permName)
        : [...current, permName];

      return { ...prev, [roleId]: updated };
    });
  };

  // 🔥 SELECT ALL COLUMN
  const handleSelectAll = (permName) => {
    const updated = {};

    roles.forEach((role) => {
      const current = matrix[role._id] || [];

      updated[role._id] = current.includes(permName)
        ? current.filter((p) => p !== permName)
        : [...current, permName];
    });

    setMatrix(updated);
  };

  // 🎨 GROUP PERMISSIONS
  const groupedPermissions = permissions.reduce((acc, perm) => {
    const group = perm.name.split("_")[1] || "OTHER";

    if (!acc[group]) acc[group] = [];
    acc[group].push(perm);

    return acc;
  }, {});

  // 🔥 COLUMNS
  const columns = [
    {
      title: "Role",
      dataIndex: "name",
      fixed: "left",
      width: 150
    },
    ...Object.entries(groupedPermissions).flatMap(([group, perms]) =>
      perms.map((perm) => ({
        title: (
          <Tooltip title={perm.description}>
            <div style={{ textAlign: "center" }}>
              <Tag color="blue">{group}</Tag>
              <div>{perm.name}</div>

              {/* ✅ SELECT ALL */}
              <Checkbox
                onChange={() => handleSelectAll(perm.name)}
              />
            </div>
          </Tooltip>
        ),
        width: 150,
        render: (_, role) => {
          const checked = matrix[role._id]?.includes(perm.name);

          return (
            <Checkbox
              checked={checked}
              onChange={() => handleToggle(role._id, perm.name)}
            />
          );
        }
      }))
    )
  ];

  return (
    <div>
      {/* 🔥 SAVE BUTTON */}
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary">Save Changes</Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        scroll={{ x: true }}
        pagination={false}
      />
    </div>
  );
}

export default PermissionMatrix;