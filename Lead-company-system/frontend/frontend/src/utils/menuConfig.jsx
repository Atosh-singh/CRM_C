import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CarOutlined,
  UserAddOutlined,
  SafetyOutlined,
  KeyOutlined,
  SettingOutlined
} from "@ant-design/icons";

export const menuConfig = [

  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    permission: "VIEW_DASHBOARD"
  },

  {
    key: "/leads",
    icon: <UserOutlined />,
    label: "Leads",
    permission: "VIEW_LEAD"
  },

  {
    key: "/cars",
    icon: <CarOutlined />,
    label: "Cars",
    permission: "VIEW_CAR"
  },

     {
        key: "/teams",
        icon: <TeamOutlined />,
        label: "Teams",
        permission: "VIEW_TEAMS"
      },

  {
    type: "divider"
  },

  {
    key: "admin",
    label: "Admin",
    roles: ["ADMIN", "SUPER_ADMIN"],

    children: [

      {
        key: "/users",
        icon: <TeamOutlined />,
        label: "Users",
        permission: "VIEW_USERS"
      },
     

      {
        key: "/users/create",
        icon: <UserAddOutlined />,
        label: "Create User",
        permission: "CREATE_USER"
      },

      {
        key: "/roles/create",
        icon: <SafetyOutlined />,
        label: "Create Role",
        permission: "VIEW_ROLE"
      },

      {
        key: "/permissions/create",
        icon: <KeyOutlined />,
        label: "Create Permission",
        permission: "VIEW_PERMISSION"
      },

      {
        key: "/admin/permissions",
        icon: <SettingOutlined />,
        label: "Permission Matrix"
      },

      {
        key: "authorization",
        icon: <SettingOutlined />,
        label: "Authorization Panel"
      }

    ]
  }

];