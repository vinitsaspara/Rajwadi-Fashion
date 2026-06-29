"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    month: "Jan",
    sales: 12000,
  },
  {
    month: "Feb",
    sales: 18000,
  },
  {
    month: "Mar",
    sales: 15000,
  },
  {
    month: "Apr",
    sales: 24000,
  },
  {
    month: "May",
    sales: 21000,
  },
  {
    month: "Jun",
    sales: 31000,
  },
  {
    month: "Jul",
    sales: 27000,
  },
  {
    month: "Aug",
    sales: 35000,
  },
  {
    month: "Sep",
    sales: 42000,
  },
  {
    month: "Oct",
    sales: 39000,
  },
  {
    month: "Nov",
    sales: 47000,
  },
  {
    month: "Dec",
    sales: 52000,
  },
];

export default function DashboardChart() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Sales Overview
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}