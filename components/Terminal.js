
import { useEffect, useState } from "react";
import { Text } from "react-native";
import BluetoothModule from "../native_modules_wrap/BluetoothModule";


const Terminal = (props) => {
  const [ bres, setBres ] = useState(false);

  useEffect(() => {
    if (!bres) {
      BluetoothModule?.initBluetooth(res => {
        console.log(res ? "Bluetooth init Success!": "Bluetooth init Failure!");
        setBres(res);
      });
    }
  }, []);

  return (
    <Text>
      Test terminal {bres}
    </Text>
  );
}

export default Terminal;