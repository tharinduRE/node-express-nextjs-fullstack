import { useTheme } from "@mui/material";
import { ChartOptions } from "chart.js";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import { Order } from "../../../types/order";

export function OrderChart({ data }: { data?: Order[] }) {
  const theme = useTheme();

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: theme.palette.primary.dark,
        fill: "start",
        backgroundColor: theme.palette.info.light,
      },
      point: {
        radius: 2,
        hitRadius: 5,
      },
    },
  };

  return (
    <Line
      options={options}
      data={{
        labels: data?.map((e) =>
          format(new Date(e.createdAt as Date), "MM-dd")
        ),
        datasets: [{ data: data?.map((e) => e.amount) }],
      }}
    />
  );
}
