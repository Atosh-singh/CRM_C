import { Table, Card, Tag } from "antd";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function PermissionMatrix() {

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const fetchRoles = async () => {

    const res = await API.get("/roles");

    setRoles(res.data || []);

  };

  const fetchPermissions = async () => {

    const res = await API.get("/permissions");

    setPermissions(res.data || []);

  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  

  const columns = [
    {
      title: "Role",
      dataIndex: "name",
      key: "name"
    },

    ...permissions.map((perm) => ({
      title: perm.name,
      key: perm.name,

      render: (_, role) => {

        const hasPermission = role.permissions.includes(perm.name);

        return hasPermission
          ? <Tag color="green">Yes</Tag>
          : <Tag color="red">No</Tag>;

      }
    }))
  ];

  return (

    <Card
      title="Role Permission Matrix"
      style={{ margin: 20 }}
    >

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        pagination={false}
      />

    </Card>

  );

}

export default PermissionMatrix;