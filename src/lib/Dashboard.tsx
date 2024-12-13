import { LineChart } from "@carbon/charts-react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Button } from "@carbon/react";
import "@carbon/charts-react/styles.css";
import "@carbon/styles/index.scss";
import { lineChartOptions } from "./Options";
import { useEffect, useState } from "react";
import { Loading } from "@carbon/react";
import {
  getDeviceData,
  DeviceData,
  GraphFormData,
  manageCollection,
} from "../store/DeviceData";
import { Device } from "../store/DeviceData";

interface DataDashboardProps {
  devices: Device[];
}

const DataDashboard: React.FC<DataDashboardProps> = ({ devices }) => {
  const [deviceDataMap, setDeviceDataMap] = useState<
    Record<number, GraphFormData[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevicesData = async () => {
      try {
        const deviceData = await getDeviceData(
          devices.map((device) => device.device_id)
        );

        // Transform data into a device-specific map
        const transformedData = deviceData.reduce((acc, item) => {
          // Initialize an array for this device_id if it doesn't exist
          if (!acc[item.device_id]) {
            acc[item.device_id] = [];
          }

          // Transform and append the metric values for this device_id
          const transformedMetrics = transformData([item]);
          acc[item.device_id] = [...acc[item.device_id], ...transformedMetrics];

          return acc;
        }, {} as Record<number, GraphFormData[]>);

        setDeviceDataMap(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevicesData();
  }, [devices]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            border: "3px solid #2d6bcf",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <div style={{ margin: "3%", maxHeight: "60%" }}>
            <Tabs>
              <TabList aria-label="List of tabs">
                {devices.map((device) => (
                  <Tab key={device.device_id}>{device.device_name}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {devices.map((device) => (
                  <TabPanel key={device.device_id}>
                    <LineChart
                      data={deviceDataMap[device.device_id] || []}
                      options={lineChartOptions}
                    />
                    <div
                      style={{ display: "flex", gap: "10px", padding: "20px" }}
                    >
                      <Button
                        kind="tertiary"
                        onClick={() =>
                          manageCollection(
                            "START",
                            device.aggregator_id,
                            device.device_id
                          )
                        }
                      >
                        Start collecting data for {device.device_name}
                      </Button>
                      <Button
                        kind="danger--tertiary"
                        onClick={() =>
                          manageCollection(
                            "STOP",
                            device.aggregator_id,
                            device.device_id
                          )
                        }
                      >
                        Stop collecting data for {device.device_name}
                      </Button>
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

const transformData = (data: DeviceData[]): GraphFormData[] => {
  return data.flatMap((item) =>
    item.metric_values.map((metric) => ({
      group: item.metric_name,
      collected_timestamp: metric.collected_timestamp,
      metric_value: metric.metric_value,
    }))
  );
};

export default DataDashboard;
