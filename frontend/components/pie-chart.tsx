"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// interface OverviewProps {
//   data: any[];
// }

const data = [
  {
    name: "Twitter",
    value: 200400,
  },
  {
    name: "Facebook",
    value: 205000,
  },
  {
    name: "Instagram",
    value: 23400,
  },
  {
    name: "Snapchat",
    value: 20000,
  },
  {
    name: "LinkedIn",
    value: 29078,
  },
  {
    name: "YouTube",
    value: 18900,
  },
];

const colors = [
  "#8884d8",
  "#FA8072",
  "#AF69EE",
  "#3DED97",
  "#3AC7EB",
  "#F9A603",
];

// export const Overview: React.FC<OverviewProps> = ({ data }) => {
export const PieChartPlot = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          // cx='50%'
          // cy='50%'
          // fill='#8884d8'
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
