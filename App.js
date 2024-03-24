import 'react-native-gesture-handler';

import BluetoothModule, { serverTimeout, serviceName, serviceUUID } from "./native_modules_wrap/BluetoothModule";

import { StatusBar, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';

import Terminal from './components/Terminal';
import Client from './components/Client';
import Server from './components/Server';
import Devices from './components/Devices';
import Settings from './components/Settings';
import Info from './components/Info';

import { getColor, styles } from './consts/theme';


import { DeviceEventEmitter } from 'react-native';

DeviceEventEmitter.addListener('InitCallbackEvent', () => console.log("init"));

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
  const [ started, setStarted ] = useState(false);
  const [ connected, setConnected ] = useState("");

  const [ tryStart, setTryStart ] = useState(false);

  const [ messages, setMessages ] = useState({
    server: [],
    client: []
  });

  const startClient = () => {
    if (started || !device) return
    if (tryStart) return
    setTryStart(true);

    console.log("Trying to connect to server at:", device.address)
    BluetoothModule?.startClient(device.address, serviceUUID,
      res => {
        console.log("Client start res: ", res)
        if (!res.success) setMessages({
          ...messages,
          client: [
            ...messages.client,
            {
              author: "Error",
              message: res.error
            }
          ]
        });
        if (res.success) setConnected("client");

        setStarted(res.success);
        setTryStart(false);
    });
  }

  const startServer = (timeout) => {
    if (started || tryStart) return
    setTryStart(true);

    BluetoothModule?.startServer(serviceName, serviceUUID, timeout ?? serverTimeout,
      res => {
        console.log("Server start res: ", res)
        if (res.success) setConnected("server");

        setStarted(res.success);
        setTryStart(false);
    });
  }

  const stopClient = () => {
    BluetoothModule?.stopClient();
    setStarted(false);
  }

  const stopServer = () => {
    BluetoothModule?.stopServer();
    setStarted(false);
  }


  useEffect(() => {
    BluetoothModule?.listPaired(res => {
      console.log("Paired: ", res)
      setPaired(res);
      // setDevice(res.filter(item => item.name === "Redmi")[0]);
    });
  }, [])

  useEffect(() => {
    const addMessage = res => {
      setMessages(prev => ({
        ...prev,
        [connected]: [...prev[connected], {
          timestamp: new Date(),
          message: res
        }]
      }));
    }

    const disconnect = () => {
      // it actually calls stop server too, so it stops one or the other or both
      stopClient();
    }

    const readListener = DeviceEventEmitter.addListener('ReadCallbackEvent', addMessage);
    const disconnectListener = DeviceEventEmitter.addListener('DisconnectEvent', disconnect);

    return () => {
      readListener.remove('ReadCallbackEvent', addMessage);
      disconnectListener.remove('DisconnectEvent', disconnect);
    };
  }, [connected])

  // useEffect(() => startClient(), [paired])
  // useEffect(() => startServer(), [paired])

  useEffect(() => {
    if (started) BluetoothModule?.btio();
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
          <Client route="/Client" refresh={refresh} device={device} key="0" 
            connected={connected}
            started={started}
            trying={tryStart}
            messages={messages.client}
            startClient={startClient}
            stopClient={stopClient}
            onGotoDevices={() => handleChangeRoute({ title: "Devices", route: "/Devices", icon: "devices" })}
            onSend={val => {
              let msg = (String(val) ?? "") + "\n";
              if (started) {
                BluetoothModule?.write(msg);
                setMessages(
                  {
                    ...messages,
                    client: [...messages.client, {
                      author: "You",
                      message: msg
                    }]
                  });
              }
            }}
          />,
          <Server route="/Server" refresh={refresh} key="0.1"
            connected={connected}
            started={started}
            trying={tryStart}
            messages={messages.server}
            startServer={startServer}
            stopServer={stopServer}
            onSend={val => {
              let msg = (String(val) ?? "") + "\n";
              if (started) {
                BluetoothModule?.write(msg);
                setMessages(
                  {
                    ...messages,
                    server: [...messages.server, {
                      author: "You",
                      message: msg
                    }]
                  });
              }
            }}
          />,
          <Devices 
            route="/Devices" 
            refresh={refresh} 
            connected={connected}
            started={started}
            devices={paired} 
            onSelect={(devc) => {
              if (!devc) return
              if (devc.address !== device?.address) setMessages({
                ...messages,
                client: []
              });
              setDevice(devc);
            }}
            refreshDevices={() => BluetoothModule?.listPaired(res => {
              console.log("Paired: ", res)
              setPaired(res);
            })}
            key="1"
          />,
          <Settings route="/Settings" setRefresh={setRefresh} refresh={refresh} key="2"/>,
          <Info route="/Info" refresh={refresh} key="3"/>,
        ]}
        refresh={refresh}
      />
    </View>
  );
}

