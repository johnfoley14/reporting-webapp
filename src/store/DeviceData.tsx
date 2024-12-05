import axios from "axios";
import { config } from "../config";

export interface Device {
  device_id: number;
  device_name: string;
  aggregator_id: number;
}

export interface DeviceData {
  device_id: number;
  metric_name: string;
  metric_values: MetricValue[];
}

export interface MetricValue {
  collected_timestamp: string;
  metric_value: number;
}

export interface GraphFormData {
  group: string;
  collected_timestamp: string;
  metric_value: number;
}

export const getDeviceMetadata = async (): Promise<Device[]> => {
  try {
    const response = await axios.get(`${config.backendUrl}/get_devices`);
    return response.data as Device[];
  } catch (error) {
    console.error("Error fetching devices from /get_devices:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};

export const getDeviceData = async (
  deviceIds: number[]
): Promise<DeviceData[]> => {
  try {
    const response = await axios.get(
      `${config.backendUrl}/get_metrics?device_ids=${JSON.stringify(
        deviceIds
      )}&rows=30`
    );
    return response.data as DeviceData[];
  } catch (error) {
    console.error("Error fetching device data from /get_device_data:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};
