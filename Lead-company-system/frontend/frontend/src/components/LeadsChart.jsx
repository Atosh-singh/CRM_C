import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import Api from "../api/axios"

function LeadsChart() {

  const data = [
    { month: "Jan", leads: 30 },
    { month: "Feb", leads: 45 },
    { month: "Mar", leads: 60 },
    { month: "Apr", leads: 40 },
    { month: "May", leads: 80 }
  ];

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="leads" stroke="#1677ff" />
    </LineChart>
  );
}

export default LeadsChart;