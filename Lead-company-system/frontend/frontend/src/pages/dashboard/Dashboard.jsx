import StatsCards from "../../components/StatsCards";
import LeadsChart from "../../components/LeadsChart";

function Dashboard() {

  return (
    <div>

      <h2 style={{ marginBottom: 20 }}>
        CRM Dashboard
      </h2>

      <StatsCards />

      <div style={{ marginTop: 40 }}>
        <LeadsChart />
      </div>

    </div>
  );
}

export default Dashboard;