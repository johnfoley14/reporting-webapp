import { ScaleTypes, LineChartOptions } from "@carbon/charts/interfaces";

const lineChartOptions: LineChartOptions = {
  title: "Device Data",
  axes: {
    left: {
      mapsTo: "value",
    },
    bottom: {
      scaleType: ScaleTypes.TIME,
      mapsTo: "date",
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
