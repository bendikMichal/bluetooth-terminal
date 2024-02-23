import 'react-native-gesture-handler';

import BluetoothModule, { serverTimeout, serviceName, serviceUUID } from "./native_modules_wrap/BluetoothModule";

import { StatusBar, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';

import Terminal from './components/Terminal';
import Devices from './components/Devices';
import Settings from './components/Settings';
import Info from './components/Info';

import { getColor, styles } from './consts/theme';


import { DeviceEventEmitter } from 'react-native';
import Client from './components/Client';

DeviceEventEmitter.addListener('InitCallbackEvent', () => console.log("init"));

DeviceEventEmitter.addListener('ReadCallbackEvent', () => {
  BluetoothModule?.write("Hello World!");
});

DeviceEventEmitter.addListener('WriteErrorCallbackEvent', () => console.log("WriteError"));


BluetoothModule?.initBluetooth(res => {
  console.log(res ? "Bluetooth init Success!": "Bluetooth init Failure!");
});


export default function App() {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ route, setRoute ] = useState("/");
  const [ refresh, setRefresh ] = useState(false);

  const [ paired, setPaired ] = useState([]);
  const [ device, setDevice ] = useState(null);
  const [ started, setStarted ] = useState(false)

  const startClient = () => {
    if (started || !device) return
    console.log("Trying to connect to server at:", device.address)
    BluetoothModule?.startClient(device.address,
      res => {
        console.log("Client start res: ", res)
        setStarted(res.success);
    });
  }

  const startServer = () => {
    if (started) return
    BluetoothModule?.startServer(serviceName, serviceUUID, serverTimeout,
      res => {
        console.log("Start res: ", res)
        setStarted(res.success);
    });
  }

  useEffect(() => {
    BluetoothModule?.listPaired(res => {
      console.log("Paired: ", res)
      setPaired(res);
      // setDevice(res.filter(item => item.name === "Redmi")[0]);
    });
  }, [])

  // useEffect(() => startClient(), [paired])
  // useEffect(() => startServer(), [paired])

  useEffect(() => {
    if (!started) return
    BluetoothModule?.btio()
  }, [started])



  const handleChangeRoute = (item) => {
    setRoute(item.route);
    setSidebarOpen(false);
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  //   startClient();
  // }

  return (
    <View style={styles.container} >
      <StatusBar
        translucent
        backgroundColor={getColor("fg")}
      />
      <Navbar 
        title="Veri gud blutut epp"
        toggleSidebar={toggleSidebar}
        refresh={refresh}
      />

      <Sidebar 
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        route={route}
        setRoute={handleChangeRoute}
        menuItems={[
          // { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Client", route: "/Client", icon: "client" },
          { title: "Server", route: "/Server", icon: "server" },
          { title: "Devices", route: "/Devices", icon: "devices" },
          { title: "Settings", route: "/Settings", icon: "settings" },
          { title: "Info", route: "/Info", icon: "info" },
        ]}
        refresh={refresh}
      />

      <Navigation 
        route={route}
        routes={[
          // <Terminal route="/Terminal" refresh={refresh} key="0"/>,
          <Client route="/Client" refresh={refresh} device={device} key="0" />,
          <Client route="/Server" refresh={refresh} key="0.1" />,
          <Devices route="/Devices" refresh={refresh} devices={paired} onSelect={setDevice} key="1"/>,
          <Settings route="/Settings" setRefresh={setRefresh} refresh={refresh} key="2"/>,
          <Info route="/Info" refresh={refresh} key="3"/>,
        ]}
        refresh={refresh}
      />
    </View>
  );
}

