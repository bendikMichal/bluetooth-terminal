import 'react-native-gesture-handler';

import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import { getColor } from './consts/theme';


export default function App() {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

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
        menuItems={[
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
          { title: "Terminal", route: "/Terminal", icon: "terminal" },
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
