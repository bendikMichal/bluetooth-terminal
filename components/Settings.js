

import { Switch, Text, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import Row from "./Row";
import { darkTheme, getColor, lighTheme, setTheme, theme } from "../consts/theme";
import { styles } from "../consts/theme";

const Settings = (props) => {
  const [ darkmode, setDarkmode ] = useState(theme === darkTheme);

  const cahngeTheme = async () => {
    if (theme !== darkTheme) await setTheme(darkTheme);
    else await setTheme(lighTheme);
    setDarkmode(theme === darkTheme);
    props.setRefresh(!props.refresh);
  }

  return (
    <View style={{
      height: "98%"
    }}>
      <Row style={styles.settingsItem}>
        <Text style={styles.text}>
          Darkmode
        </Text>
        <Switch 
          name="mode"
          trackColor={{true: getColor("accent")}}
          thumbColor={darkmode ? getColor("title") : getColor("text")}
          onValueChange={cahngeTheme}
          value={darkmode}
        />
      </Row>
    </View>

  );
}

export default Settings;