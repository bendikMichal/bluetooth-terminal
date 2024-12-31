

import { useEffect, useState } from "react";
import { Text, View, Linking } from "react-native";
import { styles } from "../consts/theme";
import Button from "./Button";

const style = {
  fontFamily: "monospace"
};

const Landing = (props) => {

  return (
    <View style={{
      height: "98%"
    }}>
      <Text style={[styles.bigTitle, styles.centered, style]}> Bluetooth Terminal</Text>
      <Text style={{ marginLeft: 16, marginTop: -8, opacity: 0.5 }}>by noTme</Text>
      <View style={{ padding: 24 }}>
        <Text style={[styles.text]}>
          This app aims to provide smooth and ad-less experience.
        </Text>

        <View style={{ marginLeft: "auto", marginRight: "auto", marginTop: 32 }}>
          <Button
            buttonName="github"
            background={false}
            size={{x: 44, y: 44}}
            onPress={() => Linking.openURL("https://github.com/bendikMichal")}
          />
        </View>
      </View>
    </View>
  );
}

export default Landing;