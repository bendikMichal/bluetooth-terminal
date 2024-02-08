import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';

import Terminal from './components/Terminal';
import Devices from './components/Devices';
import Settings from './components/Settings';
import Info from './components/Info';

import { styles } from './consts/theme';

export default function App() {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ route, setRoute ] = useState("/");
  const [ refresh, setRefresh ] = useState(false);

  const handleChangeRoute = (item) => setRoute(item.route);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <View style={styles.container} >
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
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Devices", route: "/Devices", icon: "devices" },
          { title: "Settings", route: "/Settings", icon: "settings" },
          { title: "Info", route: "/Info", icon: "info" },
        ]}
        refresh={refresh}
      />

      <Navigation 
        route={route}
        routes={[
          <Terminal route="/Terminal" refresh={refresh} key="0"/>,
          <Devices route="/Devices" refresh={refresh} key="1"/>,
          <Settings route="/Settings" setRefresh={setRefresh} refresh={refresh} key="2"/>,
          <Info route="/Info" refresh={refresh} key="3"/>,
        ]}
        refresh={refresh}
      />
    </View>
  );
}

