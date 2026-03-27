import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const { Content } = Layout;

function CRMLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      <Layout>

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <Content
          style={{
            margin: "24px",
            padding: "24px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}
        >
          {children}
        </Content>

      </Layout>

    </Layout>
  );
}

export default CRMLayout;