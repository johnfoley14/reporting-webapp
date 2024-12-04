import DataDashboard from "./lib/Dashboard";
import "./App.css";
import { useState, useEffect } from "react";
import { getDeviceMetadata } from "./store/DeviceData";
import { Loading } from "@carbon/react";

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const deviceData = await getDeviceMetadata();
        setDevices(deviceData); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div
      style={{
        paddingTop: "2%",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "2%",
      }}
    >
      {loading ? <Loading /> : <DataDashboard />}
    </div>
  );
}

export default App;
