import { LineChart, GaugeChart } from "@carbon/charts-react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import "@carbon/charts-react/styles.css";
import "@carbon/styles/index.scss";
import data from "./data";
import { lineChartOptions, gaugeChartOptions } from "./options";

const DataDashboard = () => {
  return (
    <div style={{ margin: "3%", maxHeight: "60%" }}>
      <Tabs onTabCloseRequest={() => {}}>
        <TabList aria-label="List of tabs">
          <Tab>Device One</Tab>
          <Tab>Monitoring</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart data={data} options={lineChartOptions}></LineChart>
            <GaugeChart
              data={[{ group: "value", value: 50 }]}
              options={gaugeChartOptions}
            ></GaugeChart>
          </TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DataDashboard;
