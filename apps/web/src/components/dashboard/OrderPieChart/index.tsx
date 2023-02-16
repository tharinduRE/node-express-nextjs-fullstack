import { orderStatusColors } from "@components/order/statuscolors";
import { Palette, PaletteColor, useTheme } from "@mui/material";
import { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { OrderCountResponse, status } from "../../../types/order";

export function OrderPieChart({ data }: { data?: OrderCountResponse}) {
  const theme = useTheme();

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };
//   console.log(data?.map( e => e.count));
//   console.log(data?.map( e => e._id));
//   console.log(data?.map( e => orderStatusColors[e._id]
//     // (theme.palette?.[orderStatusColors[e._id] as keyof Palette] as PaletteColor).light
//  ));
  return (
    <Doughnut
      options={options}
      data={{
        labels: data?.map( e => e._id),
        datasets: [
          {
            data: data?.map( e => e.count),
            backgroundColor: data?.map( e => 
               (theme.palette?.[orderStatusColors[e._id] as keyof Palette] as PaletteColor).light
            ),
            hoverOffset: 4,
          },
        ],
      }}
    />
  );
}
