import { useTheme } from "@mui/material";
import { ChartOptions } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { DailyOrders } from "../../../types/order";

export function OrderChart({ data }: { data?: DailyOrders[] }) {
  const theme = useTheme();

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid : {
          display : false
        }
      },
      y: {
        grid : {
          display : false
        }
      }
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: theme.palette.primary.dark,
        fill: "start",
        backgroundColor: theme.palette.info.light,
      },
      bar: {
        borderWidth: 2,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.info.light,
      },
      point: {
        radius: 2,
        hitRadius: 5,
      },
    },
  };

  return (
    <Bar
      options={options}
      data={{
        labels: data?.map((e) => e.date),
        datasets: [{ data: data?.map((e) => e.count) }],
      }}
    />
  );
}
