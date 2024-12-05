import { ScaleTypes, LineChartOptions } from "@carbon/charts/interfaces";

const lineChartOptions: LineChartOptions = {
  title: "Device Metrics",
  axes: {
    left: {
      mapsTo: "metric_value",
    },
    bottom: {
      scaleType: ScaleTypes.TIME,
      mapsTo: "collected_timestamp",
    },
  },
  legend: {
    clickable: true,
  },
  height: "400px",
};

const gaugeChartOptions = {
  title: "CPU Usage",
  resizable: true,
  height: "250px",
  gauge: {
    type: "full",
  },
  color: {
    scale: {
      value: "#FFE5B4",
    },
  },
};

export { lineChartOptions };
export { gaugeChartOptions };
