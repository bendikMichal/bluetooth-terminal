
import { useEffect, useState } from "react";
import { Text, NativeModules } from "react-native";

const { BluetoothLiteModule } = NativeModules;

console.log(BluetoothLiteModule, NativeModules)

const Terminal = (props) => {
  const [ bres, setBres ] = useState("");

  useEffect(() => {
    BluetoothLiteModule?.initBluetooth(res => {
      console.log(res);
      setBres(res);
    });
  }, []);

  return (
    <Text>
      Test terminal {bres}
    </Text>
  );
}

export default Terminal;