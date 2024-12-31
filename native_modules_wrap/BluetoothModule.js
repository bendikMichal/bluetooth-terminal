
import { NativeModules } from "react-native";

const { BluetoothLiteModule } = NativeModules;
const BluetoothModule = BluetoothLiteModule;

// export const serviceName = "BluetoothAppNative";
export const serviceName = "BluetoothTerminal";
export const serviceUUID = "00001101-0000-1000-8000-00805F9B34FB";
export const serverTimeout = 10000;

export default BluetoothModule;
