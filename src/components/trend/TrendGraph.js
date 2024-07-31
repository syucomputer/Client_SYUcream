import {
  Bar, BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const TrendGraph = ({ data }) => {
  const topData = data.slice(0, 15);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart data={topData} margin={{ top: 20, bottom: 55 }}>
        <CartesianGrid strokeDasharray="3 3" barCategoryGap="30%" />
        <XAxis dataKey="name"
               angle={-45}
               textAnchor="end"
               tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#8884d8" barSize={40}/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default TrendGraph;