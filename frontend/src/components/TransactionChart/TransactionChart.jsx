import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./TransactionChart.css";

const TransactionChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toISOString().split("T")[0],
  }));

  // Format to IDR currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="transaction-chart-container">
      <h2 className="chart-title">Total Price by Date</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontStyle: 'italic', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              width={80}
              tick={{ fontStyle: 'italic', fontSize: 12 }}
              tickFormatter={(value) => formatPrice(value).replace('Rp', '')}
            />
            <Tooltip 
              formatter={(value) => [formatPrice(value), 'Total Price']}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none"
              }}
              labelStyle={{ fontStyle: 'italic' }}
            />
            <Line
              type="monotone"
              dataKey="total_price"
              stroke="#67AE6E"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionChart;