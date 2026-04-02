import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../redux/slices/leadSlice";
import LeadTable from "../../components/LeadTable";
import LeadFilters from "../../components/LeadFilters";
import PageToolbar from "../../components/PageToolbar";

function Leads() {
  const dispatch = useDispatch();
  const { leads, pagination, loading } = useSelector((state) => state.leads);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",        // ✅ future ready
    assignedTo: ""     // ✅ future ready
  });

  // ✅ API CALL
  useEffect(() => {
    dispatch(fetchLeads(filters));
  }, [filters]);

  return (
    <div>

      {/* 🔥 SEARCH + BUTTON (TOP RIGHT) */}
      <PageToolbar
        showSearch={true}
        onSearch={(value) =>
          setFilters((prev) => ({
            ...prev,
            search: value,
            page: 1 // reset page on search
          }))
        }
        actions={[
          {
            label: "Add Lead",
            type: "primary",
            onClick: () => console.log("Add Lead Clicked")
          }
        ]}
      />

    

      {/* 🔽 TABLE */}
      <LeadTable
        leads={leads}
        pagination={pagination}
        loading={loading}
        setFilters={setFilters}
      />

    </div>
  );
}

export default Leads;