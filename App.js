import 'react-native-gesture-handler';

import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import { getColor } from './consts/theme';


export default function App() {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ route, setRoute ] = useState("/");

  const handleChangeRoute = (item) => setRoute(item.route);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <View style={styles.container} >
      <Navbar 
        title="Veri gud blutut epp"
        toggleSidebar={toggleSidebar}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor("bg"),
  },
});
